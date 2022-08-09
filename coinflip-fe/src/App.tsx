import './App.css';
import { useEffect, useState } from "react";
import { PhantomProvider } from './interfaces/PhantonProvider';
import * as borsh from "@bonfida/borsh-js";
import { Buffer } from "buffer";
// Get Solana
import {
  Keypair,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  SignatureStatus,
  RpcResponseAndContext,
} from "@solana/web3.js";

// Flexible class that takes properties and imbues them
// to the object instance
class Assignable {
  constructor(properties: any) {
    Object.keys(properties).map((key) => {
      // @ts-ignore
      return (this[key] = properties[key]);
    });
  }
}

// Our instruction payload vocabulary
class Payload extends Assignable {}

// Borsh needs a schema describing the payload
const payloadSchema = new Map([
  [
    Payload,
    {
      kind: "struct",
      fields: [
        ["id", "u8"],
        ["data", "i64"],
      ],
    },
  ],
]);

// Instruction variant indexes
enum InstructionVariant {
  Initialize = 0,
  Update,
}

async function doThing(
  walletKey: PublicKey,
): Promise<RpcResponseAndContext<SignatureStatus | null>> {
  const payload = new Payload({
    id: InstructionVariant.Initialize,
    data: 100,
  });
  const data = Buffer.from(borsh.serialize(payloadSchema, payload));
  const instruction = new TransactionInstruction({
    data: data,
    keys: [
      { pubkey: walletKey, isSigner: true, isWritable: false }
    ],
    programId: new PublicKey("Ae1cbcDnNocF6yUSzMTr4wsMZDwhkj8sHfnM9ScYASn2"),
  });

  // @ts-ignore
  const { signature } = await window.solana.signAndSendTransaction(new Transaction().add(instruction));
  const network = "http://127.0.0.1:8899";
  const connection = new Connection(network);
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
