import React from "react";
import {WebGLMap} from "@luciad/ria/view/WebGLMap";
import LuciadMap, {LuciadMapProps} from "../luciadmap/LuciadMap";
import {Map} from "@luciad/ria/view/Map";

import "./MainMap.scss";
import {Actions} from "../../reduxboilerplate/actions";
import {SetLuciadMap} from "../../reduxboilerplate/luciadmap/actions";
import {connect} from "react-redux";
import {IAppState} from "../../reduxboilerplate/store";

interface StateProps {
    map: WebGLMap | null;
}

interface DispatchProps {
    setLuciadMap: (map: WebGLMap) => void;
}

type Props = StateProps & DispatchProps & LuciadMapProps;

class MainMap extends LuciadMap<Props, any>{

    render() {
        return (
            <div className="LuciadMap MainMap" ref = {(ref) => {this.mapRef = ref}}/>
        );
    }

    protected createMap() {
        super.createMap();
        this.props.setLuciadMap(this.map);
    }

    protected destroyMap() {
        super.destroyMap();
        this.props.setLuciadMap(this.map);
    }
}

function mapStateToProps(state: IAppState): StateProps {
    const props: StateProps = {
        map: state.map.map as WebGLMap,
    };
    return props;
}

function mapDispatchToProps(dispatch: React.Dispatch<Actions>): DispatchProps {
    return {
        setLuciadMap: (map: WebGLMap) => {
            dispatch(SetLuciadMap(map as Map));
        },
    };
}

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(MainMap);
