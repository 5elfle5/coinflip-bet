import { ConnectionProvider, useConnection, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram } from '@solana/web3.js';
import * as anchor from "@project-serum/anchor";
import * as IDL from '../../target/idl/coinflip_bet.json';

async function getRoll(program: anchor.Program<anchor.Idl>, flipResult: Keypair): Promise<any> {
    const account = await program.account.flipResult.fetch(flipResult.publicKey);
    // @ts-ignore
    return account.roll.words[0];
}

async function bet(
  publicKey: PublicKey,
  program: anchor.Program<anchor.Idl>,
  flipResult: Keypair,
): Promise<any> {
  await program.methods.bet(
    "heads",
  )
  .accounts(
    {
      flipResult: flipResult.publicKey,
      user: publicKey,
      systemProgram: SystemProgram.programId,
    }
  )
  .signers(
    [flipResult]
  )
  .rpc();
}

export const App: FC = () => {
  return (
    <WalletContext>
      <WalletContent />
    </WalletContext>
  );
};

const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = useMemo(() => 'http://127.0.0.1:8899', []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

const WalletContent: FC = () => {
  const { publicKey, } = useWallet();
  const { connection } = useConnection();
  const [roll, setRoll] = useState(0);
  const flipResult = useMemo(() => anchor.web3.Keypair.generate(), []);
  const program = useMemo(() => {
    const wallet = new PhantomWalletAdapter();
    wallet.connect();
    const provider = new anchor.AnchorProvider(
      connection,
      // @ts-ignore
      wallet,
      anchor.AnchorProvider.defaultOptions()
    );
    const programId = new PublicKey("Ae1cbcDnNocF6yUSzMTr4wsMZDwhkj8sHfnM9ScYASn2");
    // @ts-ignore
    const program = new anchor.Program(IDL, programId, provider);
    return program;
  }, [connection])
  const bet = async () => {
    if (!publicKey) return;
    await bet(publicKey, program, flipResult);
  };
  const result = async () => {
    if (!publicKey) return;
    const thing = await getRoll(program, flipResult);
    setRoll(thing);
  };
  return (
    <>
      roll: {roll}
      <WalletMultiButton />
      <button onClick={bet}>Bet!</button>
      <button onClick={result}>Get Thing!</button>
    </>
  )
};
