import { Controller, Get, Head, Headers, Param, Post, Res, Response } from "@nestjs/common";

import LibraryList from "../components/lib/LibraryList";
import ILIbraryListResult from "./Schema/ILibraryListResult";
@Controller("lib")
export default class LibraryController {

    constructor(private readonly libraryList: LibraryList) {

    }
    @Get()
    public async listAll(): Promise<ILIbraryListResult> {
        const libraries = await this.libraryList.libraries;
        const result = { entries: [] } as ILIbraryListResult;
        for (const key of libraries) {
            result.entries.push({
                libraryName: key, current: this.libraryList.getTargetVersion(key),
                versions: await this.libraryList.getVersions(key),
            });
        }
        return result;
    }

    @Get(":library")
    public async getSpecific( @Param("library") library: string): Promise<string[]> {
        return this.libraryList.getVersions(library);
    }

    @Get(":library/:filePath")
    public async getFile( @Param("library") library: string, @Param("filePath") path: string): Promise<string> {
        return this.libraryList.getTargetFile(library, path);
    }

    @Post(":library/:version")
    public async setFileVersion( @Param("library") library: string, @Param("version") version: string): Promise<string> {
        this.libraryList.setTargetVersion(library, version);
        return "SUCCESS";
    }
}
