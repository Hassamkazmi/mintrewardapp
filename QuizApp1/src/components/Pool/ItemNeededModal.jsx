import React, { Fragment, useEffect, useState } from "react";
import { Form, Select, Input, DatePicker, InputNumber, Button } from "antd";
import { postItemNeedePostData } from "../../redux/postReducer/postItemNeeded";
import { useSelector, useDispatch } from "react-redux";
import { fetchitemNeededWaterBody } from "../../redux/Slices/getItemNeededWaterBody";

const { Option } = Select;
function ItemNeedModal({ data }) {
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

  const waterbody_id = data.waterbody_id;
  const dispatch = useDispatch();

  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    await dispatch(postItemNeedePostData({ values }));
    dispatch(fetchitemNeededWaterBody({waterbody_id}));
    data.handleClose();

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
              <h4>Item Detail</h4>
              <div className="row myselect">
                <div className="col-sm-12">
                  <Form.Item name="name" rules={[{ required: true }]}>
                    <Input placeholder="Item Name" />
                  </Form.Item>

                  <Form.Item
                    type="hidden"
                    name="waterbody_id"
                    style={{ display: "none" }}
                    initialValue={waterbody_id}
                  >
                    <Input placeholder="waterbody_id " />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item name="description" rules={[{ required: true }]}>
                    <Input.TextArea
                      placeholder="Description"
                      showCount
                      maxLength={500}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="row midsec">
            <div className="col-sm-6">
              <Form.Item name="quantity" rules={[{ required: true }]}>
                <Input type="number" placeholder="Quantity" />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="price" rules={[{ required: true }]}>
                <Input type="number" placeholder="Price" />
              </Form.Item>
            </div>
          </div>

          <div className="col-sm-12 submitbtn">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default ItemNeedModal;
