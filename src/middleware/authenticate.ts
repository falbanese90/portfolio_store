import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authoricationHeader = req.headers.authorization;
        const token = authoricationHeader?.split(' ')[1];
        jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        next();
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return
    }
}
