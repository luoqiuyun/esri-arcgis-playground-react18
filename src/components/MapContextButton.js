import React from "react";
import { MapContext } from "../Map/helpers";
import { MapComponent } from "../Widget/Widgets";

const MapContextButton = ({isHidden}) => {

  return (
    <>
      {!isHidden &&
        <MapComponent position="manual" style={{ left: "59px", top: "15px" }}>
          {<MapContext.Consumer>
            {(context) => {
              return (
                <button className="map-ui-btn" onClick={console.log(context)}>
                  &hearts;
                </button>
              );
            }}
          </MapContext.Consumer>}
        </MapComponent>
      }
    </>
  );
};

export default MapContextButton;
