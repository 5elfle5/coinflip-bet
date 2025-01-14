import React, { useCallback } from 'react';
import { Button as BaseWalletConnectionButton } from './Button.js';
import { useWalletModal } from './useWalletModal.js';
export const WalletModalButton = ({ children = 'Select Wallet', onClick, ...props }) => {
    const { visible, setVisible } = useWalletModal();
    const handleClick = useCallback((event) => {
        if (onClick)
            onClick(event);
        if (!event.defaultPrevented)
            setVisible(!visible);
    }, [onClick, setVisible, visible]);
    return (React.createElement(BaseWalletConnectionButton, { ...props, className: "wallet-adapter-button-trigger", onClick: handleClick }, children));
};
//# sourceMappingURL=WalletModalButton.js.map