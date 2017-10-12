import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import * as express from "express";
import { join } from "path";
import * as ServeIndex from "serve-index";
import LibraryList from "../components/lib/LibraryList";
import ExternalRequestor from "../components/tools/ExternalRequestor";
import FileReader from "../components/tools/FileReader";
import LibraryController from "../controllers/LibraryController";
import JavascriptResponse from "../middlewares/JavascriptResponse";
import RemapStaticFile from "../middlewares/RemapStaticFile";
import IStaticFileRemap from "../middlewares/Schema/IStaticFileRemap";
@Module({
    components: [FileReader, LibraryList, ExternalRequestor],
    controllers: [LibraryController],
})
export class LibModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
        consumer.apply(RemapStaticFile).with([{
            virtualPath: "/public/version-control.js",
            actualPath: join(__dirname, "../../dist/bundle.js"),
        },
        {
            virtualPath: "/public/version-control.js.map",
            actualPath: join(__dirname, "../../dist/bundle.js.map"),
        }] as IStaticFileRemap[]).forRoutes({
            path: "/public/version-control.js*", method: RequestMethod.GET,
        });
        consumer.apply([express.static(join(__dirname, "/../..")), ServeIndex(join(__dirname, "/../.."))]).forRoutes({
            path: "/public/**", method: RequestMethod.ALL,
        });
        consumer.apply([JavascriptResponse]).forRoutes({
            path: "/lib/*.js",
            method: RequestMethod.GET,
        });
    }

}
