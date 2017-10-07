import { connect } from "react-redux";
import VersionControlComponent from "../components/VersionControlComponent";
import IAppState from "./Schema/IAppState";
import IVersionControlComponentReduxState from "./Schema/IVersionControlComponentReduxState";

function mapStateToProps(state: IAppState): IVersionControlComponentReduxState {
    return state.versionControl;
}

export default connect(mapStateToProps)(VersionControlComponent);
