import { struct } from '@solana/buffer-layout';
import { SendTransactionOptions, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, useConnection, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { TransactionInstruction } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';
import { Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram } from '@solana/web3.js';
import { u32, nu64 } from '@solana/buffer-layout';

type SendTransaction = (transaction: Transaction, connection: Connection, options?: SendTransactionOptions | undefined) => Promise<string>;

async function doThing(
    publicKey: PublicKey,
    sendTransaction: SendTransaction,
    con: Connection,
  ): Promise<string> {
    let allocateStruct = {
        index: 0,
        layout: struct([
            // @ts-ignore
            u32('instruction'),
            // @ts-ignore
            nu64('data'),
        ])
    };
    let payload = Buffer.alloc(allocateStruct.layout.span);
    let params = { data: 100 };
    let layoutFields = Object.assign({instruction: allocateStruct.index}, params);
    allocateStruct.layout.encode(layoutFields, payload);
    let transaction = new Transaction();
    transaction.feePayer = publicKey;
    let flipResultKeypair = Keypair.generate();
    let keys = [
        { pubkey: flipResultKeypair.publicKey, isSigner: true, isWritable: true },
        { pubkey: publicKey, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ];
    transaction.add(new TransactionInstruction({
        keys,
        programId: new PublicKey("Ae1cbcDnNocF6yUSzMTr4wsMZDwhkj8sHfnM9ScYASn2"),
        data: payload,
    }));
    const network = "http://127.0.0.1:8899";
    // const connection = new Connection(network);
    let blockhash = await con.getLatestBlockhash('finalized');
    transaction.recentBlockhash = blockhash.blockhash;
    return await sendTransaction(transaction, con);
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
    const transact = async () => {
        if (!publicKey) return;
        await doThing(publicKey, sendTransaction, connection);
    };
    return (
        <>
            <WalletMultiButton />
            <button onClick={transact}>Transact!</button>
        </>
    )

};
