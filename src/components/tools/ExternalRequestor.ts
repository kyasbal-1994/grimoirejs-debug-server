import { Component } from "@nestjs/common";
import Axios from "axios";

/**
 * An component to request externally
 */
@Component()
export default class ExternalRequestor {

    /**
     * Read file from specified path
     * @param path
     */
    public async get<T = { [key: string]: any }>(path: string): Promise<T> {
        console.log(`[GET] ${path}`);
        return new Promise<T>((resolve, reject) => {
            Axios.get(path).then(t => resolve(t.data), reject);
        });
    }
}
