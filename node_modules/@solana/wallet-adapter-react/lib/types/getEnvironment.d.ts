import { type Adapter } from '@solana/wallet-adapter-base';
export declare enum Environment {
    DESKTOP_WEB = 0,
    MOBILE_WEB = 1
}
declare type Config = Readonly<{
    adapters: Adapter[];
    userAgentString: string | null;
}>;
export default function getEnvironment({ adapters, userAgentString }: Config): Environment;
export {};
//# sourceMappingURL=getEnvironment.d.ts.map