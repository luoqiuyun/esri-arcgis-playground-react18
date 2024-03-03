import React from "react";
import { MapComponent, Widget } from "../Widget/Widgets";

const SketchLayer = () => {

  return (
    <MapComponent position="top-right">
      <Widget type="esri/widgets/Sketch" layer="sketchLayer" />
    </MapComponent>
  );
};

export default SketchLayer;
