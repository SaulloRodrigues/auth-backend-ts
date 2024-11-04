import jwt from "jsonwebtoken";
import { IRoutes } from "../interface/Routes.js"
import { User } from "../models/UserModel.js";
const now = new Date();

const Register: IRoutes = {
    method: "post",
    path: "/register",
    async handler(req, res, next) {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(403).json({ message: "A requisição está faltando alguns parâmetros." })
        }

        try {

            if (await User.findOne({ email })) {
                return res.status(403).json({ message: "Usuário já existente, tente com outros dados." });
            }

            const newUser = new User({
                _id: crypto.randomUUID(),
                email: email,
                password: password,
                data: {
                    name: name,
                    created_at: now.toISOString(),
                },
            })

            await newUser.save();

            res.status(201).json({ message: "Usuário criado com sucesso." })
        } catch (error) {
            res.status(500).json({ message: "Não foi possivel criar o usuário no momento. Tente novamente mais tarde!" })
        }
    },
}



export default Register;