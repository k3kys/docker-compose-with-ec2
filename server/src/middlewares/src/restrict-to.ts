import { BadRequestError } from './../../errors/';
import { Request, Response, NextFunction, RequestHandler } from "express"

export const restrictTo = (...roles: Array<string>): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.currentUser!.role)) {
            throw new BadRequestError("You do not have permission to perform this action")
        }
        next();
    };
};