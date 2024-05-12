import { NextFunction, Request, Response } from "express";

export const TryCatch = (controller: (req: Request, res: Response) => void) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res)
    } catch(error) {
        next(error)
        return
    }
}