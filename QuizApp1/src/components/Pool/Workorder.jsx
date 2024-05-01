import React, { Fragment, useEffect, useState } from 'react'
import Trash from '../../assets/img/Trash.png'
import Create from '../../assets/img/Create.png'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, DatePicker } from 'antd';
import Switch from "antd/lib/switch";
import Modal from 'react-bootstrap/Modal';
import WorkorderModal from './WorkorderModal';
import EditWorkOrderModal from './EditWorkOrder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchgetWorkOrderByWaterBody } from '../../redux/Slices/getWorkorder';
import { DeletewaterbodyWorkOrdertData } from '../../redux/postReducer/postWorkorder';


export default function Workorder({data}) {


  const WorkOrder = data;

  console.log(WorkOrder)

  const { data: singlewaterbody } = useSelector(
    (state) => state.singlewaterbody
  );
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();


  const waterbody_id = singlewaterbody?._id


  const [showEdit, setShowEdit] = useState(false);
  const [EditData, setEditData] = useState("");
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (data) => {
    setShowEdit(true)
    setEditData(data)
  };



  const form = Form.useForm()[0];

  const [formData, setFormData] = useState({
    Equipment: WorkOrder,
  }
  );

  useEffect(() => {
    if (WorkOrder && WorkOrder) {
      form.setFieldsValue({
        Equipment: WorkOrder?.items?.map((location, index) => ({
          work_needed: location.work_needed,
          price: location.price,
          key: index.toString(),
        })),
      });
    }
  }, [WorkOrder]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

 
  const DeleteWorkOrderList = async (datas, key) => {
    const data = datas?._id
    await dispatch(DeletewaterbodyWorkOrdertData({ data }));
    dispatch(fetchgetWorkOrderByWaterBody({waterbody_id}));
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
  const onFinish = (values) => {

  };
  const { RangePicker } = DatePicker;


  return (
    <Fragment>
      <div className='container-fluid wordkorder'>
        <div className='row headwork'>

          <div className='col-sm-8'>
            <h3>Work Order</h3>
          </div>
          <div className='col-sm-2 history'>
            {/* <h3>History</h3> */}
          </div>
          <div className='col-sm-2'>
          </div>
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
                          <div className="col-sm-5">
                            <Form.Item
                              {...restField}
                              name={[name, "work_needed"]}
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

                          <div className="col-sm-5">
                            <Form.Item

                              name={[name, "price"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Filter Clean",
                                },
                              ]}
                            >
                              <Input placeholder="price" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-1">
                            <p className="wbtn" onClick={() => handleShowEdit(WorkOrder?.items[key])}>
                              <img src={Create} style={{cursor:"pointer"}}/>
                            </p>
                          </div>

                          <div className="col-sm-1">
                            <Form.Item>
                              <p style={{cursor:"pointer"}} type="secondary" className="wbtn" onClick={() => DeleteWorkOrderList(WorkOrder?.items[key], key)}>
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

      <Modal show={show} onHide={handleClose} animation={false} className='addRouteAssignmentModal'>
        <Modal.Body>Add Work Order <Button variant="secondary" onClick={handleClose}> X </Button></Modal.Body>
        <WorkorderModal data={handleClose}/>
      </Modal>




      <Modal show={showEdit} onHide={handleCloseEdit} animation={false}>
        <Modal.Body>
        Edit Work Order
          <Button variant="secondary" onClick={handleCloseEdit}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <EditWorkOrderModal data={{ EditData, handleCloseEdit }} />
      </Modal>

    </Fragment>
  )
}
