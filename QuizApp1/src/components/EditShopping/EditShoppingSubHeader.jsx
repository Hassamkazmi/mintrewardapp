import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function EditShoppingSubHeader() {
  return (
    <Fragment>
      <div className="row customers shoppingHeader">
        <div className="col-sm-5 editShoppingFormSubHeader">
          <h2>Add Part/Chemical/Others</h2>
        </div>
      </div>
    </Fragment>
  );
}
