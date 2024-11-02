import { JwtPayload } from "jsonwebtoken";
import { Routes } from "../interface/Routes.js"
import { authMiddleware } from "../middlewares/AuthUser.js";

const Home: Routes = {
    method: "post",
    path: "/",
    middlewares: [authMiddleware],
    handler(req, res, next) {
        const user = req.user as JwtPayload;
        if (user) {
            return res.json({message: `Olá, ${user.name} seja bem vindo. Voce está acessando uma rota segura!`, user})
        }
        res.json({message: "Úsuario inexistente."})
    },
}

export default Home;
