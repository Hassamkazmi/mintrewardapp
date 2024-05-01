import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import {
  postrouteAssignmentData,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// import DatePicker from "react-datepicker";

const { Option } = Select;

const AddRouteForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [Data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };
  
  const { data, loading, success, error } = useSelector(
    (state) => state.postrouteAssignment
  );

  const { data: Technician } = useSelector((state) => state.Technician);
  const postfrequency = useSelector((state) => state.getfrequency);

  const postrouteAssignment = useSelector((state) => state.postrouteAssignment);

  const { data: getCustomerService } = useSelector(
    (state) => state.getCustomerService
  );

  const { data: getCustomer } = useSelector((state) => state.getCustomer);
  const { data: waterbody } = useSelector((state) => state.waterbody);

  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    if (postfrequency?.data?.length === 0) {
      dispatch(fetchgetfrequency());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllgetCustomers());
  }, [dispatch]);

  const CustomerSelect = (id) => {
    dispatch(fetchgetCustomerServices({ id }));
  };
  const LocationSelect = (ServiceLocationID) => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
    console.log(allValues, "allValues");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };
  const onFinish = (values, key) => {
    const Data = {
      technician_id: values.technician_id,
      waterbody_id: values.waterbody_id,
      frequency_id: values.frequency_id,
      service_location_id: values.service_location_id,
      customer_id: values.customer_id,
      assigned_date: values.assigned_day,
      status: "active",
      start_date: selectedDate.toISOString().split('T')[0],
      stop_date: selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : "no_end",
    };

    dispatch(postrouteAssignmentData({ Data }));
  };
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/route-assignment");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  return (
    <div className="row fomik addRoute ">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        autoComplete="off"
        onFinish={onFinish}
      >
        <>
          <div className="row adrrLocation">
            <div className="col-sm-12 heads">
              <h3>Customer Info </h3>
            </div>

            <div className="col-sm-4">
              <Form.Item
                name="customer_id"
                label="Select Customer"
                rules={[
                  {
                    required: true,
                    message: "Please Select Select Customer",
                  },
                ]}
              >
                <Select onChange={CustomerSelect} placeholder="Select Customer">
                  {getCustomer?.items?.map((item, i) => {
                    return (
                      <Option value={item._id}>
                        {item.first_name + " " + item.last_name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-4 swicthbtn">
              <Form.Item
                name="service_location_id"
                label="Select Service Location"
                rules={[
                  {
                    required: true,
                    message: "Please Select Service Location",
                  },
                ]}
              >
                <Select onChange={LocationSelect} placeholder="Select Location">
                  {getCustomerService?.map((item, i) => {
                    return <Option value={item?._id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                name="waterbody_id"
                label="Select WaterBody"
                rules={[
                  {
                    required: true,
                    message: "Please Select Pool",
                  },
                ]}
              >
                <Select placeholder="Select WaterBody">
                  {waterbody?.map((item, i) => {
                    return <Option value={item?._id}>{item?.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-12 heads">
              <h3>Route Assignment Info</h3>
            </div>

            <div className="col-sm-3 underAddPool">
              <Form.Item
                name="technician_id"
                label="Tech"
                rules={[
                  {
                    required: true,
                    message: "Please Select Technician",
                  },
                ]}
              >
                <Select placeholder="Tech">
                  {Technician?.items &&
                    Technician.items?.map((item, i) => {
                      return (
                        <Option value={item._id}>{item.first_name}</Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-3 underAddPool">
              <Form.Item
                name="assigned_day"
                label="Day of Week"
                rules={[
                  {
                    required: true,
                    message: "Please Select Day of Week",
                  },
                ]}
              >
                <Select
                  placeholder="Day Of Week"
                  onChange={handleDayChange}
                  value={selectedDay}
                >
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
            <div className="col-sm-2 underAddPool">
              <Form.Item
                name="frequency_id"
                label="Frequency"
                rules={[
                  {
                    required: true,
                    message: "Please Select Frequency",
                  },
                ]}
              >
                <Select placeholder="Frequency">
                  {postfrequency?.data?.map((item) => (
                    <Option key={item._id} value={item.frequency_id}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-2 routeDateee underAddPool">
              <Form.Item
                name={[name, "start_date"]}
                label="Start date"
                rules={[
                  {
                    required: true,
                    message: "Please Select Start Date",
                  },
                ]}
              >
                <DatePicker
                  onChange={handleDateChange}
                  disabledDate={(current) => {
                    if (!selectedDay) {
                      return false;
                    }

                    const selectedDayIndex = moment(selectedDay, "dddd").day();
                    const currentDateIndex = current.day();

                    return selectedDayIndex !== currentDateIndex;
                  }}
                  placeholder="Select Start date"
                />
              </Form.Item>
            </div>

            <div className="col-sm-2 routeDateee underAddPool">
              <Form.Item name={[name, "stop_date"]} label="End date">
                <DatePicker
                  selected={selectedEndDate}
                  onChange={handleEndDateChange}
                  minDate={new Date()} // Disable past dates (today and beyond)
                  // dateFormat="yyyy-MM-dd" // Set the desired date format
                  placeholderText="Select End date"
                />
              </Form.Item>
            </div>

            <div className="col-sm-12 buttonsservice">
              <Form.Item className="savebtn">
                <Button
                  className="yellowbtn submitButtoonnn"
                  loading={loading}
                  disabled={loading}
                  htmlType="submit"
                >
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </>
      </Form>
    </div>
  );
};

export default AddRouteForm;
