import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function FinishedOrdersearch() {
  return (
    <Fragment>
      <div className="row customers ">
        {/* <div className="col-sm-3 ">
          <h2>Aaron Adams</h2>
        </div> */}
        <div className="col-sm-12 chemicalRight">
          <div className="row">
            <div className="col-sm-3">
              <h6>
                Total Work Orders <span>55</span>
              </h6>
            </div>
            <div className="col-sm-3">
              <h6>
                Total Sales Price <span>$1885</span>
              </h6>
            </div>
            <div className="col-sm-3">
              <h6>
                Total Job Cost <span>$275</span>
              </h6>
            </div>
            <div className="col-sm-3">
              <h6>
                Total labor Amount <span>$870</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
