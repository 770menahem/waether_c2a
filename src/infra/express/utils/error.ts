import * as express from 'express';

export class ServiceError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export class NotFound extends ServiceError {
    constructor(message: string) {
        super(404, message);
    }
}

export class DbFail extends ServiceError {
    constructor(message: string) {
        super(500, message);
    }
}

export class WeatherNotFound extends ServiceError {
    constructor(message: string) {
        super(404, message);
    }
}

/**
 * Error middleware, handles the error by the status code.
 * @param { Error } error - The error
 * @param { express.Request } _req - The request object.
 * @param { express.Response } res - The result object
 * @param { express.NextFunction } _next - The next function
 */
export const errorMiddleware = (error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error.name === 'ValidationError') {
        res.status(400).send({
            type: error.name,
            message: error.message,
        });
    } else if (error instanceof ServiceError) {
        res.status(error.code).send({
            type: error.name,
            message: error.message,
        });
    } else if (error.name === 'MongoServerError') {
        res.status(400).send({
            type: error.name,
            message: 'your data is not valid maybe you have a duplicate data',
            errorMessage: error.message,
        });
    } else {
        res.status(500).send({
            type: error.name,
            message: error.message,
        });
    }
};
