import IAppState from "../Schema/IAppState";
const initialState: IAppState = {
    versionControl: {
        selectors: [],
        hasLoaded: false,
        visibility: false,
    },
};

export default initialState;
