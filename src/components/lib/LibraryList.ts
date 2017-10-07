import { Component } from "@nestjs/common";
import ILibraryJSON from "../../schema/ILibraryJSON";
import INPMPackageInfo from "../../schema/INPMPackageInfo";
import ExternalRequestor from "../tools/ExternalRequestor";
import FileReader from "../tools/FileReader";
/**
 * Provides library fetching features, version listing
 */
@Component()
export default class LibraryList {

    private _libraryJson: Promise<ILibraryJSON> = this.fr.readJSON<ILibraryJSON>("./src/library.json");

    private _libraries: Promise<string[]>;

    private _versions: { [key: string]: Promise<string[]> } = {};

    private _selectedVersions: { [key: string]: string } = {};

    private _cachedFiles: { [key: string]: Promise<string> } = {};

    constructor(private readonly fr: FileReader, private readonly er: ExternalRequestor) {

    }

    /**
     * Obtain list of target libraries in json file
     */
    public get libraries(): Promise<string[]> {
        if (!this._libraries) {
            this._libraries = this._libraryJson.then(t => t.libraries);
        }
        return this._libraries;
    }

    /**
     * Get library versions
     * @param libName
     */
    public async getVersions(libName: string): Promise<string[]> {
        if (!this._versions[libName]) {
            this._versions[libName] = this.er.get<INPMPackageInfo>(`http://registry.npmjs.org/${libName}`)
                .then((a) => {
                    const candidates = Object.keys(a.versions);
                    candidates.push("LOCAL");
                    return candidates.reverse();
                });
            this._selectedVersions[libName] = "LOCAL";
        }
        return this._versions[libName];
    }

    /**
     * Get target file
     * @param libName
     * @param fileName
     */
    public async getTargetFile(libName: string, fileName: string): Promise<string> {
        if (!this._selectedVersions[libName]) {
            this._selectedVersions[libName] = "LOCAL";
        }
        if (this._selectedVersions[libName] === "LOCAL") {
            return this._libraryJson.then(j => j.localFiles[libName]).then(libPath => this.fr.read(`${libPath}/register/${fileName}`));
        }
        const requestHash = `${libName}-${fileName}-${this.getTargetVersion(libName)}`;
        let needWrite = true;
        if (!this._cachedFiles[requestHash]) {
            if (await this.fr.exists(`.lib/${requestHash}.cache`)) {
                needWrite = false;
                this._cachedFiles[requestHash] = this.fr.read(`.lib/${requestHash}.cache`);
            } else {
                this._cachedFiles[requestHash] = this.er.get(`http://unpkg.com/${libName}@${this._selectedVersions[libName]}/register/${fileName}`);
            }
        }
        if (needWrite) {
            this._cachedFiles[requestHash].then(str => {
                return this.fr.write(`.lib/${requestHash}.cache`, str);
            });
        }
        return this._cachedFiles[requestHash];
    }

    /**
     * Change version of source
     * @param libName
     * @param versionName
     */
    public setTargetVersion(libName: string, versionName: string): void {
        this._selectedVersions[libName] = versionName;
        this._cachedFiles = {};
    }

    /**
     * Obtain a version of specified library
     * @param libName
     */
    public getTargetVersion(libName: string): string {
        if (!this._selectedVersions[libName]) {
            this._selectedVersions[libName] = "LOCAL";
        }
        return this._selectedVersions[libName];
    }
}
