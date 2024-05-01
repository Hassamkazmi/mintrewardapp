import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { postitemTypeData } from "../../redux/postReducer/postProductType";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetProductType } from "../../redux/Slices/getProductType";

const AddProductTypeForm = ({ data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const postsProductType = useSelector((state) => state.postsProductType);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("Please fill all required fields!");
  };

  const onFinish = async (values, key) => {
    await dispatch(postitemTypeData({ values }));
    dispatch(fetchgetProductType({}));
    data();
  };

  return (
    <div className="row fomik addRoute">
      <Form
        name="Customer"
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="row">
          <div className="col-sm-12">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input Product Type Name!" },
              ]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addProductType">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save Product Type
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProductTypeForm;
