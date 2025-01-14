"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWalletConnectButton = void 0;
const wallet_adapter_base_ui_1 = require("@solana/wallet-adapter-base-ui");
const react_1 = __importDefault(require("react"));
const BaseWalletConnectionButton_js_1 = require("./BaseWalletConnectionButton.js");
function BaseWalletConnectButton(_a) {
    var { children, disabled, labels, onClick } = _a, props = __rest(_a, ["children", "disabled", "labels", "onClick"]);
    const { buttonDisabled, buttonState, onButtonClick, walletIcon, walletName } = (0, wallet_adapter_base_ui_1.useWalletConnectButton)();
    return (react_1.default.createElement(BaseWalletConnectionButton_js_1.BaseWalletConnectionButton, Object.assign({}, props, { disabled: disabled || buttonDisabled, onClick: (e) => {
            if (onClick) {
                onClick(e);
            }
            if (e.defaultPrevented) {
                return;
            }
            if (onButtonClick) {
                onButtonClick();
            }
        }, walletIcon: walletIcon, walletName: walletName }), children ? children : labels[buttonState]));
}
exports.BaseWalletConnectButton = BaseWalletConnectButton;
//# sourceMappingURL=BaseWalletConnectButton.js.map