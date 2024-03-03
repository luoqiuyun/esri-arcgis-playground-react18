import React from "react";
import { MapComponent, Widget } from "../Widget/Widgets";

const BasemapSelector = () => {

  return (  
    <MapComponent
      position="top-left"
      expandable={true}
      expandProperties={{
        expandTooltip: "Basemap Gallery",
        expandIconClass: "esri-icon-basemap"
      }}
    >
      <Widget type="esri/widgets/BasemapGallery" />
    </MapComponent>
  );
};

export default BasemapSelector;
