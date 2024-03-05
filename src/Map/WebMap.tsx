import React from "react";
import { WebMap as EsriWebMap } from "@esri/react-arcgis";
import { loadTypedModules, MapChild } from "../utilities/GIS";
import DOMContainer from "../utilities/DOMContainer";
import {
  CommonProperties,
  MapProperties,
  WebMapProperties,
  MapState
} from "../types";

function mapNeedsInit(props: CommonProperties) {
  return !!props.portalUrl || !!props.tokenFetchers;
}

async function initMap(props: CommonProperties) {
  const [esriConfig, esriId] = await loadTypedModules(
    "esri/config",
    "esri/identity/IdentityManager"
  );

  if (props.portalUrl) {
    esriConfig.portalUrl = props.portalUrl;
  }

  if (props.tokenFetchers) {
    const tokens = await Promise.all(props.tokenFetchers.map((f) => f()));
    tokens.forEach((t) => esriId.registerToken(t));
  }
}

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

function addContext(mapId: string, context: MapChild) {
  const existing = _contexts.get(mapId);
  if (existing) {
    existing.context = context;
    existing.resolve(context);
  } else _contexts.set(mapId, { context, resolve: () => context });
}

export class WebMap extends React.Component<WebMapProperties, MapState> {
  public constructor(props: WebMapProperties) {
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
    if (this.props.onLoad) this.props.onLoad(map as __esri.WebMap, view);
    this.setState({ context: { map, view } });
  }

  private onFail(e: any) {
    if (this.props.onFail) this.props.onFail(e);
  }

  public render() {
    return this.state.mapReady ? (
      <EsriWebMap
        id={this.props.portalId}
        onLoad={this.onLoad.bind(this)}
        onFail={this.onFail.bind(this)}
        viewProperties={{center: [-122, 37.6], zoom: 9}}
      >
        {this.state.context ? (
          <MapContext.Provider value={this.state.context}>
            {this.props.children}
          </MapContext.Provider>
        ) : null}
      </EsriWebMap>
    ) : (
      <p>Loading...</p>
    );
  }
}
