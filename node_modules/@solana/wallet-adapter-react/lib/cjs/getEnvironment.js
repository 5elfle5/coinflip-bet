"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const wallet_adapter_mobile_1 = require("@solana-mobile/wallet-adapter-mobile");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
var Environment;
(function (Environment) {
    Environment[Environment["DESKTOP_WEB"] = 0] = "DESKTOP_WEB";
    Environment[Environment["MOBILE_WEB"] = 1] = "MOBILE_WEB";
})(Environment = exports.Environment || (exports.Environment = {}));
function isWebView(userAgentString) {
    return /(WebView|Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+))/i.test(userAgentString);
}
function getEnvironment({ adapters, userAgentString }) {
    if (adapters.some((adapter) => adapter.name !== wallet_adapter_mobile_1.SolanaMobileWalletAdapterWalletName &&
        adapter.readyState === wallet_adapter_base_1.WalletReadyState.Installed)) {
        /**
         * There are only two ways a browser extension adapter should be able to reach `Installed` status:
         *
         *     1. Its browser extension is installed.
         *     2. The app is running on a mobile wallet's in-app browser.
         *
         * In either case, we consider the environment to be desktop-like.
         */
        return Environment.DESKTOP_WEB;
    }
    if (userAgentString &&
        // Step 1: Check whether we're on a platform that supports MWA at all.
        /android/i.test(userAgentString) &&
        // Step 2: Determine that we are *not* running in a WebView.
        !isWebView(userAgentString)) {
        return Environment.MOBILE_WEB;
    }
    else {
        return Environment.DESKTOP_WEB;
    }
}
exports.default = getEnvironment;
//# sourceMappingURL=getEnvironment.js.map