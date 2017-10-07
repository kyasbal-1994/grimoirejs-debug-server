import { Component } from "@nestjs/common";
import { readFile, stat, writeFile } from "fs";

/**
 * An component to read files in server
 */
@Component()
export default class FileReader {

    /**
     * Read file from specified path
     * @param path
     */
    public async read(path: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            readFile(path, "utf-8", (error, content) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(content);
                }
            });
        });
    }

    /**
     * Read JSON file from specified path
     * @param path
     */
    public async readJSON<T = { [key: string]: any }>(path: string): Promise<T> {
        const inStr = await this.read(path);
        return JSON.parse(inStr) as T;
    }

    public async exists(path: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            stat(path, (err) => {
                resolve(err === void 0);
            });
        });
    }

    public async write(path: string, content: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            writeFile(path, content, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}
