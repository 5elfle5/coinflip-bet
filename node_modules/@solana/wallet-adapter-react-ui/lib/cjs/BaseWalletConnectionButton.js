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
exports.BaseWalletConnectionButton = void 0;
const react_1 = __importDefault(require("react"));
const Button_js_1 = require("./Button.js");
const WalletIcon_js_1 = require("./WalletIcon.js");
function BaseWalletConnectionButton(_a) {
    var { walletIcon, walletName } = _a, props = __rest(_a, ["walletIcon", "walletName"]);
    return (react_1.default.createElement(Button_js_1.Button, Object.assign({}, props, { className: "wallet-adapter-button-trigger", startIcon: walletIcon && walletName ? (react_1.default.createElement(WalletIcon_js_1.WalletIcon, { wallet: { adapter: { icon: walletIcon, name: walletName } } })) : undefined })));
}
exports.BaseWalletConnectionButton = BaseWalletConnectionButton;
//# sourceMappingURL=BaseWalletConnectionButton.js.map