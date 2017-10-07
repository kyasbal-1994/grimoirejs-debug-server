import { Action } from "redux";
import InitialState from "./InitialState";
export default function reducer(state = InitialState, action: Action & { [key: string]: any }) {
    switch (action.type) {
        case "APPLY_VERSIONS_INFO":
            return {
                ...state, versionControl: {
                    ...state.versionControl,
                    hasLoaded: true,
                    selectors: action["entries"],
                },
            };
        case "TOGGLE_VISIBILITY":
            return {
                ...state,
                versionControl: {
                    ...state.versionControl,
                    visibility: !state.versionControl.visibility,
                },
            };
        default:
            return state;
    }
}
