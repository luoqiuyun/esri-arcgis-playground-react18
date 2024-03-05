import React from "react";
import { CommonProperties } from "./types";
import { loadTypedModules, MapChild } from "../utilities/GIS";

export function mapNeedsInit(props: CommonProperties) {
  return !!props.portalUrl || !!props.tokenFetchers;
}

export async function initMap(props: CommonProperties) {
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

export function addContext(mapId: string, context: MapChild) {
  const existing = _contexts.get(mapId);
  if (existing) {
    existing.context = context;
    existing.resolve(context);
  } else _contexts.set(mapId, { context, resolve: () => context });
}
