"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSafely = executeSafely;
function executeSafely(operation) {
    try {
        return operation();
    }
    catch (error) {
        return exceptionHandler(error);
    }
}
function exceptionHandler(error) {
    console.error("Unexpected application error:", error);
    return {
        statusCode: 500,
        body: {
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "An unexpected error occurred",
            },
        },
    };
}
//# sourceMappingURL=ExceptionHandler.js.map