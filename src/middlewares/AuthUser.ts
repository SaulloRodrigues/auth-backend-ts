import { Response ,NextFunction } from "express";
import { ICustomRequest } from "../interface/CustomRequest";
import { JwtPayload } from "jsonwebtoken";

export const authUser = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;

    if (!user || !user?.id) {
        return res.status(401).json({ message: "Usuário não encontrado." });
    }
    
    next();
}