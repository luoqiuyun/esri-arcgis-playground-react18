import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Map as EsriMap } from "@esri/react-arcgis";
import { loadTypedModules, MapChild } from "../utilities/GIS";
import DOMContainer from "../utilities/DOMContainer";
import {
  MapProviderProperties,
  MapProviderState,
} from "../types";

export const MapContext = React.createContext<MapChild>({
  map: {} as __esri.Map,
  view: {} as __esri.View
});

const _contexts = new window.Map<
  string,
  { context?: MapChild; resolve: (context: MapChild) => void }
>();

export function getContext(mapId: string) {
  const context = _contexts.get(mapId);
  if (!context) {
    return new Promise<MapChild>((resolve) => {
      _contexts.set(mapId, { resolve });
    });
  } else return Promise.resolve(context.context!);
}

export class MapProvider extends React.Component<
  MapProviderProperties,
  MapProviderState
> {
  public constructor(props: MapProviderProperties) {
    super(props);
    this.state = { domId: uuidv4() };
  }

  public async componentDidMount() {
    try {
      const context = await getContext(this.props.mapId);
      if (!context) throw new Error(`Couldn't find map ${this.props.mapId}`);
      await context.view.when();
      this.setState({ context });
    } catch (e) {
      console.error(e);
    }
  }

  public render() {
    if (!this.state.context) return null;
    // TODO: don't set height here. Leave styling up to consumer
    return (
      <DOMContainer
        domId={this.state.domId}
        className={this.props.className}
        style={{ ...this.props.style, height: "100%" }}
      >
        <MapContext.Provider value={this.state.context}>
          {this.props.children}
        </MapContext.Provider>
      </DOMContainer>
    );
  }
}
