import type { SolanaTransactionCommitment } from '@solana/wallet-standard-features';
declare type Commitment = 'processed' | 'confirmed' | 'finalized' | 'recent' | 'single' | 'singleGossip' | 'root' | 'max';
/**
 * TODO: docs
 */
export declare function getCommitment(commitment?: Commitment): SolanaTransactionCommitment | undefined;
export {};
//# sourceMappingURL=commitment.d.ts.map