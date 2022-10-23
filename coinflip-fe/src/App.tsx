import { ConnectionProvider, useConnection, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, PhantomWalletAdapterConfig } from '@solana/wallet-adapter-wallets';
import { PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram } from '@solana/web3.js';
import * as anchor from "@project-serum/anchor";
import * as IDL from '../../target/idl/coinflip_bet.json';
import { PROGRAM_ID } from './const';

async function getRoll(program: anchor.Program<anchor.Idl>, userPk: PublicKey): Promise<any> {
  const [wager,] = await PublicKey.findProgramAddress(
    [Buffer.from('wager'), userPk.toBuffer()],
    program.programId,
  );
  const account = await program.account.wager.fetch(wager);
  // @ts-ignore
  return account.roll.words[0];
}

async function runBet(
  publicKey: PublicKey,
  program: anchor.Program<anchor.Idl>,
): Promise<any> {
  const managerPk = new PublicKey('Wj2yvieAgeD4bXdAzkVTYiqDgA8ScJM2JPpayDaCfcx');
  const [systemAccount,] = await PublicKey.findProgramAddress(
    [Buffer.from('system-account'), managerPk.toBuffer()],
    program.programId,
  );
  const [wager,] = await PublicKey.findProgramAddress(
    [Buffer.from('wager'), publicKey.toBuffer()],
    program.programId,
  );
  await program.methods.bet(
    { side: 'heads', lamports: new anchor.BN(1000) },
  )
  .accounts(
    {
      wager,
      user: publicKey,
      systemAccount,
      systemProgram: SystemProgram.programId,
    }
  )
  .signers([])
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
  const program = useMemo(() => {
    const wallet = new PhantomWalletAdapter();
    wallet.connect();
    const provider = new anchor.AnchorProvider(
      connection,
      // @ts-ignore
      wallet,
      anchor.AnchorProvider.defaultOptions()
    );
    const programId = new PublicKey(PROGRAM_ID);
    // @ts-ignore
    const program = new anchor.Program(IDL, programId, provider);
    return program;
  }, [connection])
  const bet = async () => {
    if (!publicKey) return;
    await runBet(publicKey, program);
  };
  const result = async () => {
    if (!publicKey) return;
    const thing = await getRoll(program, publicKey);
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
