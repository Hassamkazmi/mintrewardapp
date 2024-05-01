import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function InvoicingHeader() {
  return (
    <Fragment>
      <div className="row customers ">
        <div className="col-sm-12 ">
          <h2>
            Invoicing Report{" "}
            <span>
              <span>235</span>
            </span>
          </h2>
        </div>
      </div>
    </Fragment>
  );
}
