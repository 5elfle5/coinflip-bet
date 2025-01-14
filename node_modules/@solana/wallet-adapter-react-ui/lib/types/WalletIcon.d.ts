import type { Wallet } from '@solana/wallet-adapter-react';
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';
export interface WalletIconProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    wallet: {
        adapter: Pick<Wallet['adapter'], 'icon' | 'name'>;
    } | null;
}
export declare const WalletIcon: FC<WalletIconProps>;
//# sourceMappingURL=WalletIcon.d.ts.map