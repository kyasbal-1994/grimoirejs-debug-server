import { ExpressMiddleware, Middleware, NestMiddleware } from "@nestjs/common";
import * as express from "express";
import FileReader from "../components/tools/FileReader";
import IStaticFileRemap from "./Schema/IStaticFileRemap";

@Middleware()
export default class StaticFileHost implements NestMiddleware {

    constructor(private readonly fileReader: FileReader) {

    }
    public resolve(remapConfigs: IStaticFileRemap[]): ExpressMiddleware {
        return (req: express.Request, res: express.Response, next) => {
            for (let i = 0; i < remapConfigs.length; i++) {
                const remapConfig = remapConfigs[i];
                if (req.path === remapConfig.virtualPath) {
                    console.log(`[PROXY] ${remapConfig.virtualPath} --> ${remapConfig.actualPath}`);
                    this.fileReader.read(remapConfig.actualPath).then(file => {
                        res.contentType("text/javascript");
                        res.status(200);
                        res.send(file);
                        res.end();
                        return;
                    });
                    break;
                }
            }
        };
    }
}
