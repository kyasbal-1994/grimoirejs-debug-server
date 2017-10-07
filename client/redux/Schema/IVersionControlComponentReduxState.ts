import IVersionSelectorReduxState from "./IVersionSelectorReduxState";

export default interface IVersionControlComponentReduxState {
    selectors: IVersionSelectorReduxState[];
    hasLoaded: boolean;
    visibility: boolean;
}
