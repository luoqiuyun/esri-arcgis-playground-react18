import React from "react";
import { Map, MapContext } from "./Map";
import { GraphicsLayer } from "./Layers";
import { MapComponent, Widget } from "./Widget/Widgets";
import { setDefaultOptions } from "esri-loader";

import "./styles.css";
setDefaultOptions({ css: true });

export default function App() {
  return (
    <div className="App">
      <Map portalUrl="https://kytc.maps.arcgis.com/" extent={{}}>
        <GraphicsLayer id="sketchLayer" />

        <MapComponent position="top-right">
          <Widget type="esri/widgets/Sketch" layer="sketchLayer" />
        </MapComponent>
        <MapComponent
          position="top-right"
          expandable={true}
          expandProperties={{
            expandTooltip: "Basemap Gallery",
            expandIconClass: "esri-icon-basemap"
          }}
        >
          <Widget type="esri/widgets/BasemapGallery" />
        </MapComponent>
        <MapComponent position="manual" style={{ left: "59px", top: "15px" }}>
          {/* <MapContext.Consumer>
            {(context) => {
              return (
                <button className="map-ui-btn" onClick={console.log(context)}>
                  &hearts;
                </button>
              );
            }}
          </MapContext.Consumer> */}
        </MapComponent>
        <MapComponent
          position="top-right"
          expandable={true}
          expandProperties={{
            expandTooltip: "Print",
            expandIconClass: "esri-icon-printer"
          }}
        >
        </MapComponent>
      </Map>
    </div>
  );
}
