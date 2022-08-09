import './App.css';
import { useEffect, useState } from "react";
import { PhantomProvider } from './interfaces/PhantonProvider';
import * as borsh from "@bonfida/borsh-js";
import { Buffer } from "buffer";
import { struct, u32, nu64 } from "@solana/buffer-layout";
// Get Solana
import {
  Keypair,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SignatureStatus,
  RpcResponseAndContext,
} from "@solana/web3.js";

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

function App() {
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  useEffect(() => {
    // @ts-ignore
    console.log(window.solana);
    // @ts-ignore
    setProvider(window.solana);
  }, []);
  const [walletKey, setWalletKey] = useState<PublicKey>(
    PublicKey.default
  );
  const connectWallet = async () => {
    // @ts-ignore
    const response = await window.solana.connect();
    console.log(JSON.stringify(response));
    setWalletKey(response.publicKey);
  };
  const flipTheCoin = async () => {
    return await doThing(walletKey);
  };
  return (
    <>
      <h2>Connect to Phantom Wallet</h2>
      {provider && (
        <button onClick={connectWallet}>
          Connect to Phantom Wallet
        </button>
      )}

      {!provider && (
        <p>
          No provider found.
        </p>
      )}

      <div style={{height: 20}}></div>
      <button onClick={flipTheCoin}>Flip the coin</button>
    </>
  );
}

export default App;
