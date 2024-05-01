import React, { Fragment, useEffect } from "react";
import { Form, Select, Input, InputNumber, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetWorkOrderType } from "../../redux/Slices/getWorkOrderType";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import moment from "moment";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  postworkorderData,
  resetData,
} from "../../redux/postReducer/postWorkorder";
import { toast } from "react-toastify";

const { Option } = Select;
function Workorderform() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [form] = Form.useForm();
  const { data, loading, success, error } = useSelector(
    (state) => state.postworkorder
  );
  const postworkorders = useSelector((state) => state.postworkorder);
  const { data: getWorkOrderType } = useSelector(
    (state) => state.getWorkOrderType
  );
  const { data: getCustomer, statusdata } = useSelector(
    (state) => state.getCustomer
  );
  const { data: getCustomerService } = useSelector(
    (state) => state.getCustomerService
  );
  const { data: waterbody } = useSelector((state) => state.waterbody);

  const { data: Technician } = useSelector((state) => state.Technician);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values, key) => {
    const Data = {
      technician_id: values.technician_id,
      service_time: values.service_time,
      work_performed: values.work_performed,
      service_location_id: values.service_location_id,
      customer_id: values.customer_id,
      estimated_time_minutes: values.estimated_time_minutes,
      status: "active",
      price: values.price,
      work_needed: values.work_needed,
      waterbody_id: values.waterbody_id,
      workordertype_id: values.work_order_type_id,
      service_date: selectedDate,
      labor_cost: values.labor_cost,
    };
    dispatch(postworkorderData({ Data }));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:");
  };

  const CustomerSelect = (id) => {
    dispatch(fetchgetCustomerServices({ id }));
  };
  const LocationSelect = (ServiceLocationID) => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  };

  useEffect(() => {
    dispatch(fetchgetWorkOrderType({}));
    dispatch(fetchAllgetCustomers());
    dispatch(fetchTechnician());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/work-order");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);
  console.log(waterbody, "<=====waterbody");

  return (
    <Fragment>
      <div className="container-fluid modals fomik addRoute">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <div className="row addWorkOrderPoolModal">
            <div className="col-sm-8">
              <h4>Customer Detail</h4>
              <div className="row ">
                <div className="col-sm-6 myselect">
                  <Form.Item
                    name="work_order_type_id"
                    label="Work Order type"
                    rules={[
                      {
                        required: true,
                        message: "Work Order Type is required",
                      },
                    ]}
                  >
                    <Select placeholder="Work Order Type">
                      {getWorkOrderType?.items?.map((item) => (
                        <Option value={item._id}>{item?.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Customer"
                    name="customer_id"
                    rules={[
                      {
                        required: true,
                        message: "Customer is required",
                      },
                    ]}
                  >
                    <Select placeholder="Customer" onChange={CustomerSelect}>
                      {getCustomer?.items?.map((item, i) => (
                        <Option key={i} value={item?._id}>
                          {item?.first_name + " " + item?.last_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="service_location_id"
                    label="Service Location"
                    rules={[
                      {
                        required: true,
                        message: "Service Location is required",
                      },
                    ]}
                  >
                    <Select
                      onChange={LocationSelect}
                      placeholder="Service Location"
                    >
                      {getCustomerService?.map((item, i) => {
                        return <Option value={item?._id}>{item.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="waterbody_id"
                    label="Pool/Spa"
                    rules={[
                      { required: true, message: "Pool/Spa is required" },
                    ]}
                  >
                    <Select placeholder="Pool/Spa">
                      {waterbody?.map((item, i) => {
                        return <Option value={item?._id}>{item?.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    label="Work Needed"
                    name="work_needed"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      rows={8}
                      showCount
                      maxLength={500}
                      placeholder="work needed"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <h4>Route Assignment Info</h4>
              {waterbody?.map((item) =>
                item.RouteAssignmentWaterBody?.map((elem, index) => (
                  <Card
                    key={index}
                    title={`${elem?.RouteAssignmentTechnician?.first_name} ${elem?.RouteAssignmentTechnician?.last_name}`}
                  >
                    <div className="row">
                      <div className="col-sm-8">
                        <p>
                          {elem?.assigned_date}|{elem?.RouteAssignmentFrequency?.name}{" "}
                        </p>
                      </div>
                      <div className="col-sm-4">
                        <p>
                          {moment(elem.start_date).format("DD/MM/YYYY")}
                          <br />
                          {moment(elem.stop_date).format("DD/MM/YYYY")}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="row midsec">
            <div className="col-sm-3 forFifty">
              <Form.Item
                name="technician_id"
                rules={[{ required: true }]}
                label="Tech Name"
              >
                <Select placeholder="Tech Name">
                  {Technician?.items &&
                    Technician.items?.map((item, i) => {
                      return (
                        <Option value={item._id}>{item.first_name}</Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </div>
            <div className="col-sm-3 forFifty">
              <Form.Item name={["form", "service_date"]} label="Service Date">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()} // Disable past dates (today and beyond)
                  placeholderText="Select Start date"
                />
              </Form.Item>
            </div>
            <div className="col-sm-3 forFifty">
              <Form.Item
                name="estimated_time_minutes"
                rules={[{ required: true }]}
                label="Est Minutes"
              >
                <Input placeholder="Est Minutes" />
              </Form.Item>
            </div>
            <div className="col-sm-3 forFifty">
              <Form.Item name="service_time" label="Scheduled Time (optional)">
                <Input placeholder="Scheduled Time (optional)" />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="labor_cost"
                label="Labor Cost"
                rules={[{ required: true }]}
              >
                <Input placeholder="Labor Cost" type="number" />
              </Form.Item>
            </div>
            <div className="col-sm-4 forFifty">
              <Form.Item
                name="price"
                rules={[{ required: true }]}
                label="Price"
              >
                <Input placeholder="Price" type="number" />
              </Form.Item>
            </div>
            <div className="col-sm-12 submitbtn">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="saaavvveeeBtnnn"
                  loading={loading}
                  disabled={loading}
                >
                  {" "}
                  Save{" "}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default Workorderform;
