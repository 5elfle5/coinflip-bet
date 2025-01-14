"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletConnectButton = void 0;
const react_1 = __importDefault(require("react"));
const BaseWalletConnectButton_js_1 = require("./BaseWalletConnectButton.js");
const LABELS = {
    connecting: 'Connecting ...',
    connected: 'Connected',
    'has-wallet': 'Connect',
    'no-wallet': 'Connect Wallet',
};
function WalletConnectButton(props) {
    return react_1.default.createElement(BaseWalletConnectButton_js_1.BaseWalletConnectButton, Object.assign({}, props, { labels: LABELS }));
}
exports.WalletConnectButton = WalletConnectButton;
//# sourceMappingURL=WalletConnectButton.js.map