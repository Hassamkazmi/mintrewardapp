import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import Switch from "antd/lib/switch";
import Modal from "react-bootstrap/Modal";
import EquipmentModal from "./EquipmentModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetPoolEquipmemnt } from "../../redux/Slices/getEquipment";
import { DeletewaterbodyEquipmenttData } from "../../redux/postReducer/postEquipment";

export default function Servicelist({ data }) {


// const Equiptment = data?.Equipment;

const Equiptment = data?.getEquipmemnt;
const waterbody_id = data?.singlewaterbody?._id;

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [Edit, setEdit] = useState("");
const [showEdit, setShowEdit] = useState(false);
const handleCloseEdit = () => setShowEdit(false);
const handleShowEdit = async (data) => {
  setShowEdit(true);
  setEdit(data);
};

const form = Form.useForm()[0];

const propsdata = data;
const dispatch = useDispatch();
const [formData, setFormData] = useState({
  Equipment: Equiptment,
});

useEffect(() => {
  if (Equiptment && Equiptment) {
    form.setFieldsValue({
      Equipment: Equiptment.map((location, index) => ({
        name: location?.EquipmentWaterBodyEquipmentData?.name,
        description: location?.EquipmentWaterBodyEquipmentData?.description,
        key: index.toString(),
      })),
    });
  }
}, [Equiptment]);

const handleFormValuesChange = (changedValues, allValues) => {
  setFormData(allValues);
};

const DeleteEquiptmentList = async (datas, key) => {

  const id = datas?._id;
 await dispatch(DeletewaterbodyEquipmenttData({ id }));

  dispatch(fetchgetPoolEquipmemnt({ waterbody_id }));
};

const onFinishFailed = (errorInfo) => {
  toast.error("Please fill all required fields!");
};
const onFinish = (values) => {};

return (
  <Fragment>
    <div className="container-fluid wordkorder">
      <div className="row headwork">
        <div className="col-sm-8">
          <h3>Equipment</h3>
        </div>
        <div className="col-sm-4"></div>
      </div>

      <div className="row checklistdata">
        <div className="row fomik dynamic_form_nest_item">
          <div className="row workaddbtn">
            <div className="col-sm-12 btns">
              <Form.Item>
                <Button className="wbtn" onClick={handleShow} block>
                  + Add New
                </Button>
              </Form.Item>
            </div>
          </div>

          <Form
            name="dynamic_form_nest_item"
            onValuesChange={handleFormValuesChange}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValue={formData.Equipment}
          >
            <Form.List name="Equipment">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <div className="row slignc">
                        <div className="col-sm-10">
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing Filter Clean",
                              },
                            ]}
                          >
                            <Input placeholder="name " />
                          </Form.Item>
                        </div>

                        <div className="col-sm-1">
                           {/* <p className="wbtn" onClick={() => handleShowEdit(Equiptment[key],key)}>
                              <img src={Create} style={{cursor:"pointer"}}/>
                            </p>  */}
                        </div>

                        <div className="col-sm-1">
                          <Form.Item>
                            <p
                              style={{ cursor: "pointer" }}
                              type="secondary"
                              className="wbtn"
                              onClick={() =>
                                DeleteEquiptmentList(Equiptment[key], key)
                              }
                            >
                              <img src={Trash} />
                            </p>
                          </Form.Item>
                        </div>
                        <div className="col-sm-1"></div>
                      </div>
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
    </div>
    <Modal show={show} onHide={handleClose} animation={false} className="addRouteAssignmentModal">
      <Modal.Body className="equipmentModaalllll">
        Add Equipment
        <Button variant="secondary" onClick={handleClose}>
          {" "}
          X
        </Button>
      </Modal.Body>
      <EquipmentModal data1={{ handleClose, propsdata }} />
    </Modal>

    {/* <Modal show={showEdit} onHide={handleCloseEdit} animation={false}>
        <Modal.Body>
          Edit Service
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <EditServiceListModal data1={{handleCloseEdit , Edit}} />
      </Modal> */}
  </Fragment>
);
}
