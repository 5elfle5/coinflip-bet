import { TransactionSignature, VersionedTransaction } from "@solana/web3.js";
import { Transaction as LegacyTransaction } from "@solana/web3.js";
import { AuthorizeAPI, Base64EncodedAddress, CloneAuthorizationAPI, DeauthorizeAPI, GetCapabilitiesAPI, ReauthorizeAPI, TerminateSessionAPI, WalletAssociationConfig, RemoteWalletAssociationConfig } from "@solana-mobile/mobile-wallet-adapter-protocol";
interface Web3SignAndSendTransactionsAPI {
    signAndSendTransactions<T extends LegacyTransaction | VersionedTransaction>(params: {
        minContextSlot?: number;
        commitment?: string;
        skipPreflight?: boolean;
        maxRetries?: number;
        waitForCommitmentToSendNextTransaction?: boolean;
        transactions: T[];
    }): Promise<TransactionSignature[]>;
}
interface Web3SignTransactionsAPI {
    signTransactions<T extends LegacyTransaction | VersionedTransaction>(params: {
        transactions: T[];
    }): Promise<T[]>;
}
interface Web3SignMessagesAPI {
    signMessages(params: {
        addresses: Base64EncodedAddress[];
        payloads: Uint8Array[];
    }): Promise<Uint8Array[]>;
}
interface Web3MobileWallet extends AuthorizeAPI, CloneAuthorizationAPI, DeauthorizeAPI, GetCapabilitiesAPI, ReauthorizeAPI, Web3SignAndSendTransactionsAPI, Web3SignTransactionsAPI, Web3SignMessagesAPI {
}
interface Web3RemoteMobileWallet extends Web3MobileWallet, TerminateSessionAPI {
}
declare function transact<TReturn>(callback: (wallet: Web3MobileWallet) => TReturn, config?: WalletAssociationConfig): Promise<TReturn>;
declare function transactRemote<TReturn>(callback: (wallet: Web3RemoteMobileWallet) => TReturn, config: RemoteWalletAssociationConfig): Promise<{
    associationUrl: URL;
    result: Promise<TReturn>;
}>;
export { Web3MobileWallet, Web3RemoteMobileWallet, transact, transactRemote };
//# sourceMappingURL=index.d.ts.map