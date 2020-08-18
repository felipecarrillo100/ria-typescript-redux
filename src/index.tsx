import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.scss";
import {Provider} from "react-redux";
import {store} from "./reduxboilerplate/store";

const renderApp = () => {
    ReactDOM.render((
        <Provider store={store}>
            <App/>
        </Provider>
    ), document.getElementById("root"));
};

renderApp();
