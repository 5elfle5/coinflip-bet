import React from 'react';
import { BaseWalletConnectButton } from './BaseWalletConnectButton.js';
const LABELS = {
    connecting: 'Connecting ...',
    connected: 'Connected',
    'has-wallet': 'Connect',
    'no-wallet': 'Connect Wallet',
};
export function WalletConnectButton(props) {
    return React.createElement(BaseWalletConnectButton, { ...props, labels: LABELS });
}
//# sourceMappingURL=WalletConnectButton.js.map