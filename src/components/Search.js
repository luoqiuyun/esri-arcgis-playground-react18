import React from "react";
import { MapComponent, Widget } from "../Widget/Widgets";

const Search = () => {

  return (
    <MapComponent
      position="top-right"
      expandable={true}
      expandProperties={{
        expandTooltip: "Search",
        expandIconClass: "esri-icon-search"
      }}
    >
      <Widget type="esri/widgets/Search" />
    </MapComponent>
  );
};

export default Search;
