import React from "react";
import { setDefaultOptions } from "esri-loader";
import "./styles.css";
import { Map } from "./Map";
import { GraphicsLayer } from "./Layers";
import MapContextButton from "./components/MapContextButton";
import BasemapSelector from "./components/BasemapSelector";
import SketchLayer from "./components/SketchLayer";
import Search from "./components/Search";
import Print from "./components/Print";
setDefaultOptions({ css: true });

export default function App() {
  return (
    <div className="App">
      <Map portalUrl="https://kytc.maps.arcgis.com/" extent={{}}>
        <GraphicsLayer id="sketchLayer" />
        <SketchLayer />
        <Search />
        <BasemapSelector />
        <MapContextButton isHidden={true} />} />
        <Print />
      </Map>
    </div>
  );
}
