"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletMultiButton = void 0;
const react_1 = __importDefault(require("react"));
const BaseWalletMultiButton_js_1 = require("./BaseWalletMultiButton.js");
const LABELS = {
    'change-wallet': 'Change wallet',
    connecting: 'Connecting ...',
    'copy-address': 'Copy address',
    copied: 'Copied',
    disconnect: 'Disconnect',
    'has-wallet': 'Connect',
    'no-wallet': 'Select Wallet',
};
function WalletMultiButton(props) {
    return react_1.default.createElement(BaseWalletMultiButton_js_1.BaseWalletMultiButton, Object.assign({}, props, { labels: LABELS }));
}
exports.WalletMultiButton = WalletMultiButton;
//# sourceMappingURL=WalletMultiButton.js.map