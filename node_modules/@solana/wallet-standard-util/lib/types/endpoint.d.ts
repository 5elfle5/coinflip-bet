import type { SolanaChain } from '@solana/wallet-standard-chains';
/** TODO: docs */
export declare const MAINNET_ENDPOINT = "https://api.mainnet-beta.solana.com";
/** TODO: docs */
export declare const DEVNET_ENDPOINT = "https://api.devnet.solana.com";
/** TODO: docs */
export declare const TESTNET_ENDPOINT = "https://api.testnet.solana.com";
/** TODO: docs */
export declare const LOCALNET_ENDPOINT = "http://localhost:8899";
/**
 * TODO: docs
 */
export declare function getChainForEndpoint(endpoint: string): SolanaChain;
/**
 * TODO: docs
 */
export declare function getEndpointForChain(chain: SolanaChain, endpoint?: string): string;
//# sourceMappingURL=endpoint.d.ts.map