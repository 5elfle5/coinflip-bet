import { createContext, useContext } from 'react';
const EMPTY_ARRAY = [];
const DEFAULT_CONTEXT = {
    autoConnect: false,
    connecting: false,
    connected: false,
    disconnecting: false,
    select() {
        logMissingProviderError('call', 'select');
    },
    connect() {
        return Promise.reject(logMissingProviderError('call', 'connect'));
    },
    disconnect() {
        return Promise.reject(logMissingProviderError('call', 'disconnect'));
    },
    sendTransaction() {
        return Promise.reject(logMissingProviderError('call', 'sendTransaction'));
    },
    signTransaction() {
        return Promise.reject(logMissingProviderError('call', 'signTransaction'));
    },
    signAllTransactions() {
        return Promise.reject(logMissingProviderError('call', 'signAllTransactions'));
    },
    signMessage() {
        return Promise.reject(logMissingProviderError('call', 'signMessage'));
    },
    signIn() {
        return Promise.reject(logMissingProviderError('call', 'signIn'));
    },
};
Object.defineProperty(DEFAULT_CONTEXT, 'wallets', {
    get() {
        logMissingProviderError('read', 'wallets');
        return EMPTY_ARRAY;
    },
});
Object.defineProperty(DEFAULT_CONTEXT, 'wallet', {
    get() {
        logMissingProviderError('read', 'wallet');
        return null;
    },
});
Object.defineProperty(DEFAULT_CONTEXT, 'publicKey', {
    get() {
        logMissingProviderError('read', 'publicKey');
        return null;
    },
});
function logMissingProviderError(action, property) {
    const error = new Error(`You have tried to ${action} "${property}" on a WalletContext without providing one. ` +
        'Make sure to render a WalletProvider as an ancestor of the component that uses WalletContext.');
    console.error(error);
    return error;
}
export const WalletContext = createContext(DEFAULT_CONTEXT);
export function useWallet() {
    return useContext(WalletContext);
}
//# sourceMappingURL=useWallet.js.map