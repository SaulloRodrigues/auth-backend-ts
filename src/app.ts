import { App } from "./app/App.js";
import 'dotenv/config.js';

const app = new App();


app.init(process.env.APP_PORT as string)