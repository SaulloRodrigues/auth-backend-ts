import jwt from "jsonwebtoken";
import { Routes } from "../interface/Routes.js"
import { authMiddleware } from "../middlewares/AuthUser.js";

const Auth: Routes = {
    method: "post",
    path: "/auth",
    handler(req, res, next) {
        const payload = {
            id: crypto.randomUUID(), // ID do usuário
            email: "saullorodriguesfelipe015@gmail.com",
            name: "Saullo Rodrigues",  // Nome do usuário
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expiração em 1 dia
        };

        const token = jwt.sign(payload, process.env.APP_SECRET as string);

        res.json({ token: token })
    },
}



export default Auth;