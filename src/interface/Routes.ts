import { Response, Request, NextFunction } from "express"
import { HTTPMethods } from "../types/HttpMethods.js";
import { ICustomRequest } from "./CustomRequest.js";

export interface IRoutes {
    method: HTTPMethods;
    path: string;
    handler: (req: ICustomRequest , res: Response, next: NextFunction) => void;
    middlewares?: [(req: ICustomRequest, res: Response, next: NextFunction) => void];
}