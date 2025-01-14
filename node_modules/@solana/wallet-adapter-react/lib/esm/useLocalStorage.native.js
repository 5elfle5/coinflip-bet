import { useState } from 'react';
export const useLocalStorage = function useLocalStorage(_key, defaultState) {
    /**
     * Until such time as we have a strategy for implementing wallet
     * memorization on React Native, simply punt and return a no-op.
     */
    return useState(defaultState);
};
//# sourceMappingURL=useLocalStorage.native.js.map