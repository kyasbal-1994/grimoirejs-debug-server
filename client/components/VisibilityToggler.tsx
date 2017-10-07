import * as React from "react";
import store from "../redux/Store";
import styl from "./VisibilityToggler.styl";
export default class VisibilityToggler extends React.Component<any, any> {
    public render() {
        return (
            <div className={styl.visibilityToggleContainerWrap}>
                <div className={styl.visibilityToggleContainer} onClick={this.toggleVisibility}>
                    <img src="../logo.png" />
                </div>
            </div>
        );
    }

    public toggleVisibility() {
        store.dispatch({ type: "TOGGLE_VISIBILITY" });
    }
}
