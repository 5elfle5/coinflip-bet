import { TransactionVersion } from "@solana/web3.js";
import { SolanaSignInInput } from "@solana/wallet-standard";
import { IdentifierArray, IdentifierString, WalletAccount, WalletIcon } from "@wallet-standard/core";
// Typescript `enums` thwart tree-shaking. See https://bargsten.org/jsts/enums/
declare const SolanaMobileWalletAdapterErrorCode: {
    readonly ERROR_ASSOCIATION_PORT_OUT_OF_RANGE: "ERROR_ASSOCIATION_PORT_OUT_OF_RANGE";
    readonly ERROR_REFLECTOR_ID_OUT_OF_RANGE: "ERROR_REFLECTOR_ID_OUT_OF_RANGE";
    readonly ERROR_FORBIDDEN_WALLET_BASE_URL: "ERROR_FORBIDDEN_WALLET_BASE_URL";
    readonly ERROR_SECURE_CONTEXT_REQUIRED: "ERROR_SECURE_CONTEXT_REQUIRED";
    readonly ERROR_SESSION_CLOSED: "ERROR_SESSION_CLOSED";
    readonly ERROR_SESSION_TIMEOUT: "ERROR_SESSION_TIMEOUT";
    readonly ERROR_WALLET_NOT_FOUND: "ERROR_WALLET_NOT_FOUND";
    readonly ERROR_INVALID_PROTOCOL_VERSION: "ERROR_INVALID_PROTOCOL_VERSION";
};
type SolanaMobileWalletAdapterErrorCodeEnum = (typeof SolanaMobileWalletAdapterErrorCode)[keyof typeof SolanaMobileWalletAdapterErrorCode];
type ErrorDataTypeMap = {
    [SolanaMobileWalletAdapterErrorCode.ERROR_ASSOCIATION_PORT_OUT_OF_RANGE]: {
        port: number;
    };
    [SolanaMobileWalletAdapterErrorCode.ERROR_REFLECTOR_ID_OUT_OF_RANGE]: {
        id: number;
    };
    [SolanaMobileWalletAdapterErrorCode.ERROR_FORBIDDEN_WALLET_BASE_URL]: undefined;
    [SolanaMobileWalletAdapterErrorCode.ERROR_SECURE_CONTEXT_REQUIRED]: undefined;
    [SolanaMobileWalletAdapterErrorCode.ERROR_SESSION_CLOSED]: {
        closeEvent: CloseEvent;
    };
    [SolanaMobileWalletAdapterErrorCode.ERROR_SESSION_TIMEOUT]: undefined;
    [SolanaMobileWalletAdapterErrorCode.ERROR_WALLET_NOT_FOUND]: undefined;
    [SolanaMobileWalletAdapterErrorCode.ERROR_INVALID_PROTOCOL_VERSION]: undefined;
};
declare class SolanaMobileWalletAdapterError<TErrorCode extends SolanaMobileWalletAdapterErrorCodeEnum> extends Error {
    data: ErrorDataTypeMap[TErrorCode] | undefined;
    code: TErrorCode;
    constructor(...args: ErrorDataTypeMap[TErrorCode] extends Record<string, unknown> ? [
        code: TErrorCode,
        message: string,
        data: ErrorDataTypeMap[TErrorCode]
    ] : [
        code: TErrorCode,
        message: string
    ]);
}
type JSONRPCErrorCode = number;
// Typescript `enums` thwart tree-shaking. See https://bargsten.org/jsts/enums/
declare const SolanaMobileWalletAdapterProtocolErrorCode: {
    readonly ERROR_AUTHORIZATION_FAILED: -1;
    readonly ERROR_INVALID_PAYLOADS: -2;
    readonly ERROR_NOT_SIGNED: -3;
    readonly ERROR_NOT_SUBMITTED: -4;
    readonly ERROR_TOO_MANY_PAYLOADS: -5;
    readonly ERROR_ATTEST_ORIGIN_ANDROID: -100;
};
type SolanaMobileWalletAdapterProtocolErrorCodeEnum = (typeof SolanaMobileWalletAdapterProtocolErrorCode)[keyof typeof SolanaMobileWalletAdapterProtocolErrorCode];
type ProtocolErrorDataTypeMap = {
    [SolanaMobileWalletAdapterProtocolErrorCode.ERROR_AUTHORIZATION_FAILED]: undefined;
    [SolanaMobileWalletAdapterProtocolErrorCode.ERROR_INVALID_PAYLOADS]: undefined;
    [SolanaMobileWalletAdapterProtocolErrorCode.ERROR_NOT_SIGNED]: undefined;
    [SolanaMobileWalletAdapterProtocolErrorCode.ERROR_NOT_SUBMITTED]: undefined;
    [SolanaMobileWalletAdapterProtocolErrorCode.ERROR_TOO_MANY_PAYLOADS]: undefined;
    [SolanaMobileWalletAdapterProtocolErrorCode.ERROR_ATTEST_ORIGIN_ANDROID]: {
        attest_origin_uri: string;
        challenge: string;
        context: string;
    };
};
declare class SolanaMobileWalletAdapterProtocolError<TErrorCode extends SolanaMobileWalletAdapterProtocolErrorCodeEnum> extends Error {
    data: ProtocolErrorDataTypeMap[TErrorCode] | undefined;
    code: TErrorCode | JSONRPCErrorCode;
    jsonRpcMessageId: number;
    constructor(...args: ProtocolErrorDataTypeMap[TErrorCode] extends Record<string, unknown> ? [
        jsonRpcMessageId: number,
        code: TErrorCode | JSONRPCErrorCode,
        message: string,
        data: ProtocolErrorDataTypeMap[TErrorCode]
    ] : [
        jsonRpcMessageId: number,
        code: TErrorCode | JSONRPCErrorCode,
        message: string
    ]);
}
type Account = Readonly<{
    address: Base64EncodedAddress;
    label?: string;
    icon?: WalletIcon;
    chains?: IdentifierArray;
    features?: IdentifierArray;
}> | WalletAccount;
/**
 * Properties that wallets may present to users when an app
 * asks for authorization to execute privileged methods (see
 * {@link PrivilegedMethods}).
 */
