import { Response, NextFunction, json } from 'express';
import { ICustomRequest } from '../interface/CustomRequest.js';
import { IUser } from '../interface/User.js';
import { User } from '../models/UserModel.js';
import jwt, { JwtPayload } from 'jsonwebtoken';

class UserController {

    async getUser(req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
        const payload = req.user as JwtPayload;
        try {
            const user = await User.findOne({ _id: payload.id }).select("-password -email -__v -_id") as IUser;
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
                return;
            }
            console.log(user)
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: "Não foi possivel procurar o usuario." });
        }
    }

    async createUser(req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
        const { email, name, password, photo_url } = req.body;

        if (!email || !name || !password) {
            res.status(403).json({ error: "A requisição está faltando alguns parâmetros." });
            return;
        }

        try {
            const id = crypto.randomUUID();

            if (await User.findOne({ email }) || await User.findById(id)) {
                res.status(403).json({ error: "Usuário já existente, tente com outros dados." });
                return;
            }

            const newUser = new User({
                _id: id,
                email: email,
                password: password,
                name: name,
                created_at: Date.now(),
                photo_url: photo_url || null
            })

            await newUser.save();

            res.status(201).json({ message: "Usuário criado com sucesso." })
        } catch (error) {
            res.status(500).json({ error: "Não foi possivel criar o usuário no momento. Tente novamente mais tarde!" })
        }
    }

    async deleteUser(req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
        const payload = req.user as JwtPayload;
        try {
            const user = await User.findByIdAndDelete(payload.id) as IUser;
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
                return;
            }
            res.status(200).json({ message: "Usuário deletado com sucesso." });
        } catch (error) {
            res.status(500).json({ error: "Não foi possivel procurar o usuario." });
        }
    }

    async signInUser(req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Você deixou de fornecer algumas das credenciais." })
            return;
        }

        try {
            const user = await User.findOne({ email });

            if (!user) {
                res.status(401).json({ error: "Usuário não encontrado." });
                return
            }

            if (user.password != password) {
                res.status(401).json({ error: "Credencias inválidas." });
                return
            }

            const token = jwt.sign({ id: user._id }, process.env.APP_SECRET as string, { expiresIn: '6h' });

            const isProductionMode: boolean = process.env.NODE_MODE === 'production';

            res.cookie('user-data', token, {
                sameSite: 'strict',
                httpOnly: true,
                secure: isProductionMode,
                maxAge: 6 * 3600000          // Tempo de expiração do cookie (6 horas)
            });

            res.status(200).json({ message: "Usuário autorizado com sucesso." });
        } catch (error) {
            res.status(500).json({ error: "Não foi possivel autenticar o usuário." });
        }
    }

    async signOutUser(req: ICustomRequest, res: Response, next: NextFunction): Promise<boolean | unknown> {
        const payload = req.user as JwtPayload;
        try {
            const user = User.findById(payload.id);
            if (!user) {
                return res.status(401).json({error: "Usuário com credenciais inexistentes."})
            }
            res.cookie('user-data', '', { expires: new Date(0), httpOnly: true });
            res.status(200).json({message: "Usuário deslogado com sucesso."})
        } catch (error) {
            res.status(500).json({message: "Aconteceu um erro ao deslogar o usuário."})
        }
    }

    async updateUser(req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {
        const payload = req.user as JwtPayload;

        if (!req.body) {
            res.status(403).json({ error: "Você deixou de fornecer as credenciais" });
            return;
        }

        try {

            const user = await User.findById(payload.id) as IUser;
            if (!user) {
                res.status(404).json({ error: "Usuário não encontrado." });
                return;
            }


            const fieldsToUpdate: Record<string, any> = {};

            for (const [key, value] of Object.entries(req.body)) {
                if (value !== undefined) {
                    fieldsToUpdate[key as keyof IUser] = value;
                }
            }

            await user.updateOne({ $set: fieldsToUpdate });

            res.status(200).json({ message: "Usuário atualizado com sucesso." });
        } catch (error) {
            res.status(500).json({ error: "Não foi possivel atualizar os dados do usuario." });
        }
    }

}

export default new UserController;