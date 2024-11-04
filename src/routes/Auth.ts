import jwt from "jsonwebtoken";
import { IRoutes } from "../interface/Routes.js"
import { User } from "../models/UserModel.js";

const Auth: IRoutes = {
    method: "post",
    path: "/auth",
    async handler(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Você deixou de fornecer algumas das credenciais." })
        }

        try {
            const user = await User.findOne({ email });
            const wrongCredentials = { message: "As credenciais fornecidas são inválidas." }

            if (!user) {
                return res.status(404).json(wrongCredentials);
            }

            if (password != user.password) {
                return res.status(403).json(wrongCredentials)
            }
            const id = user._id;
            const token = jwt.sign({ id }, process.env.APP_SECRET as string, { expiresIn: '6h' });
            user.token = token;
            await user.save();
            console.log(user)
            res.status(200).json({ message: "Usuário autenticado com sucesso" });
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: "Erro ao autenticar o usuário." })
        }

    },
}

export default Auth;