import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../interface/CustomRequest";


export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token inválido' });
    }
    
    try {
        req.user = jwt.verify(token, process.env.APP_SECRET as string); 
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido ou expirado' });
    }

}
