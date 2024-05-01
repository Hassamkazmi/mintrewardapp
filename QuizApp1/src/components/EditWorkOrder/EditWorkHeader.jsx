import React from "react";
import { Fragment } from "react";

export default function EditWorkHeader() {
  return (
    <Fragment>
      <div className="row customers editWorkHeader">
        <div className="col-sm-5 ">
          <h2>EDIT WORK ORDER </h2>
        </div>
        <div className="col-sm-7 right">
          <button className="bluebtn">Mark as Completed</button>
        </div>
      </div>
    </Fragment>
  );
}