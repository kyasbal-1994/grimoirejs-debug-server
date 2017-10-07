import { ExpressMiddleware, Middleware, NestMiddleware } from "@nestjs/common";
import * as express from "express";
import FileReader from "../components/tools/FileReader";
import IStaticFileRemap from "./Schema/IStaticFileRemap";

@Middleware()
export default class JavascriptResponse implements NestMiddleware {

    constructor(private readonly fileReader: FileReader) {

    }
    public resolve(remapConfigs: IStaticFileRemap[]): ExpressMiddleware {
        return (req: express.Request, res: express.Response, next) => {
            res.contentType("text/javascript");
            next();
        };
    }
}
