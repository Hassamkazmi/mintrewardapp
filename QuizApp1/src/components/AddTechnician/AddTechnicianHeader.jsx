import React from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProductHeader() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    // navigate("/addcustomer");
  };
  return (
    <Fragment>
      <div className="row customers addTechnicianFormmmss">
        <div className="col-sm-12 ">
          <h2>Add User</h2>
        </div>
      </div>
    </Fragment>
  );
}