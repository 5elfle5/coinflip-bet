"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletDisconnectButton = void 0;
const react_1 = __importDefault(require("react"));
const BaseWalletDisconnectButton_js_1 = require("./BaseWalletDisconnectButton.js");
const LABELS = {
    disconnecting: 'Disconnecting ...',
    'has-wallet': 'Disconnect',
    'no-wallet': 'Disconnect Wallet',
};
function WalletDisconnectButton(props) {
    return react_1.default.createElement(BaseWalletDisconnectButton_js_1.BaseWalletDisconnectButton, Object.assign({}, props, { labels: LABELS }));
}
exports.WalletDisconnectButton = WalletDisconnectButton;
//# sourceMappingURL=WalletDisconnectButton.js.map