type AppIdentity = Readonly<{
    uri?: string;
    icon?: string;
    name?: string;
}>;
/**
 * An ephemeral elliptic-curve keypair on the P-256 curve.
 * This public key is used to create the association token.
 * The private key is used during session establishment.
 */
type AssociationKeypair = CryptoKeyPair;
type ProtocolVersion = "v1" | "legacy";
type SessionProperties = Readonly<{
    protocol_version: ProtocolVersion;
}>;
/**
 * The context returned from a wallet after having authorized a given
 * account for use with a given application. You can cache this and
 * use it later to invoke privileged methods.
 */
type AuthorizationResult = Readonly<{
    accounts: Account[];
    auth_token: AuthToken;
    wallet_uri_base: string;
    sign_in_result?: SignInResult;
}>;
type AuthToken = string;
type Base64EncodedAddress = string;
type Base64EncodedSignature = string;
type Base64EncodedMessage = string;
type Base64EncodedSignedMessage = string;
type Base64EncodedSignedTransaction = string;
type Base64EncodedTransaction = string;
/**
 * @deprecated Replaced by the 'chain' parameter, which adds multi-chain capability as per MWA 2.0 spec.
 */
type Cluster = "devnet" | "testnet" | "mainnet-beta";
type Chain = IdentifierString | Cluster;
type Finality = "confirmed" | "finalized" | "processed";
type WalletAssociationConfig = Readonly<{
    baseUri?: string;
}>;
type RemoteWalletAssociationConfig = WalletAssociationConfig & Readonly<{
    remoteHostAuthority: string;
}>;
interface AuthorizeAPI {
    /**
     * @deprecated Replaced by updated authorize() method, which adds MWA 2.0 spec support.
     */
    authorize(params: {
        cluster: Cluster;
        identity: AppIdentity;
    }): Promise<AuthorizationResult>;
    authorize(params: {
        identity: AppIdentity;
        chain?: Chain;
        features?: IdentifierArray;
        addresses?: string[];
        auth_token?: AuthToken;
        sign_in_payload?: SignInPayload;
    }): Promise<AuthorizationResult>;
}
interface CloneAuthorizationAPI {
    cloneAuthorization(params: {
        auth_token: AuthToken;
    }): Promise<Readonly<{
        auth_token: AuthToken;
    }>>;
}
interface DeauthorizeAPI {
    deauthorize(params: {
        auth_token: AuthToken;
    }): Promise<Readonly<Record<string, never>>>;
}
interface GetCapabilitiesAPI {
    getCapabilities(): Promise<Readonly<{
        max_transactions_per_request: number;
        max_messages_per_request: number;
        supported_transaction_versions: ReadonlyArray<TransactionVersion>;
        features: IdentifierArray;
        /**
         * @deprecated Replaced by features array.
         */
        supports_clone_authorization: boolean;
        /**
         * @deprecated Replaced by features array.
         */
        supports_sign_and_send_transactions: boolean;
    }>>;
}
interface ReauthorizeAPI {
    reauthorize(params: {
        auth_token: AuthToken;
        identity: AppIdentity;
    }): Promise<AuthorizationResult>;
}
interface SignMessagesAPI {
    signMessages(params: {
        addresses: Base64EncodedAddress[];
        payloads: Base64EncodedMessage[];
    }): Promise<Readonly<{
        signed_payloads: Base64EncodedSignedMessage[];
    }>>;
}
interface SignTransactionsAPI {
    signTransactions(params: {
        payloads: Base64EncodedTransaction[];
    }): Promise<Readonly<{
        signed_payloads: Base64EncodedSignedTransaction[];
    }>>;
}
interface SignAndSendTransactionsAPI {
    signAndSendTransactions(params: {
        options?: Readonly<{
            min_context_slot?: number;
            commitment?: string;
            skip_preflight?: boolean;
            max_retries?: number;
            wait_for_commitment_to_send_next_transaction?: boolean;
        }>;
        payloads: Base64EncodedTransaction[];
    }): Promise<Readonly<{
        signatures: Base64EncodedSignature[];
    }>>;
}
interface MobileWallet extends AuthorizeAPI, CloneAuthorizationAPI, DeauthorizeAPI, GetCapabilitiesAPI, ReauthorizeAPI, SignMessagesAPI, SignTransactionsAPI, SignAndSendTransactionsAPI {
}
interface TerminateSessionAPI {
    terminateSession(): void;
}
interface RemoteMobileWallet extends MobileWallet, TerminateSessionAPI {
}
// optional features
declare const SolanaSignTransactions = "solana:signTransactions";
declare const SolanaCloneAuthorization = "solana:cloneAuthorization";
declare const SolanaSignInWithSolana = "solana:signInWithSolana";
type SignInPayload = Readonly<{
    domain?: string;
    address?: string;
    statement?: string;
    uri?: string;
    version?: string;
    chainId?: string;
    nonce?: string;
    issuedAt?: string;
    expirationTime?: string;
    notBefore?: string;
    requestId?: string;
    resources?: readonly string[];
}> | SolanaSignInInput;
type SignInPayloadWithRequiredFields = Partial<SignInPayload> & Required<Pick<SignInPayload, "domain" | "address">>;
type SignInResult = Readonly<{
    address: Base64EncodedAddress;
    signed_message: Base64EncodedSignedMessage;
    signature: Base64EncodedAddress;
    signature_type?: string;
}>;
declare function transact<TReturn>(callback: (wallet: MobileWallet) => TReturn, config?: WalletAssociationConfig): Promise<TReturn>;
declare function transactRemote<TReturn>(callback: (wallet: RemoteMobileWallet) => TReturn, config: RemoteWalletAssociationConfig): Promise<{
    associationUrl: URL;
    result: Promise<TReturn>;
}>;
export { SolanaMobileWalletAdapterErrorCode, SolanaMobileWalletAdapterError, SolanaMobileWalletAdapterProtocolErrorCode, SolanaMobileWalletAdapterProtocolError, transact, transactRemote, Account, AppIdentity, AssociationKeypair, ProtocolVersion, SessionProperties, AuthorizationResult, AuthToken, Base64EncodedAddress, Base64EncodedTransaction, Cluster, Chain, Finality, WalletAssociationConfig, RemoteWalletAssociationConfig, AuthorizeAPI, CloneAuthorizationAPI, DeauthorizeAPI, GetCapabilitiesAPI, ReauthorizeAPI, SignMessagesAPI, SignTransactionsAPI, SignAndSendTransactionsAPI, MobileWallet, TerminateSessionAPI, RemoteMobileWallet, SolanaSignTransactions, SolanaCloneAuthorization, SolanaSignInWithSolana, SignInPayload, SignInPayloadWithRequiredFields, SignInResult };
//# sourceMappingURL=index.native.d.ts.map