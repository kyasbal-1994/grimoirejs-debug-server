import { createStore } from "redux";
import reducer from "./reducer/MainReducer";
import IAppState from "./Schema/IAppState";
const store = createStore<IAppState>(reducer, (window as any)["__REDUX_DEVTOOLS_EXTENSION__"] && (window as any)["__REDUX_DEVTOOLS_EXTENSION__"]());

export default store;
