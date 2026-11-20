"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorResult = createErrorResult;
exports.createSuccessResult = createSuccessResult;
function createErrorResult(error) {
    return {
        success: false,
        data: null,
        error,
    };
}
function createSuccessResult(data) {
    return {
        success: true,
        data,
        error: null,
    };
}
//# sourceMappingURL=Result.js.map