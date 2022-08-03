import './App.css';
import { useEffect, useState } from "react";
import { PhantomProvider } from './interfaces/PhantonProvider';

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
    </>
  );
}

export default App;
