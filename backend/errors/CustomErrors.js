class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message, 401);
    }
}

export { CustomError, NotFoundError, UnauthorizedError };