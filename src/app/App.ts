import express from 'express';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path'
import { HTTPMethods } from '../types/HttpMethods.js';
import { pathToFileURL } from 'node:url'
import connectDB from '../services/db.js';

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

    private async initDataBase():Promise<void> {
        await connectDB();
    }

    private async readRoutes(): Promise<void> {
        const rPath = path.join(import.meta.dirname, '../routes');
        const rFiles = fs.readdirSync(rPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

        for (const file of rFiles) {

            const fPath = path.join(rPath, file);
            const fURL = pathToFileURL(fPath).href;

            const { default: route } = await import(fURL);
            const method: HTTPMethods = route.method.toLowerCase() as HTTPMethods;

            try {
                if (route.middlewares && route.middlewares.length > 0) {
                    this.app[method](route.path, ...route.middlewares, route.handler);
                } else {
                    this.app[method](route.path, route.handler)
                }
            } catch (error) {
                console.error("Erro ao registrar a rota: ", error)
            }

        }
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(helmet());
    }

    public init(port: string): void {
        this.app.listen(port, () => {
            console.log(`Rodando na porta ${port}`);
        })
    }

}