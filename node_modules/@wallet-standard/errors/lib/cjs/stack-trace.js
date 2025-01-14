"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeCaptureStackTrace = void 0;
function safeCaptureStackTrace(...args) {
    if ('captureStackTrace' in Error && typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(...args);
    }
}
exports.safeCaptureStackTrace = safeCaptureStackTrace;
//# sourceMappingURL=stack-trace.js.map