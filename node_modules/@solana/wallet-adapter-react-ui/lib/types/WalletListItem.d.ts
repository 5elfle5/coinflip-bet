import type { Wallet } from '@solana/wallet-adapter-react';
import type { FC, MouseEventHandler } from 'react';
export interface WalletListItemProps {
    handleClick: MouseEventHandler<HTMLButtonElement>;
    tabIndex?: number;
    wallet: Wallet;
}
export declare const WalletListItem: FC<WalletListItemProps>;
//# sourceMappingURL=WalletListItem.d.ts.map