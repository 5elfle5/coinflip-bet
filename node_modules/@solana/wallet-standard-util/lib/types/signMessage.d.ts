import type { SolanaSignMessageInput, SolanaSignMessageOutput } from '@solana/wallet-standard-features';
/**
 * TODO: docs
 */
export declare function verifyMessageSignature({ message, signedMessage, signature, publicKey, }: {
    message: Uint8Array;
    signedMessage: Uint8Array;
    signature: Uint8Array;
    publicKey: Uint8Array;
}): boolean;
/**
 * TODO: docs
 */
export declare function verifySignMessage(input: SolanaSignMessageInput, output: SolanaSignMessageOutput): boolean;
//# sourceMappingURL=signMessage.d.ts.map