import express, { IRoute } from 'express';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path'
import { HTTPMethods } from '../types/HttpMethods.js';
import { pathToFileURL } from 'node:url'
import connectDB from '../services/db.js';
import { IRoutes } from '../interface/Routes.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const isProductionMode:boolean = process.env.NODE_MODE === 'production';
const allowedOrigins = isProductionMode ? 'https://meusite.com' : 'http://localhost:3000';
const corsOptions = {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: allowedOrigins
}

export class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.middlewares();
        this.initRoutes();
        this.initDataBase();
    }

    private initRoutes(): void {
        this.readRoutes();
    }

    private async initDataBase(): Promise<void> {
        await connectDB();
    }

    private async registerRoutes(route: IRoutes | Array<IRoutes>) {
        if (Array.isArray(route)) {
            route.forEach((multiRoutes: IRoutes) => {
                this.registerSingleRoute(multiRoutes)
            })
        } else {
            this.registerSingleRoute(route)
        }
    }

    private async registerSingleRoute(route: IRoutes) {
        const middlewares = route.middlewares || [];
        const method: HTTPMethods = route.method.toLowerCase() as HTTPMethods;

        this.app[method](route.path, ...middlewares, route.handler);
    }

    private async readRoutes(): Promise<void> {
        const rPath = path.join(import.meta.dirname, '../routes');
        const rFiles = fs.readdirSync(rPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

        for (const file of rFiles) {
            try {

                const fPath = path.join(rPath, file);
                const fURL = pathToFileURL(fPath).href;

                const { default: route } = await import(fURL);

                await this.registerRoutes(route)

            } catch (error) {
                console.error("Erro ao registrar a rota: ", error)
            }

        }
    }

    private middlewares(): void {
        this.app.use(cors(corsOptions))
        this.app.use(helmet());
        this.app.use(cookieParser());
        this.app.use(express.json());
    }

    public init(port: string): void {
        this.app.listen(port, () => {
            console.log(`Rodando na porta ${port}`);
        })
    }

}