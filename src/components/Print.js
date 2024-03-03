import React from "react";
import { MapComponent, Widget } from "../Widget/Widgets";
import { options } from "./config";

const Print = () => {

  return (
    <MapComponent
      position="top-right"
      expandable={true}
      expandProperties={{
        expandTooltip: "Print",
        expandIconClass: "esri-icon-printer"
      }}
    >
      <Widget
        type="esri/widgets/Print"
        widgetProperties={{ printServiceUrl: options.printServiceUrl }}
      />
    </MapComponent>
  );
};

export default Print;
