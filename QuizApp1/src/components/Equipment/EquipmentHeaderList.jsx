import React from "react";
import { Fragment } from "react";

import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import { Button } from "antd";
import EquipmentForm from "../AddEquipment/EquipmentForm";
import EquipmentHeader from "../AddEquipment/EquipmentHeader";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { fetchEquiptmentCSVData } from "../../redux/Slices/getCSVData";
import { useDispatch } from "react-redux";
export default function EquipmentHeaderList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const { data: getAllEquipmemnt, statusdata } = useSelector(
    (state) => state.getAllEquipmemnt
  );
  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );

  const data = getCSVData ? getCSVData : [];

  const getCSVFunction = async () => {
    await dispatch(fetchEquiptmentCSVData());
  };

  return (
    <Fragment>
      <div className="row customers ">
        <div className="col-sm-5 equipmentssss">
          <h2>Equipment</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <button className="yellowbtn">
            <CSVLink data={data} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>

          <button className="bluebtn" onClick={handleShow}>
            Add New
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className="modalHeader">
          <Button variant="secondary" onClick={handleClose}>
      
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="addcustomers addEquipments">
            <EquipmentHeader />
            <EquipmentForm data1={handleClose} />
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
