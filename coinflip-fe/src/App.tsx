import { struct } from '@solana/buffer-layout';
import { SendTransactionOptions, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useConnection, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { TransactionInstruction } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';
import { Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram } from '@solana/web3.js';
import { u32, nu64 } from '@solana/buffer-layout';
import * as anchor from "@project-serum/anchor";
import * as IDL from '../../target/idl/coinflip_bet.json';

type SendTransaction = (transaction: Transaction, connection: Connection, options?: SendTransactionOptions | undefined) => Promise<string>;

async function getThing(program: anchor.Program<anchor.Idl>, flipResult: Keypair): Promise<any> {
    const account = await program.account.flipResult.fetch(flipResult.publicKey);
    // @ts-ignore
    return account.roll.words[0];
}

async function doThing(
    publicKey: PublicKey,
    program: anchor.Program<anchor.Idl>,
    flipResult: Keypair,
  ): Promise<any> {
    await program.rpc.initialize(new anchor.BN(1234), {
      accounts: {
        flipResult: flipResult.publicKey,
        user: publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [flipResult],
    });
}

export const App: FC = () => {
    return (
        <WalletContext>
            <WalletContent />
        </WalletContext>
    );
};

const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => 'http://127.0.0.1:8899', [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        []
    );


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
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [roll, setRoll] = useState(0);
    const flipResult = useMemo(() => anchor.web3.Keypair.generate(), [publicKey]);
    const program = useMemo(() => {
        const wallet = new PhantomWalletAdapter();
        wallet.connect();
        const provider = new anchor.AnchorProvider(
            connection,
            // @ts-ignore
            wallet,
            anchor.AnchorProvider.defaultOptions()
        );
        const idl = IDL;
        const programId = new PublicKey("Ae1cbcDnNocF6yUSzMTr4wsMZDwhkj8sHfnM9ScYASn2");
        // @ts-ignore
        const program = new anchor.Program(idl, programId, provider);
        return program;
    }, [publicKey])
    const transact = async () => {
        if (!publicKey) return;
        await doThing(publicKey, program, flipResult);
    };
    const result = async () => {
        if (!publicKey) return;
        const thing = await getThing(program, flipResult);
        setRoll(thing);
    };
    return (
        <>
            roll: {roll}
            <WalletMultiButton />
            <button onClick={transact}>Transact!</button>
            <button onClick={result}>Get Thing!</button>
        </>
    )

};
