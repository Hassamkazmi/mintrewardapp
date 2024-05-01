import React, { Fragment } from "react";
import { Form, Select, Input, DatePicker, InputNumber, Button } from "antd";
import { postserviceCheckListData, postserviceCheckListWaterbodyData } from "../../redux/postReducer/postServiceCheckList";
import { useSelector , useDispatch } from "react-redux";
import { fetchgetserviceCheckList } from "../../redux/Slices/getserviceCheckList";

const { Option } = Select;
function ServiceListModal({data1}) {

  const { data: postserviceCheckList, status } = useSelector((state) => state.postserviceCheckList);

  const dispatch = useDispatch();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };


  const waterbody_id = data1.propsdata.singlewaterbody._id;


  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    await  dispatch(postserviceCheckListWaterbodyData({values}));
    data1.handleClose()
    dispatch(fetchgetserviceCheckList({waterbody_id}));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <div className="row">
            <div className="col-sm-12">
              <h4>Service Check list</h4>
              <div className="row myselect">
               

                <div className="col-sm-12">
                  <Form.Item
                    name="type"
                    type="hidden"
                    style={{ display: "none" }}
                    initialValue={"specific"}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="List Type" />
                  </Form.Item>
                </div>


                <div className="col-sm-12">
                  <Form.Item
                    name="WaterBodyTypeId"
                    type="hidden"
                    style={{ display: "none" }}
                    initialValue={waterbody_id}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="List Type" />
                  </Form.Item>
                </div>

                

                <div className="col-sm-6">
                  <Form.Item name="Description" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="Description" showCount maxLength={500} />
                  </Form.Item>
                </div>
              
                <div className="col-sm-6">
                  <Form.Item name="DescriptionOnComplete" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="Description on Complete" showCount maxLength={500} />
                  </Form.Item>
                </div>
                </div>
            </div>

           
          </div>

          <Form.Item>
            <div className="col-sm-12 uploadImageeePoolAccordionBtn submitbtn">
              
                <Button type="primary" htmlType="submit">
                  {" "}
                  Save{" "}
                </Button>
            </div>
              </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
}

export default ServiceListModal;
