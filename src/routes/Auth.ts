import jwt, { JwtPayload } from "jsonwebtoken";
import { IRoutes } from "../interface/Routes.js"
import { User } from "../models/UserModel.js";

const newToken = (id:string) => {
    return jwt.sign({ id }, process.env.APP_SECRET as string, { expiresIn: '6h' });
}

const Auth: IRoutes = {
    method: "post",
    path: "/auth",
    async handler(req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Você deixou de fornecer algumas das credenciais." })
        }

        try {

            const data = await User.findOne({ email });

            if (!data) {
                return res.status(401).json({error: "Usuário não encontrado."});
            }

            if (data?.password != password) {
                return res.status(403).json({error: "Credenciais inválidas, usuário não autorizado."})
            }

            const token = newToken(data._id as string);
            
            const decoded = jwt.verify(token, process.env.APP_SECRET as string) as JwtPayload;
            
            req.user = decoded;

            res.status(200).json({ error: "Usuário autenticado com sucesso", token });
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Erro ao autenticar o usuário." })
        }

    },
}

export default Auth;