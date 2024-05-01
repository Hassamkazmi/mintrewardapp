import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";

import Checkbox from "antd/es/checkbox/Checkbox";
import { toast } from "react-toastify";
import { DeleteFilled } from "@ant-design/icons";
import { postdosagesData , resetData} from "../../redux/postReducer/postDosages";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchgetAlldosage } from "../../redux/Slices/getAllDosages";


const { Option } = Select;

const AddDosageForm = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const navigate = useNavigate();
  // const postDataResult = useSelector((state) => state.postdosages);
  const { success, error, loading } = useSelector((state) => state.postdosages);
  const [dossageValue, setDossageValue] = useState([]);
  const [mapValue, setMapValue] = useState([]);
  const [form] = Form.useForm();
  const [includeServicePrice, setIncludeServicePrice] = useState(false);

  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    setIncludeServicePrice(e.target.checked);
  };

  const handleValues = () => {
    if (!dossageValue) {
      // If the dosageValue is empty, clear it
      setDossageValue("");
    } else {
      // Check if the dosageValue is a valid number
      const numericValue = parseFloat(dossageValue);
      if (!isNaN(numericValue)) {
        // If it's a valid number, add it to the mapValue array
        setMapValue([...mapValue, numericValue]);
      }
      // Clear the dosageValue in any case
      setDossageValue("");
    }
  };
  const deleteItems = (id) => {
    const updateItems = mapValue.filter((elem, ind) => {
      return ind !== id;
    });
    setMapValue(updateItems);
  };

  const Remove = () => {
    setitems([]);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const onFinish = async (values, key) => {
    const Data = {
      name: values.name,
      description: values.description,
      unit_of_measurement: values.unit_of_measurement,
      cost_per_unit: values.cost_per_unit,
      include_service_price: includeServicePrice,
      price_per_unit: values.price_per_unit,
      values: mapValue,
    };
    await dispatch(postdosagesData({ Data }));
    dispatch(resetData());
    dispatch(fetchgetAlldosage({}));
    // navigate("/dosages");
  };

  useEffect(() => {
    if (success) {
      form.resetFields();
      toast.success(success);
      dispatch(resetData());
      navigate("/dosages");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error]);

  return (
    <Form
      name="Customer"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
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

            <div className="col-sm-12">
              <Form.Item
                name="cost_per_unit"
                label="Cost/Uom"
                rules={[
                  { required: true, message: "Please input your Cost UOM!" },
                ]}
              >
                <Input placeholder="Cost/UOM" type="number" />
              </Form.Item>
            </div>

            <div className="col-sm-12">
              <Form.Item
                name="price_per_unit"
                label="Price/Uom"
                rules={[
                  { required: true, message: "Please input your Price UOM!" },
                ]}
              >
                <Input
                  placeholder="Price/UOM"
                  rules={[
                    { required: true, message: "Please Add  Price Uom!" },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="col-sm-12" style={{ marginTop: "30px" }}>
              <Form.Item
                name="include_service_price"
                rules={[{ required: true, message: "Include service Price?" }]}
              >
                <Input
                  readOnly
                  placeholder="Include service Price?"
                  defaultValue={"Include service Price?"}
                />
              </Form.Item>
            </div>
            <div className="col-sm-0 valueForm3">
              <Form.Item name="include_service_price">
                <span>
                  <Checkbox
                    checked={includeServicePrice}
                    onChange={handleCheckboxChange}
                  />
                </span>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="col-sm-6 adddDosagesss edddittDosaaaggeess">
          {/* // style={{ height: "650px" }} */}
          <div className="row">
            <div className="col-sm-11">
              <Form.Item label="Values" rules={[{ required: true }]}>
                <Input
                  type="number"
                  value={dossageValue}
                  onChange={(e) => setDossageValue(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className="col-sm-1 valuesBtnnnn">
              <Button
                onClick={handleValues}
                className="yellowbtn valuesBtnnnnYellow"
                // type="primary"
                // htmlType="submit"
                disabled={loading}
              >
                Add
              </Button>
            </div>

            {mapValue.length > 0 && (
              <div className="container-fluid wordkorder valuesListing">
                {mapValue?.map((e, i) => (
                  <div className="row">
                    <div className="col-sm-10">
                      <Form.Item>
                        <Checkbox>{e}</Checkbox>
                      </Form.Item>
                    </div>
                    <div className="col-sm-2">
                      <p>
                        {" "}
                        <DeleteFilled onClick={() => deleteItems(i)} />
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
              Save Dosages
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default AddDosageForm;
