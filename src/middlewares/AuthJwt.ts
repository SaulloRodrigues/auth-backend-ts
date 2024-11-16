import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ICustomRequest } from "../interface/CustomRequest.js";

export const authJWT = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    // Tenta obter o token do cookie 'user-data', onde o token pode ser armazenado
    const token = req.cookies['user-data'] || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET as string) as JwtPayload;

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};
