/**
 * Schema of response of registry.npmjs.org
 */
export default interface INPMPackageInfo {
    versions: {
        [key: string]: {},
    };
    "dist-tags": {
        [key: string]: string,
    };
}
