import { Request, Response, NextFunction } from 'express';
/*
export function errorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    console.log("alksjdaslkfj")
    next(err)
}
*/
export default class ErrorHandler {
    public static handle(_req: Request, res: Response, next: NextFunction) {
        //console.error(err.stack);
        console.log("alksjdaslkfj")
        next("err")
    }
}