import * as React from "react";
import IVersionControlComponentReduxState from "../redux/Schema/IVersionControlComponentReduxState";
import VersionSelector from "./VersionSelector";

export default class VersionControlComponent extends React.Component<IVersionControlComponentReduxState> {
    public render() {
        let elements;
        if (this.props.visibility) {
            if (this.props.hasLoaded) {
                elements = [];
                for (let i = 0; i < this.props.selectors.length; i++) {
                    const versionSelectorState = this.props.selectors[i];
                    elements.push((<VersionSelector key={i} libraryName={versionSelectorState.libraryName} current={versionSelectorState.current} versions={versionSelectorState.versions} />));
                }
            } else {
                elements = (<p>Loading...</p>);
            }
        }
        return (
            <div>
                {elements}
            </div>
        );
    }
}
