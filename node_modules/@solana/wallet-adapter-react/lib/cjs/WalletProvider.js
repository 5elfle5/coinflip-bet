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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProvider = void 0;
const wallet_adapter_mobile_1 = require("@solana-mobile/wallet-adapter-mobile");
const wallet_standard_wallet_adapter_react_1 = require("@solana/wallet-standard-wallet-adapter-react");
const react_1 = __importStar(require("react"));
const getEnvironment_js_1 = __importStar(require("./getEnvironment.js"));
const getInferredClusterFromEndpoint_js_1 = __importDefault(require("./getInferredClusterFromEndpoint.js"));
const useConnection_js_1 = require("./useConnection.js");
const useLocalStorage_js_1 = require("./useLocalStorage.js");
const WalletProviderBase_js_1 = require("./WalletProviderBase.js");
let _userAgent;
function getUserAgent() {
    var _a, _b;
    if (_userAgent === undefined) {
        _userAgent = (_b = (_a = globalThis.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) !== null && _b !== void 0 ? _b : null;
    }
    return _userAgent;
}
function getIsMobile(adapters) {
    const userAgentString = getUserAgent();
    return (0, getEnvironment_js_1.default)({ adapters, userAgentString }) === getEnvironment_js_1.Environment.MOBILE_WEB;
}
function getUriForAppIdentity() {
    const location = globalThis.location;
    if (!location)
        return;
    return `${location.protocol}//${location.host}`;
}
function WalletProvider({ children, wallets: adapters, autoConnect, localStorageKey = 'walletName', onError, }) {
    const { connection } = (0, useConnection_js_1.useConnection)();
    const adaptersWithStandardAdapters = (0, wallet_standard_wallet_adapter_react_1.useStandardWalletAdapters)(adapters);
    const mobileWalletAdapter = (0, react_1.useMemo)(() => {
        if (!getIsMobile(adaptersWithStandardAdapters)) {
            return null;
        }
        const existingMobileWalletAdapter = adaptersWithStandardAdapters.find((adapter) => adapter.name === wallet_adapter_mobile_1.SolanaMobileWalletAdapterWalletName);
        if (existingMobileWalletAdapter) {
            return existingMobileWalletAdapter;
        }
        return new wallet_adapter_mobile_1.SolanaMobileWalletAdapter({
            addressSelector: (0, wallet_adapter_mobile_1.createDefaultAddressSelector)(),
            appIdentity: {
                uri: getUriForAppIdentity(),
            },
            authorizationResultCache: (0, wallet_adapter_mobile_1.createDefaultAuthorizationResultCache)(),
            cluster: (0, getInferredClusterFromEndpoint_js_1.default)(connection === null || connection === void 0 ? void 0 : connection.rpcEndpoint),
            onWalletNotFound: (0, wallet_adapter_mobile_1.createDefaultWalletNotFoundHandler)(),
        });
    }, [adaptersWithStandardAdapters, connection === null || connection === void 0 ? void 0 : connection.rpcEndpoint]);
    const adaptersWithMobileWalletAdapter = (0, react_1.useMemo)(() => {
        if (mobileWalletAdapter == null || adaptersWithStandardAdapters.indexOf(mobileWalletAdapter) !== -1) {
            return adaptersWithStandardAdapters;
        }
        return [mobileWalletAdapter, ...adaptersWithStandardAdapters];
    }, [adaptersWithStandardAdapters, mobileWalletAdapter]);
    const [walletName, setWalletName] = (0, useLocalStorage_js_1.useLocalStorage)(localStorageKey, getIsMobile(adaptersWithStandardAdapters) ? wallet_adapter_mobile_1.SolanaMobileWalletAdapterWalletName : null);
    const adapter = (0, react_1.useMemo)(() => { var _a; return (_a = adaptersWithMobileWalletAdapter.find((a) => a.name === walletName)) !== null && _a !== void 0 ? _a : null; }, [adaptersWithMobileWalletAdapter, walletName]);
    const changeWallet = (0, react_1.useCallback)((nextWalletName) => {
        if (walletName === nextWalletName)
            return;
        if (adapter &&
            // Selecting a wallet other than the mobile wallet adapter is not
            // sufficient reason to call `disconnect` on the mobile wallet adapter.
            // Calling `disconnect` on the mobile wallet adapter causes the entire
            // authorization store to be wiped.
            adapter.name !== wallet_adapter_mobile_1.SolanaMobileWalletAdapterWalletName) {
            adapter.disconnect();
        }
        setWalletName(nextWalletName);
    }, [adapter, setWalletName, walletName]);
    (0, react_1.useEffect)(() => {
        if (!adapter)
            return;
        function handleDisconnect() {
            if (isUnloadingRef.current)
                return;
            // Leave the adapter selected in the event of a disconnection.
            if (walletName === wallet_adapter_mobile_1.SolanaMobileWalletAdapterWalletName && getIsMobile(adaptersWithStandardAdapters))
                return;
            setWalletName(null);
        }
        adapter.on('disconnect', handleDisconnect);
        return () => {
            adapter.off('disconnect', handleDisconnect);
        };
    }, [adapter, adaptersWithStandardAdapters, setWalletName, walletName]);
    const hasUserSelectedAWallet = (0, react_1.useRef)(false);
    const handleAutoConnectRequest = (0, react_1.useMemo)(() => {
        if (!autoConnect || !adapter)
            return;
        return () => __awaiter(this, void 0, void 0, function* () {
            // If autoConnect is true or returns true, use the default autoConnect behavior.
            if (autoConnect === true || (yield autoConnect(adapter))) {
                if (hasUserSelectedAWallet.current) {
                    yield adapter.connect();
                }
                else {
                    yield adapter.autoConnect();
                }
            }
        });
    }, [autoConnect, adapter]);
    const isUnloadingRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (walletName === wallet_adapter_mobile_1.SolanaMobileWalletAdapterWalletName && getIsMobile(adaptersWithStandardAdapters)) {
            isUnloadingRef.current = false;
            return;
        }
        function handleBeforeUnload() {
            isUnloadingRef.current = true;
        }
        /**
         * Some wallets fire disconnection events when the window unloads. Since there's no way to
         * distinguish between a disconnection event received because a user initiated it, and one
         * that was received because they've closed the window, we have to track window unload
         * events themselves. Downstream components use this information to decide whether to act
         * upon or drop wallet events and errors.
         */
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [adaptersWithStandardAdapters, walletName]);
    const handleConnectError = (0, react_1.useCallback)(() => {
        if (adapter && adapter.name !== wallet_adapter_mobile_1.SolanaMobileWalletAdapterWalletName) {
            // If any error happens while connecting, unset the adapter.
            changeWallet(null);
        }
    }, [adapter, changeWallet]);
    const selectWallet = (0, react_1.useCallback)((walletName) => {
        hasUserSelectedAWallet.current = true;
        changeWallet(walletName);
    }, [changeWallet]);
    return (react_1.default.createElement(WalletProviderBase_js_1.WalletProviderBase, { wallets: adaptersWithMobileWalletAdapter, adapter: adapter, isUnloadingRef: isUnloadingRef, onAutoConnectRequest: handleAutoConnectRequest, onConnectError: handleConnectError, onError: onError, onSelectWallet: selectWallet }, children));
}
exports.WalletProvider = WalletProvider;
//# sourceMappingURL=WalletProvider.js.map