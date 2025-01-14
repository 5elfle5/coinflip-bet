'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactNative = require('react-native');
var walletStandardUtil = require('@solana/wallet-standard-util');
var jsBase64 = require('js-base64');

// Typescript `enums` thwart tree-shaking. See https://bargsten.org/jsts/enums/
const SolanaMobileWalletAdapterErrorCode = {
    ERROR_ASSOCIATION_PORT_OUT_OF_RANGE: 'ERROR_ASSOCIATION_PORT_OUT_OF_RANGE',
    ERROR_REFLECTOR_ID_OUT_OF_RANGE: 'ERROR_REFLECTOR_ID_OUT_OF_RANGE',
    ERROR_FORBIDDEN_WALLET_BASE_URL: 'ERROR_FORBIDDEN_WALLET_BASE_URL',
    ERROR_SECURE_CONTEXT_REQUIRED: 'ERROR_SECURE_CONTEXT_REQUIRED',
    ERROR_SESSION_CLOSED: 'ERROR_SESSION_CLOSED',
    ERROR_SESSION_TIMEOUT: 'ERROR_SESSION_TIMEOUT',
    ERROR_WALLET_NOT_FOUND: 'ERROR_WALLET_NOT_FOUND',
    ERROR_INVALID_PROTOCOL_VERSION: 'ERROR_INVALID_PROTOCOL_VERSION',
};
class SolanaMobileWalletAdapterError extends Error {
    constructor(...args) {
        const [code, message, data] = args;
        super(message);
        this.code = code;
        this.data = data;
        this.name = 'SolanaMobileWalletAdapterError';
    }
}
// Typescript `enums` thwart tree-shaking. See https://bargsten.org/jsts/enums/
const SolanaMobileWalletAdapterProtocolErrorCode = {
    // Keep these in sync with `mobilewalletadapter/common/ProtocolContract.java`.
    ERROR_AUTHORIZATION_FAILED: -1,
    ERROR_INVALID_PAYLOADS: -2,
    ERROR_NOT_SIGNED: -3,
    ERROR_NOT_SUBMITTED: -4,
    ERROR_TOO_MANY_PAYLOADS: -5,
    ERROR_ATTEST_ORIGIN_ANDROID: -100,
};
class SolanaMobileWalletAdapterProtocolError extends Error {
    constructor(...args) {
        const [jsonRpcMessageId, code, message, data] = args;
        super(message);
        this.code = code;
        this.data = data;
        this.jsonRpcMessageId = jsonRpcMessageId;
        this.name = 'SolanaMobileWalletAdapterProtocolError';
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function createSIWSMessage(payload) {
    return walletStandardUtil.createSignInMessageText(payload);
}
function createSIWSMessageBase64(payload) {
    return jsBase64.encode(createSIWSMessage(payload));
}

// optional features
const SolanaSignTransactions = 'solana:signTransactions';
const SolanaCloneAuthorization = 'solana:cloneAuthorization';
const SolanaSignInWithSolana = 'solana:signInWithSolana';

/**
 * Creates a {@link MobileWallet} proxy that handles backwards compatibility and API to RPC conversion.
 *
 * @param protocolVersion the protocol version in use for this session/request
 * @param protocolRequestHandler callback function that handles sending the RPC request to the wallet endpoint.
 * @returns a {@link MobileWallet} proxy
 */
function createMobileWalletProxy(protocolVersion, protocolRequestHandler) {
    return new Proxy({}, {
        get(target, p) {
            if (target[p] == null) {
                target[p] = function (inputParams) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const { method, params } = handleMobileWalletRequest(p, inputParams, protocolVersion);
                        const result = yield protocolRequestHandler(method, params);
                        // if the request tried to sign in but the wallet did not return a sign in result, fallback on message signing
                        if (method === 'authorize' && params.sign_in_payload && !result.sign_in_result) {
                            result['sign_in_result'] = yield signInFallback(params.sign_in_payload, result, protocolRequestHandler);
                        }
                        return handleMobileWalletResponse(p, result, protocolVersion);
                    });
                };
            }
            return target[p];
        },
        defineProperty() {
            return false;
        },
        deleteProperty() {
            return false;
        },
    });
}
/**
 * Handles all {@link MobileWallet} API requests and determines the correct MWA RPC method and params to call.
 * This handles backwards compatibility, based on the provided @protocolVersion.
 *
 * @param methodName the name of {@link MobileWallet} method that was called
 * @param methodParams the parameters that were passed to the method
 * @param protocolVersion the protocol version in use for this session/request
 * @returns the RPC request method and params that should be sent to the wallet endpoint
 */
function handleMobileWalletRequest(methodName, methodParams, protocolVersion) {
    let params = methodParams;
    let method = methodName
        .toString()
        .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        .toLowerCase();
    switch (methodName) {
        case 'authorize': {
            let { chain } = params;
            if (protocolVersion === 'legacy') {
                switch (chain) {
                    case 'solana:testnet': {
                        chain = 'testnet';
                        break;
                    }
                    case 'solana:devnet': {
                        chain = 'devnet';
                        break;
                    }
                    case 'solana:mainnet': {
                        chain = 'mainnet-beta';
                        break;
                    }
                    default: {
                        chain = params.cluster;
                    }
                }
                params.cluster = chain;
            }
            else {
                switch (chain) {
                    case 'testnet':
                    case 'devnet': {
                        chain = `solana:${chain}`;
                        break;
                    }
                    case 'mainnet-beta': {
                        chain = 'solana:mainnet';
                        break;
                    }
                }
                params.chain = chain;
            }
        }
        case 'reauthorize': {
            const { auth_token, identity } = params;
            if (auth_token) {
                switch (protocolVersion) {
                    case 'legacy': {
                        method = 'reauthorize';
                        params = { auth_token: auth_token, identity: identity };
                        break;
                    }
                    default: {
                        method = 'authorize';
                        break;
                    }
                }
            }
            break;
        }
    }
    return { method, params };
}
/**
 * Handles all {@link MobileWallet} API responses and modifies the response for backwards compatibility, if needed
 *
 * @param method the {@link MobileWallet} method that was called
 * @param response the original response that was returned by the method call
 * @param protocolVersion the protocol version in use for this session/request
 * @returns the possibly modified response
 */
