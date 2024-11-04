import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ICustomRequest } from "../interface/CustomRequest.js";
import { User } from "../models/UserModel.js";


export const authMiddleware = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' })
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET as string);

        if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {

            const userId = decoded.id;

            req.user = await User.findOne({ _id: userId });

            if (!req.user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return next();
        }
        
        return res.status(403).json({ message: "Token não é válido." });
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido ou expirado' });
    }

}
