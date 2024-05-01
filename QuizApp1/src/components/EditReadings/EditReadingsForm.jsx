import React, { useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";

import Checkbox from "antd/es/checkbox/Checkbox";
import { DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { DeleteSingleReadingDataData, updateReadings , resetData } from "../../redux/postReducer/postReadingData";

const EditReadingsForm = ({ state }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [readingSingleValue, setReadingSingleValue] = useState([]);
  const [readingValues, setReadingValues] = useState([]);
  const [readingValuesNew, setReadingValuesNew] = useState([]);

  const { success, error, loading } = useSelector((state) => state.postReading);

  const [formData1, setFormData1] = useState({});

  useEffect(() => {
    setFormData1({
      name: state?.id?.name || "",
      price_per_unit: state?.id?.price_per_unit || "",
      unit_of_measurement: state?.id?.unit_of_measurement || "",
    });
  }, [state]);

  const handleValues = () => {
    if (!readingSingleValue) {
      // If readingSingleValue is empty, clear it
    } else {
      // Convert readingSingleValue to a numeric value
      const numericValue = parseInt(readingSingleValue);

      // Check if the conversion is successful and the result is not NaN
      if (!isNaN(numericValue)) {
        // Create a new object with the current numeric value
        const newObject = { values: numericValue };

        const newReading = numericValue;
        // Set readingValues array by preserving existing values and adding the new object
        setReadingValues([...readingValues, newObject]);
        setReadingValuesNew([...readingValuesNew, newReading]);
      }

      // Clear readingSingleValue
      setReadingSingleValue(""); // Reset the value to an empty string
    }
  };

  const deleteItems = async (id) => {
    await dispatch(DeleteSingleReadingDataData({ id }));
    const updateItems = readingValues.filter((elem, ind) => {
      return elem._id !== id;
    });
    setReadingValues(updateItems);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };
  const id = state?.id?._id;

  const onFinish = async (values, key) => {
    const Data = {
      name: values.name,
      unit_of_measurement: values.unit_of_measurement,
      values: readingValuesNew,
    };
    await dispatch(updateReadings({ id, Data }));
    navigate("/readings");
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [success, error]);
  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData1(allValues);
  };
  form.setFieldsValue({
    cost_per_unit: formData1?.cost_per_unit,
    name: formData1?.name || "",
    price_per_unit: formData1?.price_per_unit || "",
    unit_of_measurement: formData1?.unit_of_measurement || "",
    include_service_price: formData1?.include_service_price || "",
    include_with_service: formData1?.include_with_service,
  });

  useEffect(() => {
    setReadingValues(state?.id?.ReadingValuesData);
  }, []);

  return (
    <Form
      name="Customer"
      onValuesChange={handleFormValuesChange}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={formData1}
    >
      <div className="row fomik addRoute accccc">
        <div className="col-sm-6 edddittDosaaaggeess">
          <div className="row">
            <div className="col-sm-12">
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </div>

            <div className="col-sm-12">
              <Form.Item
                name="unit_of_measurement"
                label="Uom"
                rules={[{ required: true, message: "Please input your Uom!" }]}
              >
                <Input placeholder="UOM" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="col-sm-6 adddDosagesss edddittDosaaaggeess">
          <div className="row">
            <div className="col-sm-10">
              <Form.Item label="Values" className="valuesBtnnnnY">
                <Input
                  type="number"
                  value={readingSingleValue}
                  onChange={(e) => setReadingSingleValue(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="col-sm-1 valuesBtnnnn">
              <Button
                onClick={handleValues}
                className="yellowbtn valuesBtnnnnYellow"
                // type="primary"
                // htmlType="submit"
              >
                Add
              </Button>
            </div>

            {readingValues?.length > 0 && (
              <div className="container-fluid wordkorder valuesListing">
                {readingValues?.map((item, i) => (
                  <div className="row cslocation">
                    <div className="col-sm-10">
                      <Form.Item>
                        <Checkbox>{item.values}</Checkbox>
                      </Form.Item>
                    </div>
                    <div className="col-sm-2">
                      <p>
                        {" "}
                        <DeleteFilled onClick={() => deleteItems(item._id)} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-sm-12 savebtn addDosageBtn">
          <Form.Item>
            <Button
              className="yellowbtn"
              type="primary"
              htmlType="submit"
              disabled={loading}
              loading={loading}
            >
              Save Readings
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default EditReadingsForm;
