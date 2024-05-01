import React, { Fragment } from "react";
import Map from "../../assets/img/map.png";
import GoogleMap from "./GoogleMap";
function Locationonmap() {
  return (
    <Fragment>
      <div className="row customers cslocation" style={{ textAlign: "center" }}>
        <div className="col-sm-12 right routeLocationMap">
          {/* <button className="bluebtn">Selected Routes</button>
          <button className="bluebtn">All Routes</button> */}

          
        </div>
      </div>
      <div className="filteraccordian workTabsss">
        <GoogleMap />
      </div>
    </Fragment>
  );
}

export default Locationonmap;
