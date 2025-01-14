import { BaseSignInMessageSignerWalletAdapter, WalletName, WalletReadyState } from "@solana/wallet-adapter-base";
import { Connection, PublicKey, SendOptions, TransactionSignature, TransactionVersion, VersionedTransaction } from "@solana/web3.js";
import { Transaction as LegacyTransaction } from "@solana/web3.js";
import { AppIdentity, AuthorizationResult, Base64EncodedAddress, Chain, Cluster, SignInPayload } from "@solana-mobile/mobile-wallet-adapter-protocol";
import { SolanaSignInInput, SolanaSignInOutput } from "@solana/wallet-standard-features";
interface AuthorizationResultCache {
    clear(): Promise<void>;
    get(): Promise<AuthorizationResult | undefined>;
    set(authorizationResult: AuthorizationResult): Promise<void>;
}
interface AddressSelector {
    select(addresses: Base64EncodedAddress[]): Promise<Base64EncodedAddress>;
}
declare const SolanaMobileWalletAdapterWalletName: WalletName<string>;
declare class SolanaMobileWalletAdapter extends BaseSignInMessageSignerWalletAdapter {
    readonly supportedTransactionVersions: Set<TransactionVersion>;
    name: WalletName<string>;
    url: string;
    icon: string;
    private _addressSelector;
    private _appIdentity;
    private _authorizationResult;
    private _authorizationResultCache;
    private _connecting;
    /**
     * Every time the connection is recycled in some way (eg. `disconnect()` is called)
     * increment this and use it to make sure that `transact` calls from the previous
     * 'generation' don't continue to do work and throw exceptions.
     */
    private _connectionGeneration;
    private _chain;
    private _onWalletNotFound;
    private _publicKey;
    private _readyState;
    private _selectedAddress;
    private _hostAuthority;
    /**
     * @deprecated @param cluster config paramter is deprecated, use @param chain instead
     */
    constructor(config: {
        addressSelector: AddressSelector;
        appIdentity: AppIdentity;
        authorizationResultCache: AuthorizationResultCache;
        cluster: Cluster;
        onWalletNotFound: (mobileWalletAdapter: SolanaMobileWalletAdapter) => Promise<void>;
    });
    constructor(config: {
        addressSelector: AddressSelector;
        appIdentity: AppIdentity;
        authorizationResultCache: AuthorizationResultCache;
        chain: Chain;
        onWalletNotFound: (mobileWalletAdapter: SolanaMobileWalletAdapter) => Promise<void>;
    });
    constructor(config: {
        addressSelector: AddressSelector;
        appIdentity: AppIdentity;
        authorizationResultCache: AuthorizationResultCache;
        chain: Chain;
        remoteHostAuthority: string;
        onWalletNotFound: (mobileWalletAdapter: SolanaMobileWalletAdapter) => Promise<void>;
    });
    get publicKey(): PublicKey | null;
    get connected(): boolean;
    get connecting(): boolean;
    get readyState(): WalletReadyState;
    private declareWalletAsInstalled;
    private runWithGuard;
    /** @deprecated Use `autoConnect()` instead. */
    autoConnect_DO_NOT_USE_OR_YOU_WILL_BE_FIRED(): Promise<void>;
    autoConnect(): Promise<void>;
    connect(): Promise<void>;
    performAuthorization(signInPayload?: SignInPayload): Promise<AuthorizationResult>;
    private handleAuthorizationResult;
    private performReauthorization;
    disconnect(): Promise<void>;
    private transact;
    private assertIsAuthorized;
    private performSignTransactions;
    sendTransaction<T extends LegacyTransaction | VersionedTransaction>(transaction: T, connection: Connection, options?: SendOptions): Promise<TransactionSignature>;
    signTransaction<T extends LegacyTransaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends LegacyTransaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signIn(input?: SolanaSignInInput): Promise<SolanaSignInOutput>;
}
declare const SolanaMobileWalletAdapterRemoteWalletName: WalletName<"MWA (Remote)">;
/**
 * This burner wallet adapter is unsafe to use and is only included to provide an easy way for applications to test
 * Wallet Adapter without using a third-party wallet.
 */
declare class SolanaMobileWalletAdapterRemote extends BaseSignInMessageSignerWalletAdapter {
    readonly supportedTransactionVersions: Set<TransactionVersion>;
    name: WalletName<"MWA (Remote)">;
    url: string;
    icon: string;
    private _addressSelector;
    private _appIdentity;
    private _authorizationResult;
    private _authorizationResultCache;
    private _connecting;
    /**
     * Every time the connection is recycled in some way (eg. `disconnect()` is called)
     * increment this and use it to make sure that `transact` calls from the previous
     * 'generation' don't continue to do work and throw exceptions.
     */
    private _connectionGeneration;
    private _chain;
    private _onWalletNotFound;
    private _publicKey;
    private _readyState;
    private _selectedAddress;
    private _hostAuthority;
    private _wallet;
    constructor(config: {
        addressSelector: AddressSelector;
        appIdentity: AppIdentity;
        authorizationResultCache: AuthorizationResultCache;
        chain: Chain;
        remoteHostAuthority: string;
        onWalletNotFound: (mobileWalletAdapter: SolanaMobileWalletAdapterRemote) => Promise<void>;
    });
    get publicKey(): PublicKey | null;
    get connected(): boolean;
    get connecting(): boolean;
    get readyState(): WalletReadyState;
    private declareWalletAsInstalled;
    private runWithGuard;
    autoConnect(): Promise<void>;
    connect(): Promise<void>;
    performAuthorization(signInPayload?: SignInPayload): Promise<AuthorizationResult>;
    private handleAuthorizationResult;
    private performReauthorization;
    disconnect(): Promise<void>;
    private transact;
    private assertIsAuthorized;
    private performSignTransactions;
    sendTransaction<T extends LegacyTransaction | VersionedTransaction>(transaction: T, connection: Connection, options?: SendOptions): Promise<TransactionSignature>;
    signTransaction<T extends LegacyTransaction | VersionedTransaction>(transaction: T): Promise<T>;
    signAllTransactions<T extends LegacyTransaction | VersionedTransaction>(transactions: T[]): Promise<T[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signIn(input?: SolanaSignInInput): Promise<SolanaSignInOutput>;
}
declare function createDefaultAddressSelector(): AddressSelector;
declare function createDefaultAuthorizationResultCache(): AuthorizationResultCache;
declare function createDefaultWalletNotFoundHandler(): (mobileWalletAdapter: SolanaMobileWalletAdapter) => Promise<void>;
export { AuthorizationResultCache, AddressSelector, SolanaMobileWalletAdapterWalletName, SolanaMobileWalletAdapter, SolanaMobileWalletAdapterRemoteWalletName, SolanaMobileWalletAdapterRemote, createDefaultAddressSelector, createDefaultAuthorizationResultCache, createDefaultWalletNotFoundHandler };
//# sourceMappingURL=index.d.ts.map