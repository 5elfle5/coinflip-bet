"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
const react_1 = require("react");
const useLocalStorage = function useLocalStorage(_key, defaultState) {
    /**
     * Until such time as we have a strategy for implementing wallet
     * memorization on React Native, simply punt and return a no-op.
     */
    return (0, react_1.useState)(defaultState);
};
exports.useLocalStorage = useLocalStorage;
//# sourceMappingURL=useLocalStorage.native.js.map