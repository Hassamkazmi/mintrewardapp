import React, { Fragment, useState } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, DatePicker } from "antd";
import Switch from "antd/lib/switch";
import Modal from "react-bootstrap/Modal";
import ServiceListModal from "./ServiceCheckListModal";
import EditServiceListModal from "./EditServiceListModal";
import { fetchgetserviceCheckList } from "../../redux/Slices/getserviceCheckList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteserviceCheckListData } from "../../redux/postReducer/postServiceCheckList";

export default function Servicelist({ data }) {
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

  const waterbody_id = data?.singlewaterbody?._id;
  const form = Form.useForm()[0];

  const propsdata = data;
  const dispatch = useDispatch();
  const { data: getserviceCheckList, status } = useSelector(
    (state) => state.getserviceCheckList
  );

  const [formData, setFormData] = useState({
    ServiceCheckList: getserviceCheckList?.items,
  });

  // useEffect(() => {
  //   dispatch(fetchgetserviceCheckList({waterbody_id}));
  // }, [dispatch]);

  useEffect(() => {
    if (getserviceCheckList && getserviceCheckList) {
      form.setFieldsValue({
        ServiceCheckList: getserviceCheckList?.items?.map((location, index) => ({
          description: location.Description,
          description_on_complete: location.DescriptionOnComplete,
          key: index.toString(),
        })),
      });
    }
  }, [getserviceCheckList]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const DeleteCheckList = async (data, key) => {
    await dispatch(DeleteserviceCheckListData({ data }));
    dispatch(fetchgetserviceCheckList({waterbody_id}));
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
  const onFinish = (values) => {};

  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-8">
            <h3>Service Check List</h3>
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
              initialValue={formData.ServiceCheckList}
            >
              <Form.List name="ServiceCheckList">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <div className="row slignc">
                          <div className="col-sm-5">
                            <Form.Item
                              {...restField}
                              name={[name, "description"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Filter Clean",
                                },
                              ]}
                            >
                              <Input placeholder="Description " />
                            </Form.Item>
                          </div>

                          <div className="col-sm-5">
                            <Form.Item
                              name={[name, "description_on_complete"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Filter Clean",
                                },
                              ]}
                            >
                              <Input placeholder="Description on Complete" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-1">
                            <p
                              className="wbtn"
                              onClick={() =>
                                handleShowEdit( getserviceCheckList?.items[key], key)
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
                                  DeleteCheckList(
                                    getserviceCheckList?.items[key]?._id,
                                    key
                                  )
                                }
                              >
                                <img src={Trash} />
                              </p>
                            </Form.Item>
                          </div>
                          {/* <div className="col-sm-1"></div> */}
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
          Add Service
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <ServiceListModal data1={{ handleClose, propsdata }} />
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit} animation={false}>
        <Modal.Body>
          Edit Service
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <EditServiceListModal data1={{ handleCloseEdit, Edit ,waterbody_id }} />
      </Modal>
    </Fragment>
  );
}
