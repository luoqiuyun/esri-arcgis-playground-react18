import React from "react";
import { loadTypedModules } from "../utilities/GIS";
import { MapContext } from "../Map/helpers";

interface LayerQueueItem {
  map: __esri.Map;
  getLayer: () => __esri.Layer;
  ready: boolean;
}

let layerQueue: LayerQueueItem[] = [];
function queueLayer(map: __esri.Map, getLayer: () => __esri.Layer) {
  const record = { map, getLayer, ready: false };
  layerQueue.push(record);
  return function onReady() {
    record.ready = true;
    if (layerQueue.every((t) => t.ready)) {
      layerQueue.forEach((t) => map.add(t.getLayer()));
      layerQueue = [];
    }
  };
}

interface FeatureLayerProperties {
  url: string;
  id?: string;
  title?: string;
}

export function FeatureLayer(props: FeatureLayerProperties) {
  const context = React.useContext(MapContext);
  console.log(`FeatureLayer '${props.id}' entry`);
  React.useEffect(() => {
    console.log(`FeatureLayer '${props.id}' useEffect`);
    let layer: __esri.FeatureLayer | undefined;
    const onReady = queueLayer(context.map, () => layer!);
    (async function () {
      const [FeatureLayerConstructor] = await loadTypedModules(
        "esri/layers/FeatureLayer"
      );

      layer = new FeatureLayerConstructor({
        url: props.url,
        id: props.id,
        title: props.title
      });
      onReady();
    })();

    return function cleanup() {
      console.log(`FeatureLayer '${props.id}' cleanup`);
      if (layer) context.map.remove(layer);
    };
  });

  return null;
}

interface GraphicsLayerProperties {
  id?: string;
  title?: string;
}

export function GraphicsLayer(props: GraphicsLayerProperties) {
  const context = React.useContext(MapContext);
  console.log(`GraphicsLayer '${props.id}' entry`);
  React.useEffect(() => {
    console.log(`GraphicsLayer '${props.id}' useEffect`);
    let graphicsLayer: __esri.GraphicsLayer | undefined;
    const onReady = queueLayer(context.map, () => graphicsLayer!);
    (async function () {
      const [GraphicsLayerConstructor] = await loadTypedModules(
        "esri/layers/GraphicsLayer"
      );

      graphicsLayer = new GraphicsLayerConstructor({
        id: props.id,
        title: props.title
      });
      onReady();
    })();

    return function cleanup() {
      console.log(`GraphicsLayer '${props.id}' cleanup`);
      if (graphicsLayer) context.map.remove(graphicsLayer);
    };
  });

  return null;
}
