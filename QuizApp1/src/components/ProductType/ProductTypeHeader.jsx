import { Button } from "antd";
import React, { useState } from "react";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import AddProductTypeForm from "../AddProductType/AddProductTypeForm";
import AddProductTypeHeader from "../AddProductType/AddProductTypeHeader";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
export default function ProductTypeHeader() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: getProductType } = useSelector(
    (state) => state.getProductType
  );
  const data = getProductType?.items ?  getProductType?.items :  [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>Product Type</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">

        <button className='yellowbtn'>
        <CSVLink data={data} >Export</CSVLink>
          </button>

          <button className="bluebtn" onClick={handleShow}>
            Add New
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className="modalHeader">
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="addcustomers">
            <AddProductTypeHeader />
            <AddProductTypeForm data={handleClose} />
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
