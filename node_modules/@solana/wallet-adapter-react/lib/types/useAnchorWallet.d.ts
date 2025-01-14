import { type PublicKey, type Transaction, type VersionedTransaction } from '@solana/web3.js';
export interface AnchorWallet {
    publicKey: PublicKey;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
}
export declare function useAnchorWallet(): AnchorWallet | undefined;
//# sourceMappingURL=useAnchorWallet.d.ts.map