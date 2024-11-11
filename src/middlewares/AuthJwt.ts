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
        // Verifica o token com a chave secreta
        const decoded = jwt.verify(token, process.env.APP_SECRET as string) as JwtPayload;

        // Coloca o payload decodificado na requisição para ser usado nas próximas etapas
        req.user = decoded;

        // Passa para o próximo middleware ou controlador
        next();
    } catch (error) {
        // Se ocorrer um erro ao verificar o token (expirado ou inválido)
        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};
