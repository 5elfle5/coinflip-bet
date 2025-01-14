import React, { useState } from 'react';
import { WalletModalContext } from './useWalletModal.js';
import { WalletModal } from './WalletModal.js';
export const WalletModalProvider = ({ children, ...props }) => {
    const [visible, setVisible] = useState(false);
    return (React.createElement(WalletModalContext.Provider, { value: {
            visible,
            setVisible,
        } },
        children,
        visible && React.createElement(WalletModal, { ...props })));
};
//# sourceMappingURL=WalletModalProvider.js.map