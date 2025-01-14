"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getInferredClusterFromEndpoint(endpoint) {
    if (!endpoint) {
        return 'mainnet-beta';
    }
    if (/devnet/i.test(endpoint)) {
        return 'devnet';
    }
    else if (/testnet/i.test(endpoint)) {
        return 'testnet';
    }
    else {
        return 'mainnet-beta';
    }
}
exports.default = getInferredClusterFromEndpoint;
//# sourceMappingURL=getInferredClusterFromEndpoint.js.map