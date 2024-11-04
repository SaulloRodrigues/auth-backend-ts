import jwt from "jsonwebtoken";
import { IRoutes } from "../interface/Routes.js"
import { User } from "../models/UserModel.js";
const now = new Date();

const Register: IRoutes = {
    method: "post",
    path: "/register",
    async handler(req, res, next) {
        const { email, name, password } = req.body;

        const id = crypto.randomUUID();
        const token = jwt.sign({ id }, process.env.APP_SECRET as string, { expiresIn: '6h' })

        try {
            const newUser = new User({
                _id: id,
                email: email,
                password: password,
                data: {
                    name: name,
                    created_at: now.toISOString(),
                },
                token: token
            })

            await newUser.save();

            res.status(201).json({message: "Usuário criado com sucesso."})
        } catch (error) {
            res.status(500).json({message: "Não foi possivel criar o usuário no momento. Tente novamente mais tarde!"})
        }
    },
}



export default Register;