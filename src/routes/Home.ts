import { JwtPayload } from "jsonwebtoken";
import { IRoutes } from "../interface/Routes.js"
import { authJWT } from "../middlewares/AuthJwt.js";
import { User } from "../models/UserModel.js";
import { authUser } from "../middlewares/AuthUser.js";
import { IUser } from "../interface/User.js";

const Home: IRoutes = {
    method: "post",
    path: "/",
    middlewares: [authJWT, authUser],
    async handler(req, res, next) {
        const payload = req.user as JwtPayload;

        try {
            const user = await User.findOne({ _id: payload.id }) as IUser;
            res.status(200).json({ message: `Olá, ${user.data.name}. Você está acessando uma rota segura!` })
        } catch (error) {
            res.status(500).json({ message: "Ocorreu um erro." })
        }
    },
}

export default Home;
