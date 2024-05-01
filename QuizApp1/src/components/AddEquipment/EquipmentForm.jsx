import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";

import { toast } from "react-toastify";
import { postequipmwntData , resetData} from "../../redux/postReducer/postEquipment";
import { useDispatch } from "react-redux";
import { fetchgetAllEquipmemnt } from "../../redux/Slices/getAllEquipment";
import { useSelector } from "react-redux";

const EquipmentForm = ({ data1 }) => {

  const { success, error , loading } = useSelector((state) => state.postwaterbodyequipmwnt);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = async (values, key) => {
    await dispatch(postequipmwntData({ values }));
    dispatch(fetchgetAllEquipmemnt({}));
    
  };

  console.log(data1)

  console.log(success, error , loading)

  useEffect(() => {
    if (success) {
      form.resetFields();
      toast.success(success);
      dispatch(resetData());
      data1();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  return (
    <div className="row fomik addRoute">
      <Form
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-sm-6">
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input Equipment Name!" },
              ]}
            >
              <Input placeholder="Equipment Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please input Description!" }]}
            >
              <Input placeholder="Description" />
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn addEquipments">
            <Form.Item>
              <Button className="yellowbtn" type="primary" disabled={loading} htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EquipmentForm;
