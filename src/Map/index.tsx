import React from "react";
import { Map as EsriMap } from "@esri/react-arcgis";
import { CommonProperties, MapProperties, MapState } from "./types";
import { loadTypedModules, MapChild } from "../utilities/GIS";
import {
  mapNeedsInit,
  initMap,
  MapContext,
  addContext
} from "./helpers"

export class Map extends React.Component<MapProperties, MapState> {
  
  public constructor(props: MapProperties) {
    super(props);
    this.state = {
      mapReady: !mapNeedsInit(props)
    };
  }

  public async componentDidMount() {
    if (this.state.mapReady) return;
    await initMap(this.props);
    this.setState({ mapReady: true });
  }

  private onLoad(map: __esri.Map, view: __esri.MapView | __esri.SceneView) {
    addContext(this.props.id, { map, view });
    if (this.props.onLoad) this.props.onLoad(map, view);
    this.setState({ context: { map, view } });
  }

  private onFail(e: any) {
    if (this.props.onFail) this.props.onFail(e);
  }

  public render() {
    return this.state.mapReady ? (
      <EsriMap
        onLoad={this.onLoad.bind(this)}
        onFail={this.onFail.bind(this)}
        mapProperties={{ basemap: "streets-vector" }}
        viewProperties={{center: [-122, 37.6], zoom: 9}}
      >
        {this.state.context ? (
          <MapContext.Provider value={this.state.context}>
            {this.props.children}
          </MapContext.Provider>
        ) : null}
      </EsriMap>
    ) : (
      <p>Loading...</p>
    );
  }
}
