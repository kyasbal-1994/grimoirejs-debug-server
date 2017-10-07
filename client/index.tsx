import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import ILibraryListResult from "../src/controllers/Schema/ILibraryListResult";
import VisibilityToggler from "./components/VisibilityToggler";
import reducer from "./redux/reducer/MainReducer";
import IAppState from "./redux/Schema/IAppState";
import store from "./redux/Store";
import VersionControlComponent from "./redux/VersionControlComponentContainer";
class ControlPanelRoot extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <div>
                    <VisibilityToggler />
                    <VersionControlComponent />
                </div>
            </Provider>
        );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("HE");
    const body = document.body;
    const div = document.createElement("div");
    div.id = "grimoire-version-debugger";
    body.insertBefore(div, body.firstChild);
    ReactDOM.render(<ControlPanelRoot />, div);
});

async function initializeStore() {
    const response = await (await fetch("/lib")).json() as ILibraryListResult;
    store.dispatch({ type: "APPLY_VERSIONS_INFO", entries: response.entries });
}

initializeStore();
