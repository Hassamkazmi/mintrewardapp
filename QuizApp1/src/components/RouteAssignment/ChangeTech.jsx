import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio, DatePicker } from "antd";
import { postwaterbodyData } from "../../redux/postReducer/postWaterbody";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchgetfrequency } from "../../redux/Slices/getfrequency";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import {
  ChangerouteAssignmwntTech,
  UpdaterouteAssignmwnt,
  postrouteAssignmentData,
  resetData,
} from "../../redux/postReducer/postRouteAssignment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";
import moment from "moment";

const { Option } = Select;

const AddRouteForm = ({ data1 }) => {

  const [formData, setFormData] = useState({
    Pools: [{ name: "" }],
  });
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const { data: Technician } = useSelector((state) => state.Technician);
  const postfrequency = useSelector((state) => state.getfrequency);
  const postrouteAssignment = useSelector((state) => state.postrouteAssignment);

  const date1 = new Date();
  const [date , setDate] = useState(date1)


    const [technician_id, setTechId] = useState("");
  const active_service_id = data1.active_service_id._id;


  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }

    if (postfrequency?.data?.length === 0) {
      dispatch(fetchgetfrequency());
    }
  }, [dispatch]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  const handleDateChange = (date,day) => {
    setSelectedDate(day);
  };

  const onFinish = async (values, key) => {
    const Data = {
      technician_id: values.technician_id,
      start_date: selectedDate,
      assigned_date: moment(selectedDate).format('dddd'),
    };
    await dispatch(ChangerouteAssignmwntTech({ active_service_id, Data }));
  };

  useEffect(() => {
    if (postrouteAssignment && postrouteAssignment.data) {
      form.resetFields();
      toast.success("Form submitted successfully !");
      dispatch(resetData());
      let date = localStorage.getItem("date")

      dispatch(fetchactiveServicedashboard({ date, technician_id }));

      data1.handleClose();
    }
  }, [postrouteAssignment.data]);

  useEffect(() => {
    if (postrouteAssignment && postrouteAssignment?.error) {
      const err = postrouteAssignment.error;
      toast.error(err);
    }
  }, [postrouteAssignment.error]);


  return (
    <div className="row fomik addRoute">
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        form={form}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={formData}
      >
        <>
          <div className="row">
            <div className="col-sm-12 heads">
              <h3>Change Tech/Date</h3>
            </div>

            <div className="col-sm-6">
              <Form.Item name="technician_id" label="Technician">
                <Select placeholder="Tech">
                  {Technician?.items &&
                    Technician.items?.map((item, i) => {
                      return <Option value={item._id}>{item.first_name}</Option>;
                    })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <Form.Item name={[name, "Assign Date"]} label="Assign Date">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  // minDate={new Date()}
                  // dateFormat="yyyy-mm-dd"
                  placeholderText="Assign Date"
                />

                
              </Form.Item>
            </div>

            <div className="col-sm-12 buttonsservice">
              <Form.Item className="savebtn">
                <Button className="yellowbtn submitButton" htmlType="submit">
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
