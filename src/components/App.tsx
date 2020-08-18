import React from 'react';

import "./App.scss"

import react_icon from "../assets/images/tenor.gif";
import LuciadMap from "./luciadmap/LuciadMap";
import MainMap from "./mainmap/MainMap";

class App extends React.Component<any> {

    render() {
        return (
            <div className="App">
                <MainMap />
            </div>
        );
    }
}

export default App;
