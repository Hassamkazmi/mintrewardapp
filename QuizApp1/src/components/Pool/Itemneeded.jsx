import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import Switch from "antd/lib/switch";
import Modal from "react-bootstrap/Modal";
import ItemNeedModal from "./ItemNeededModal";
import EditItemNeedModal from "./EditItemNeededModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteItemNeedePostData } from "../../redux/postReducer/postItemNeeded";
import {  fetchitemNeededWaterBody } from "../../redux/Slices/getItemNeededWaterBody";


export default function Servicelist({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {data: getWaterBodyItemNeeded} = useSelector((state) => state.getWaterBodyItemNeeded)

  console.log(getWaterBodyItemNeeded)

  const [Edit, setEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [ItemNeededData, setItemNeededData] = useState([]);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = async (data) => {
    setShowEdit(true);
    setEdit(data);
  };


  const waterbody_id = data?.singlewaterbody?._id;

  const form = Form.useForm()[0];
  const dispatch = useDispatch();

  console.log(ItemNeededData)

  useEffect(() => {
    setItemNeededData(getWaterBodyItemNeeded)
  },[data])

  const [formData, setFormData] = useState({
    ItemNeeded: ItemNeededData,
  });

  useEffect(() => {
    if (getWaterBodyItemNeeded && getWaterBodyItemNeeded) {
      form.setFieldsValue({
        ItemNeeded: getWaterBodyItemNeeded ? getWaterBodyItemNeeded && getWaterBodyItemNeeded?.map((location, index) => ({
          name: location.name,
          description: location.description,
          price: location.price,
          quantity: location.quantity,
          key: index.toString(),
        })) : null,
      });
    }
  }, [getWaterBodyItemNeeded]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const DeleteItemNeeded = async (data, key) => {
    await dispatch(DeleteItemNeedePostData({ data }));
    dispatch(fetchitemNeededWaterBody({ waterbody_id }));
  };


  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };
  const onFinish = (values) => { };


  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-8">
            <h3>Items Needed</h3>
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
              initialValue={formData.ItemNeeded}
            >
              <Form.List name="ItemNeeded">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <div className="row slignc">
                          <div className="col-sm-4">
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
                              <Input readOnly placeholder="Description " />
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "price"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Filter Clean",
                                },
                              ]}
                            >
                              <Input readOnly placeholder="price on Complete" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-3">
                            <Form.Item
                              name={[name, "quantity"]}
                              rules={[
                                {
                                  required: true,
                                  message: "quantity",
                                },
                              ]}
                            >
                              <Input readOnly placeholder="Quantity" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-1">
                            <p
                              className="wbtn"
                              onClick={() =>
                                handleShowEdit(ItemNeededData[key], key)
                              }
                            >
                              <img src={Create} style={{ cursor: "pointer" }} />
                            </p>
                          </div>

                          <div className="col-sm-1">
                            <Form.Item>
                              <p
                                style={{ cursor: "pointer" }}
                                type="secondary"
                                className="wbtn"
                                onClick={() =>
                                  DeleteItemNeeded(
                                    ItemNeededData[key]?._id,
                                    key
                                  )
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
        <Modal.Body>
          Add Item Needed
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <ItemNeedModal data={{ waterbody_id, handleClose }} />
      </Modal>


      <Modal show={showEdit} onHide={handleCloseEdit} animation={false}>
        <Modal.Body>
          Edit Item Needed
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X{" "}
          </Button>
        </Modal.Body>
        <EditItemNeedModal data={{ handleCloseEdit, Edit }} />
      </Modal>



    </Fragment>
  );
}
