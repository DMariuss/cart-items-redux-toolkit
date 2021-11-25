import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
// import App from "./App";
import App from "./App-withActionsCreators";
import store from "./store/index-store";

ReactDOM.render(
  <Provider store={store}>
    <App /> {/* **** modificat din import **** */}
  </Provider>,
  document.getElementById("root")
);
