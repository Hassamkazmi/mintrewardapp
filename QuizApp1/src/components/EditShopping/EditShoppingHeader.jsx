import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function EditShoppingHeader() {
  return (
    <Fragment>
      <div className="row customers shopHeader">
        <div className="col-sm-5 editShoppingFormSubHeader">
          <h2>EDIT SHOPPING LIST</h2>
        </div>
      </div>
    </Fragment>
  );
}
