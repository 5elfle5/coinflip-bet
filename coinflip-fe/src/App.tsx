import { ConnectionProvider, useConnection, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import * as anchor from "@project-serum/anchor";
import * as IDL from '../../target/idl/coinflip_bet.json';
import { PROGRAM_ID } from './const';
import { getRoll, runBet } from './instructions';

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
