import { Response, Request, NextFunction } from "express"
import { HTTPMethods } from "../types/HttpMethods.js";
import { CustomRequest } from "./CustomRequest.js";

export interface Routes {
    method: HTTPMethods;
    path: string;
    handler: (req: CustomRequest , res: Response, next: NextFunction) => void;
    middlewares?: [(req: CustomRequest, res: Response, next: NextFunction) => void];
}