import React from "react";
import {WebGLMap} from "@luciad/ria/view/WebGLMap";
import {getReference} from "@luciad/ria/reference/ReferenceProvider";

import "./LuciadMap.scss";

export interface LuciadMapProps {
    initialMapProjection?: string;
}

class LuciadMap < T extends LuciadMapProps, S extends any > extends React.Component<T, S>{
    protected mapRef: HTMLDivElement;
    protected map: WebGLMap;

    componentDidMount() {
        this.createMap();
    }

    componentWillUnmount() {
        this.destroyMap();
    }

    render() {
        return (
            <div className="LuciadMap" ref = {(ref) => {this.mapRef = ref}}/>
        );
    }

    protected createMap() {
        this.destroyMap();
        const mapProjection = this.props.initialMapProjection ? this.props.initialMapProjection : "EPSG:4978";
        this.map = new WebGLMap(this.mapRef, {reference: getReference(mapProjection)});
    }

    protected destroyMap() {
        if (this.map) {
            this.map.destroy();
        }
        this.map = null;
    }
}

export default LuciadMap;
