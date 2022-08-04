import './App.css';
import { useEffect, useState } from "react";
import { PhantomProvider } from './interfaces/PhantonProvider';
import { Connection, Transaction } from '@solana/web3.js';

function App() {
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  useEffect(() => {
    // @ts-ignore
    setProvider(window.solana);
  }, []);
  const [, setWalletKey] = useState<PhantomProvider | null>(
    null
  );
  const connectWallet = async () => {
    // @ts-ignore
    const response = await window.solana.connect();
    console.log(response.publicKey.toString());
    setWalletKey(response.publicKey.toString());
  };
  const flipTheCoin = async () => {
    const network = "127.0.0.1:8899";
    const connection = new Connection(network);
    const transaction = new Transaction();
    // @ts-ignore
    const { signature } = await window.solana.signAndSendTransaction(transaction);
    await connection.getSignatureStatus(signature);
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
