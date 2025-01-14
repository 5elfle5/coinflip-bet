import React from 'react';
import { BaseWalletDisconnectButton } from './BaseWalletDisconnectButton.js';
const LABELS = {
    disconnecting: 'Disconnecting ...',
    'has-wallet': 'Disconnect',
    'no-wallet': 'Disconnect Wallet',
};
export function WalletDisconnectButton(props) {
    return React.createElement(BaseWalletDisconnectButton, { ...props, labels: LABELS });
}
//# sourceMappingURL=WalletDisconnectButton.js.map