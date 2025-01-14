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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWalletMultiButton = void 0;
const wallet_adapter_base_ui_1 = require("@solana/wallet-adapter-base-ui");
const react_1 = __importStar(require("react"));
const BaseWalletConnectionButton_js_1 = require("./BaseWalletConnectionButton.js");
const useWalletModal_js_1 = require("./useWalletModal.js");
function BaseWalletMultiButton(_a) {
    var { children, labels } = _a, props = __rest(_a, ["children", "labels"]);
    const { setVisible: setModalVisible } = (0, useWalletModal_js_1.useWalletModal)();
    const { buttonState, onConnect, onDisconnect, publicKey, walletIcon, walletName } = (0, wallet_adapter_base_ui_1.useWalletMultiButton)({
        onSelectWallet() {
            setModalVisible(true);
        },
    });
    const [copied, setCopied] = (0, react_1.useState)(false);
    const [menuOpen, setMenuOpen] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const listener = (event) => {
            const node = ref.current;
            // Do nothing if clicking dropdown or its descendants
            if (!node || node.contains(event.target))
                return;
            setMenuOpen(false);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, []);
    const content = (0, react_1.useMemo)(() => {
        if (children) {
            return children;
        }
        else if (publicKey) {
            const base58 = publicKey.toBase58();
            return base58.slice(0, 4) + '..' + base58.slice(-4);
        }
        else if (buttonState === 'connecting' || buttonState === 'has-wallet') {
            return labels[buttonState];
        }
        else {
            return labels['no-wallet'];
        }
    }, [buttonState, children, labels, publicKey]);
    return (react_1.default.createElement("div", { className: "wallet-adapter-dropdown" },
        react_1.default.createElement(BaseWalletConnectionButton_js_1.BaseWalletConnectionButton, Object.assign({}, props, { "aria-expanded": menuOpen, style: Object.assign({ pointerEvents: menuOpen ? 'none' : 'auto' }, props.style), onClick: () => {
                switch (buttonState) {
                    case 'no-wallet':
                        setModalVisible(true);
                        break;
                    case 'has-wallet':
                        if (onConnect) {
                            onConnect();
                        }
                        break;
                    case 'connected':
                        setMenuOpen(true);
                        break;
                }
            }, walletIcon: walletIcon, walletName: walletName }), content),
        react_1.default.createElement("ul", { "aria-label": "dropdown-list", className: `wallet-adapter-dropdown-list ${menuOpen && 'wallet-adapter-dropdown-list-active'}`, ref: ref, role: "menu" },
            publicKey ? (react_1.default.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: () => __awaiter(this, void 0, void 0, function* () {
                    yield navigator.clipboard.writeText(publicKey.toBase58());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 400);
                }), role: "menuitem" }, copied ? labels['copied'] : labels['copy-address'])) : null,
            react_1.default.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: () => {
                    setModalVisible(true);
                    setMenuOpen(false);
                }, role: "menuitem" }, labels['change-wallet']),
            onDisconnect ? (react_1.default.createElement("li", { className: "wallet-adapter-dropdown-list-item", onClick: () => {
                    onDisconnect();
                    setMenuOpen(false);
                }, role: "menuitem" }, labels['disconnect'])) : null)));
}
exports.BaseWalletMultiButton = BaseWalletMultiButton;
//# sourceMappingURL=BaseWalletMultiButton.js.map