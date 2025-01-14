/// <reference types="react" />
import { type Connection } from '@solana/web3.js';
export interface ConnectionContextState {
    connection: Connection;
}
export declare const ConnectionContext: import("react").Context<ConnectionContextState>;
export declare function useConnection(): ConnectionContextState;
//# sourceMappingURL=useConnection.d.ts.map