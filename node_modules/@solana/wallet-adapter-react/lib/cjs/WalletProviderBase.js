"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProviderBase = void 0;
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const react_1 = __importStar(require("react"));
const errors_js_1 = require("./errors.js");
const useWallet_js_1 = require("./useWallet.js");
function WalletProviderBase({ children, wallets: adapters, adapter, isUnloadingRef, onAutoConnectRequest, onConnectError, onError, onSelectWallet, }) {
    const isConnectingRef = (0, react_1.useRef)(false);
    const [connecting, setConnecting] = (0, react_1.useState)(false);
    const isDisconnectingRef = (0, react_1.useRef)(false);
    const [disconnecting, setDisconnecting] = (0, react_1.useState)(false);
    const [publicKey, setPublicKey] = (0, react_1.useState)(() => { var _a; return (_a = adapter === null || adapter === void 0 ? void 0 : adapter.publicKey) !== null && _a !== void 0 ? _a : null; });
    const [connected, setConnected] = (0, react_1.useState)(() => { var _a; return (_a = adapter === null || adapter === void 0 ? void 0 : adapter.connected) !== null && _a !== void 0 ? _a : false; });
    /**
     * Store the error handlers as refs so that a change in the
     * custom error handler does not recompute other dependencies.
     */
    const onErrorRef = (0, react_1.useRef)(onError);
    (0, react_1.useEffect)(() => {
        onErrorRef.current = onError;
        return () => {
            onErrorRef.current = undefined;
        };
    }, [onError]);
    const handleErrorRef = (0, react_1.useRef)((error, adapter) => {
        if (!isUnloadingRef.current) {
            if (onErrorRef.current) {
                onErrorRef.current(error, adapter);
            }
            else {
                console.error(error, adapter);
                if (error instanceof wallet_adapter_base_1.WalletNotReadyError && typeof window !== 'undefined' && adapter) {
                    window.open(adapter.url, '_blank');
                }
            }
        }
        return error;
    });
    // Wrap adapters to conform to the `Wallet` interface
    const [wallets, setWallets] = (0, react_1.useState)(() => adapters
        .map((adapter) => ({
        adapter,
        readyState: adapter.readyState,
    }))
        .filter(({ readyState }) => readyState !== wallet_adapter_base_1.WalletReadyState.Unsupported));
    // When the adapters change, start to listen for changes to their `readyState`
    (0, react_1.useEffect)(() => {
        // When the adapters change, wrap them to conform to the `Wallet` interface
        setWallets((wallets) => adapters
            .map((adapter, index) => {
            const wallet = wallets[index];
            // If the wallet hasn't changed, return the same instance
            return wallet && wallet.adapter === adapter && wallet.readyState === adapter.readyState
                ? wallet
                : {
                    adapter: adapter,
                    readyState: adapter.readyState,
                };
        })
            .filter(({ readyState }) => readyState !== wallet_adapter_base_1.WalletReadyState.Unsupported));
        function handleReadyStateChange(readyState) {
            setWallets((prevWallets) => {
                const index = prevWallets.findIndex(({ adapter }) => adapter === this);
                if (index === -1)
                    return prevWallets;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const { adapter } = prevWallets[index];
                return [
                    ...prevWallets.slice(0, index),
                    { adapter, readyState },
                    ...prevWallets.slice(index + 1),
                ].filter(({ readyState }) => readyState !== wallet_adapter_base_1.WalletReadyState.Unsupported);
            });
        }
        adapters.forEach((adapter) => adapter.on('readyStateChange', handleReadyStateChange, adapter));
        return () => {
            adapters.forEach((adapter) => adapter.off('readyStateChange', handleReadyStateChange, adapter));
        };
    }, [adapter, adapters]);
    const wallet = (0, react_1.useMemo)(() => { var _a; return (_a = wallets.find((wallet) => wallet.adapter === adapter)) !== null && _a !== void 0 ? _a : null; }, [adapter, wallets]);
    // Setup and teardown event listeners when the adapter changes
    (0, react_1.useEffect)(() => {
        if (!adapter)
            return;
        const handleConnect = (publicKey) => {
            setPublicKey(publicKey);
            isConnectingRef.current = false;
            setConnecting(false);
            setConnected(true);
            isDisconnectingRef.current = false;
            setDisconnecting(false);
        };
        const handleDisconnect = () => {
            if (isUnloadingRef.current)
                return;
            setPublicKey(null);
            isConnectingRef.current = false;
            setConnecting(false);
            setConnected(false);
            isDisconnectingRef.current = false;
            setDisconnecting(false);
        };
        const handleError = (error) => {
            handleErrorRef.current(error, adapter);
        };
        adapter.on('connect', handleConnect);
        adapter.on('disconnect', handleDisconnect);
        adapter.on('error', handleError);
        return () => {
            adapter.off('connect', handleConnect);
            adapter.off('disconnect', handleDisconnect);
            adapter.off('error', handleError);
            handleDisconnect();
        };
    }, [adapter, isUnloadingRef]);
    // When the adapter changes, clear the `autoConnect` tracking flag
    const didAttemptAutoConnectRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        return () => {
            didAttemptAutoConnectRef.current = false;
        };
    }, [adapter]);
    // If auto-connect is enabled, request to connect when the adapter changes and is ready
    (0, react_1.useEffect)(() => {
        if (didAttemptAutoConnectRef.current ||
            isConnectingRef.current ||
            connected ||
            !onAutoConnectRequest ||
            !((wallet === null || wallet === void 0 ? void 0 : wallet.readyState) === wallet_adapter_base_1.WalletReadyState.Installed || (wallet === null || wallet === void 0 ? void 0 : wallet.readyState) === wallet_adapter_base_1.WalletReadyState.Loadable))
            return;
        isConnectingRef.current = true;
        setConnecting(true);
        didAttemptAutoConnectRef.current = true;
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield onAutoConnectRequest();
                }
                catch (_a) {
                    onConnectError();
                    // Drop the error. It will be caught by `handleError` anyway.
                }
                finally {
                    setConnecting(false);
                    isConnectingRef.current = false;
                }
            });
        })();
    }, [connected, onAutoConnectRequest, onConnectError, wallet]);
    // Send a transaction using the provided connection
    const sendTransaction = (0, react_1.useCallback)((transaction, connection, options) => __awaiter(this, void 0, void 0, function* () {
        if (!adapter)
            throw handleErrorRef.current(new errors_js_1.WalletNotSelectedError());
        if (!connected)
            throw handleErrorRef.current(new wallet_adapter_base_1.WalletNotConnectedError(), adapter);
        return yield adapter.sendTransaction(transaction, connection, options);
    }), [adapter, connected]);
    // Sign a transaction if the wallet supports it
    const signTransaction = (0, react_1.useMemo)(() => adapter && 'signTransaction' in adapter
        ? (transaction) => __awaiter(this, void 0, void 0, function* () {
            if (!connected)
                throw handleErrorRef.current(new wallet_adapter_base_1.WalletNotConnectedError(), adapter);
            return yield adapter.signTransaction(transaction);
        })
        : undefined, [adapter, connected]);
    // Sign multiple transactions if the wallet supports it
    const signAllTransactions = (0, react_1.useMemo)(() => adapter && 'signAllTransactions' in adapter
        ? (transactions) => __awaiter(this, void 0, void 0, function* () {
            if (!connected)
                throw handleErrorRef.current(new wallet_adapter_base_1.WalletNotConnectedError(), adapter);
            return yield adapter.signAllTransactions(transactions);
        })
        : undefined, [adapter, connected]);
    // Sign an arbitrary message if the wallet supports it
    const signMessage = (0, react_1.useMemo)(() => adapter && 'signMessage' in adapter
        ? (message) => __awaiter(this, void 0, void 0, function* () {
            if (!connected)
                throw handleErrorRef.current(new wallet_adapter_base_1.WalletNotConnectedError(), adapter);
            return yield adapter.signMessage(message);
        })
        : undefined, [adapter, connected]);
    // Sign in if the wallet supports it
    const signIn = (0, react_1.useMemo)(() => adapter && 'signIn' in adapter
        ? (input) => __awaiter(this, void 0, void 0, function* () {
            return yield adapter.signIn(input);
        })
        : undefined, [adapter]);
    const handleConnect = (0, react_1.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        if (isConnectingRef.current || isDisconnectingRef.current || (wallet === null || wallet === void 0 ? void 0 : wallet.adapter.connected))
            return;
        if (!wallet)
            throw handleErrorRef.current(new errors_js_1.WalletNotSelectedError());
        const { adapter, readyState } = wallet;
        if (!(readyState === wallet_adapter_base_1.WalletReadyState.Installed || readyState === wallet_adapter_base_1.WalletReadyState.Loadable))
            throw handleErrorRef.current(new wallet_adapter_base_1.WalletNotReadyError(), adapter);
        isConnectingRef.current = true;
        setConnecting(true);
        try {
            yield adapter.connect();
        }
        catch (e) {
            onConnectError();
            throw e;
        }
        finally {
            setConnecting(false);
            isConnectingRef.current = false;
        }
    }), [onConnectError, wallet]);
    const handleDisconnect = (0, react_1.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        if (isDisconnectingRef.current)
            return;
        if (!adapter)
            return;
        isDisconnectingRef.current = true;
        setDisconnecting(true);
        try {
            yield adapter.disconnect();
        }
        finally {
            setDisconnecting(false);
            isDisconnectingRef.current = false;
        }
    }), [adapter]);
    return (react_1.default.createElement(useWallet_js_1.WalletContext.Provider, { value: {
            autoConnect: !!onAutoConnectRequest,
            wallets,
            wallet,
            publicKey,
            connected,
            connecting,
            disconnecting,
            select: onSelectWallet,
            connect: handleConnect,
            disconnect: handleDisconnect,
            sendTransaction,
            signTransaction,
            signAllTransactions,
            signMessage,
            signIn,
        } }, children));
}
exports.WalletProviderBase = WalletProviderBase;
//# sourceMappingURL=WalletProviderBase.js.map