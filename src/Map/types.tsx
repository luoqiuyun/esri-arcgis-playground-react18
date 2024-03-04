interface CommonProperties {
  portalUrl?: string;
  children?: React.ReactNode | React.ReactNodeArray;
  id: string;
  tokenFetchers?: Array<() => Promise<{ server: string; token: string }>>;
  onFail?: (e: any) => any;
}

interface MapProperties extends CommonProperties {
  onLoad?: (map: __esri.Map, view: __esri.MapView | __esri.SceneView) => void;
  extent?: __esri.Extent;
}

interface WebMapProperties extends CommonProperties {
  portalId: string;
  onLoad?: (
    map: __esri.WebMap,
    view: __esri.MapView | __esri.SceneView
  ) => void;
}

interface MapState {
  mapReady: boolean;
  context?: MapChild;
}

interface MapProviderProperties {
  children: React.ReactNode | React.ReactNodeArray;
  className?: string;
  style?: React.CSSProperties;
  mapId: string;
}

interface MapProviderState {
  domId: string;
  context?: MapChild;
}

export type {
  CommonProperties,
  MapProperties,
  WebMapProperties,
  MapState,
  MapProviderProperties,
  MapProviderState,
};
