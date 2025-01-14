"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletDisconnectButton = void 0;
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_1 = require("react");
function useWalletDisconnectButton() {
    const { disconnecting, disconnect, wallet } = (0, wallet_adapter_react_1.useWallet)();
    let buttonState;
    if (disconnecting) {
        buttonState = 'disconnecting';
    }
    else if (wallet) {
        buttonState = 'has-wallet';
    }
    else {
        buttonState = 'no-wallet';
    }
    const handleDisconnectButtonClick = (0, react_1.useCallback)(() => {
        disconnect().catch(() => {
            // Silently catch because any errors are caught by the context `onError` handler
        });
    }, [disconnect]);
    return {
        buttonDisabled: buttonState !== 'has-wallet',
        buttonState,
        onButtonClick: buttonState === 'has-wallet' ? handleDisconnectButtonClick : undefined,
        walletIcon: wallet === null || wallet === void 0 ? void 0 : wallet.adapter.icon,
        walletName: wallet === null || wallet === void 0 ? void 0 : wallet.adapter.name,
    };
}
exports.useWalletDisconnectButton = useWalletDisconnectButton;
//# sourceMappingURL=useWalletDisconnectButton.js.map