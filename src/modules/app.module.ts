import { Module } from "@nestjs/common";
import { LibModule } from "./lib.module";

@Module({
    modules: [LibModule],
})
export class ApplicationModule { }
