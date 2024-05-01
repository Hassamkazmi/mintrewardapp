import { Breadcrumb } from "antd";
import React, { useState } from "react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import PoolTypeModal from "./PoolTypeModal";
import { Button } from "react-bootstrap";

export default function Poolheader({toggleFields}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = pathname;


  // Split the URL by "/"
  const parts = url.split("/");

  // Extract the IDs from the parts
  const customerID = parts[parts.length - 2];
  const ServiceLocationID = parts[parts.length - 1];



  const handleAnother = () => {
    navigate(`/customer-addpools/${customerID}/${ServiceLocationID}`);
  };
  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 ">
          <h2>Pool</h2>

        </div>
        <div className="col-sm-7 right">
          <button className="bluebtn" onClick={toggleFields}>
            Edit
          </button>

          <button className="bluebtn" onClick={() => handleAnother()}>
            Add Another
          </button>
        </div>
      </div>

    </Fragment>
  );
}
