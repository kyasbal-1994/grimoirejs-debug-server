/**
 * Scheme of library.json
 */
export default interface ILibraryJSON {
    libraries: string[];
    localFiles: {
        [name: string]: string;
    };
}
