import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { postwaterbodyequipmwntData } from "../../redux/postReducer/postEquipment";
import { useDispatch, useSelector } from "react-redux";
import {  fetchgetPoolEquipmemnt } from "../../redux/Slices/getEquipment";
import { useEffect } from "react";
import { fetchgetAllEquipmemnt } from "../../redux/Slices/getAllEquipment"; 

const EquipmentForm = ({ data1 }) => {
  const [form] = Form.useForm();
  const [Equipment , setEquipment] = useState('')

  const dispatch = useDispatch();
  const postDataResult = useSelector((state) => state.getAllEquipmemnt);


  useEffect(() => {
    dispatch(fetchgetAllEquipmemnt({}));
  }, [dispatch]);


  const waterbody_id = data1?.propsdata?.singlewaterbody?._id;

  const onFinish = async () => {
    const Data = {
      waterbody_id: waterbody_id,
      equipment_id: Equipment,
    };
    await dispatch(postwaterbodyequipmwntData({ Data }));
    dispatch(fetchgetPoolEquipmemnt({ waterbody_id }));
    data1.handleClose();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    toast.error("Please fill all required fields!");
  };

  return (
    <div className="row fomik addRoute equipmentModaalllll">
      <Form
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row">
          <div className="col-sm-12">
            <Form.Item
              name="equiptment"
              rules={[{ required: true, message: "equiptment is required" }]}
            >
              <Select onChange={setEquipment} placeholder="Equipment">
                {postDataResult?.data?.map((item) => {
                  return <Option value={item._id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-12 savebtn">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save Equipment
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EquipmentForm;
