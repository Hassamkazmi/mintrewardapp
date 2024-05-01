import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { fetchgetSingleCustomers } from "../../redux/Slices/getSingleCustomer";
import { fetchgetwaterbodyType } from "../../redux/Slices/getWaterbodyType";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchgetRateType } from "../../redux/Slices/getRateType";
import { fetchgetLaborCost } from "../../redux/Slices/getLaborCost";
import { Modal } from "react-bootstrap";
import {
  postrouteAssignmentData,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { fetchgetRouteAssingnment } from "../../redux/Slices/getRouteAssignment";
import moment from "moment";

const { Option } = Select;

const AddpoolsCustomer = ({ data }) => {
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const { pathname } = useLocation();

  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });

  let waterbody_id = data?.data?.singlewaterbody?._id;

  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(null);



  const handleDateChange = (date) => {
    console.log(date)
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const navigate = useNavigate(); // Initialize useory
  // URL from which to extract IDs
  const url = pathname;

  // Split the URL by "/"
  const parts = url.split("/");

  const dispatch = useDispatch();
  const postDataResult = useSelector((state) => state.Technician);
  const postwaterResult = useSelector((state) => state.postrouteAssignment);
  const postfrequency = useSelector((state) => state.getfrequency);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  useEffect(() => {
    dispatch(fetchTechnician());
    dispatch(fetchgetfrequency());
  }, [dispatch]);

  const onFinish = async (values, key) => {
    const Data = {
      technician_id: values?.technician_id,
      waterbody_id: waterbody_id,
      frequency_id: values?.frequency_id,
      service_location_id: data?.data?.service_location_id,
      customer_id: data?.data?.customer_id,
      assigned_date: values?.assigned_day,
      status: "active",
      start_date: selectedDate.toISOString().split('T')[0],
      end_date: selectedEndDate.toISOString().split('T')[0],
    };
    await dispatch(postrouteAssignmentData({ Data }));
  };

  useEffect(() => {
    if (postwaterResult.data) {
      toast.success("Form submitted successfully!");
      dispatch(resetData());
      dispatch(fetchgetRouteAssingnment({ waterbody_id }));
      data.handleClose();
    }
  }, [postwaterResult.data, form, navigate]);

  // Handle form submission error

  useEffect(() => {
    if (postwaterResult.error) {
      const err = postwaterResult?.error;
      toast.error(err);
    }
  }, [postwaterResult.error, form, navigate]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  return (
    <div className="row fomik fomik1">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        autoComplete="off"
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
      >
        <div className="row routeFilterr cslocation">
          <div className="col-sm-12 heads">
            <h3>Route Assignment</h3>
          </div>

          <div className="col-sm-4">
            <Form.Item name="technician_id" label="Tech Name">
              <Select placeholder="Tech">
                {postDataResult.data &&
                  postDataResult?.data?.items?.map((item) => {
                    return <Option value={item._id}>{item.first_name}</Option>;
                  })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item name="assigned_day" label="Day Of Week">
              <Select placeholder="Day Of Week">
                <Option value="monday">Monday</Option>
                <Option value="tuesday">Tuesday</Option>
                <Option value="wednesday">Wednesday</Option>
                <Option value="thursday">Thursday</Option>
                <Option value="friday">Friday</Option>
                <Option value="saturday">Saturday</Option>
                <Option value="sunday">Sunday</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-4">
            <Form.Item name="frequency_id" label="Frequency">
              <Select placeholder="Frequency">
                {postfrequency?.data?.map((item) => {
                  return <Option value={item._id}>{item.label}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <Form.Item name="start_date" label="Start Date">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()} // Disable past dates (today and beyond)
                dateFormat="yyyy-MM-dd" // Set the desired date format
                placeholderText="Select Start date"
              />
            </Form.Item>
          </div>
          <div className="col-sm-6">
            <Form.Item name="end_date" label="End Date">
              <DatePicker
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                minDate={new Date()} // Disable past dates (today and beyond)
                dateFormat="yyyy-MM-dd" // Set the desired date format
                placeholderText="Select End date"
              />
            </Form.Item>
          </div>

          <div className="col-sm-12 buttonsservice">
            <Form.Item className="savebtn">
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddpoolsCustomer;
