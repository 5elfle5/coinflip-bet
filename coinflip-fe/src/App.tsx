import { struct } from '@solana/buffer-layout';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { TransactionInstruction } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';
import { Transaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { SignatureStatus } from '@solana/web3.js';
import { RpcResponseAndContext } from '@solana/web3.js';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';

async function doThing(
    walletKey: PublicKey,
  ): Promise<RpcResponseAndContext<SignatureStatus | null>> {
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
    let allocateTransaction = new Transaction();
    allocateTransaction.feePayer = walletKey;
    let keys = [{pubkey: walletKey, isSigner: true, isWritable: true}];
    allocateTransaction.add(new TransactionInstruction({
      keys,
      programId: new PublicKey("Ae1cbcDnNocF6yUSzMTr4wsMZDwhkj8sHfnM9ScYASn2"),
      data: payload,
    }));
    const network = "http://127.0.0.1:8899";
    const connection = new Connection(network);
    let blockhash = await connection.getLatestBlockhash('finalized');
    allocateTransaction.recentBlockhash = blockhash.blockhash;
    // @ts-ignore
    const { signature } = await window.solana.signAndSendTransaction(allocateTransaction);
    return await connection.getSignatureStatus(signature);
  }

export const App: FC = () => {
    const transact = async () => {

    };
    return (
        <WalletContext>
            <WalletContent />
            <button onClick={transact}>Transact!</button>
        </WalletContext>
    );
};

const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const WalletContent: FC = () => {
    return <WalletMultiButton />;
};