function handleMobileWalletResponse(method, response, protocolVersion) {
    switch (method) {
        case 'getCapabilities': {
            const capabilities = response;
            switch (protocolVersion) {
                case 'legacy': {
                    const features = [SolanaSignTransactions];
                    if (capabilities.supports_clone_authorization === true) {
                        features.push(SolanaCloneAuthorization);
                    }
                    return Object.assign(Object.assign({}, capabilities), { features: features });
                }
                case 'v1': {
                    return Object.assign(Object.assign({}, capabilities), { supports_sign_and_send_transactions: true, supports_clone_authorization: capabilities.features.includes(SolanaCloneAuthorization) });
                }
            }
        }
    }
    return response;
}
function signInFallback(signInPayload, authorizationResult, protocolRequestHandler) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const domain = (_a = signInPayload.domain) !== null && _a !== void 0 ? _a : window.location.host;
        const address = authorizationResult.accounts[0].address;
        const siwsMessage = createSIWSMessageBase64(Object.assign(Object.assign({}, signInPayload), { domain, address }));
        const signMessageResult = yield protocolRequestHandler('sign_messages', {
            addresses: [address],
            payloads: [siwsMessage]
        });
        const signInResult = {
            address: address,
            signed_message: siwsMessage,
            signature: signMessageResult.signed_payloads[0].slice(siwsMessage.length)
        };
        return signInResult;
    });
}

const LINKING_ERROR = `The package 'solana-mobile-wallet-adapter-protocol' doesn't seem to be linked. Make sure: \n\n` +
    '- You rebuilt the app after installing the package\n' +
    '- If you are using Lerna workspaces\n' +
    '  - You have added `@solana-mobile/mobile-wallet-adapter-protocol` as an explicit dependency, and\n' +
    '  - You have added `@solana-mobile/mobile-wallet-adapter-protocol` to the `nohoist` section of your package.json\n' +
    '- You are not using Expo managed workflow\n';
const SolanaMobileWalletAdapter = reactNative.Platform.OS === 'android' && reactNative.NativeModules.SolanaMobileWalletAdapter
    ? reactNative.NativeModules.SolanaMobileWalletAdapter
    : new Proxy({}, {
        get() {
            throw new Error(reactNative.Platform.OS !== 'android'
                ? 'The package `solana-mobile-wallet-adapter-protocol` is only compatible with React Native Android'
                : LINKING_ERROR);
        },
    });
function getErrorMessage(e) {
    switch (e.code) {
        case 'ERROR_WALLET_NOT_FOUND':
            return 'Found no installed wallet that supports the mobile wallet protocol.';
        default:
            return e.message;
    }
}
function handleError(e) {
    if (e instanceof Error) {
        const reactNativeError = e;
        switch (reactNativeError.code) {
            case undefined:
                throw e;
            case 'JSON_RPC_ERROR': {
                const details = reactNativeError.userInfo;
                throw new SolanaMobileWalletAdapterProtocolError(0 /* jsonRpcMessageId */, details.jsonRpcErrorCode, e.message);
            }
            default:
                throw new SolanaMobileWalletAdapterError(reactNativeError.code, getErrorMessage(reactNativeError), reactNativeError.userInfo);
        }
    }
    throw e;
}
function transact(callback, config) {
    return __awaiter(this, void 0, void 0, function* () {
        let didSuccessfullyConnect = false;
        try {
            const sessionProperties = yield SolanaMobileWalletAdapter.startSession(config);
            didSuccessfullyConnect = true;
            const wallet = createMobileWalletProxy(sessionProperties.protocol_version, (method, params) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return SolanaMobileWalletAdapter.invoke(method, params);
                }
                catch (e) {
                    return handleError(e);
                }
            }));
            return yield callback(wallet);
        }
        catch (e) {
            return handleError(e);
        }
        finally {
            if (didSuccessfullyConnect) {
                yield SolanaMobileWalletAdapter.endSession();
            }
        }
    });
}

exports.SolanaCloneAuthorization = SolanaCloneAuthorization;
exports.SolanaMobileWalletAdapterError = SolanaMobileWalletAdapterError;
exports.SolanaMobileWalletAdapterErrorCode = SolanaMobileWalletAdapterErrorCode;
exports.SolanaMobileWalletAdapterProtocolError = SolanaMobileWalletAdapterProtocolError;
exports.SolanaMobileWalletAdapterProtocolErrorCode = SolanaMobileWalletAdapterProtocolErrorCode;
exports.SolanaSignInWithSolana = SolanaSignInWithSolana;
exports.SolanaSignTransactions = SolanaSignTransactions;
exports.transact = transact;
