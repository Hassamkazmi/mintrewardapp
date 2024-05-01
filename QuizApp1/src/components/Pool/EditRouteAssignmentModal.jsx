import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import {
  UpdateSinglerouteAssignmwnt,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { fetchgetRouteAssingnment } from "../../redux/Slices/getRouteAssignment";

const { Option } = Select;

const AddpoolsCustomer = ({ data }) => {


  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  let waterbody_id = data?.EditData?.waterbody_id;
  let active_service_id = data?.EditData?._id;

  console.log(data)

  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [formData, setFormData] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const navigate = useNavigate(); // Initialize useory
 
  useEffect(() => {
    setFormData({
      technician_id: data?.EditData?.RouteAssignmentTechnician?.first_name,
      frequency_id: data?.EditData?.RouteAssignmentFrequency?.name,
      assigned_date: data?.EditData?.assigned_date || "",
      start_date: formatDate(data?.EditData?.start_date),
      end_date: data?.EditData?.end_date ? formatDate(data?.EditData?.end_date) : "No End",
    })
  },[data])



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
      technician_id: values?.technician_id?.value ,
      waterbody_id: waterbody_id,
      frequency_id: values?.frequency_id?.value,
      assigned_date: values?.assigned_date,
      start_date: values?.start_date,
      end_date: values?.end_date == "No End" ? null :  values?.end_date,
    };
    await dispatch(UpdateSinglerouteAssignmwnt({active_service_id , Data }));
  };

  useEffect(() => {
    if (postwaterResult.data) {
      toast.success("Form submitted successfully!");
      dispatch(resetData());
      dispatch(fetchgetRouteAssingnment({ waterbody_id }));
      data.handleCloseEdit();
    }
  }, [postwaterResult]);

  // Handle form submission error

  useEffect(() => {
    if (postwaterResult.error) {
      const err = postwaterResult?.error;
      toast.error(err);
    }
  }, [postwaterResult]);

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  form.setFieldsValue({
    technician_id:{
      label: data?.EditData?.RouteAssignmentTechnician?.first_name,
      value: data?.EditData?.RouteAssignmentTechnician?._id,
    },
    assigned_date: formData?.assigned_date || "",
    frequency_id: {
      label: data?.EditData?.RouteAssignmentFrequency?.name,
      value: data?.EditData?.RouteAssignmentFrequency?._id,
    },
    start_date: formData?.start_date,
    end_date: formData?.end_date,

});

  return (
    <div className="row fomik fomik1">
      <Form
         name="nest-messages"
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
        //  validateMessages={validateMessages}
         onValuesChange={handleFormValuesChange}
         form={form}
         autoComplete="off"
         initialValues={formData}
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
            <Form.Item name="assigned_date" label="Day Of Week">
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
                  return <Option value={item._id}>{item.name}</Option>;
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
