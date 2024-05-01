import React from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Input, Select } from "antd";
import Switch from "antd/lib/switch";
import { useNavigate, useParams } from "react-router-dom"; // Import useHistory

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchgetProductType } from "../../redux/Slices/getProductType";
import {
  postShopinglistData,
  resetData,
  updateShopinglistData,
} from "../../redux/postReducer/postShopingList";
import Autosuggest from "react-autosuggest";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import { fetchSingleitemNeededShoping } from "../../redux/Slices/getItemNeeded";

export default function ShoppingForm() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const [DataShow, setShowData] = useState("inventory");
  const [saveData, setsaveData] = useState("");
  const { data: getProductData, statusdata } = useSelector(
    (state) => state.getProductData
  );
  const { data: getitemNeededData } = useSelector(
    (state) => state.getitemNeededData
  );

  const { data: getCustomerService } = useSelector(
    (state) => state.getCustomerService
  );

  const { data: getCustomer } = useSelector((state) => state.getCustomer);
  const { data: waterbody } = useSelector((state) => state.waterbody);

  const { data, loading, success, error } = useSelector(
    (state) => state.postShopinglist
  );
  const postDataResult = useSelector((state) => state.postShopinglist);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSingleitemNeededShoping({ id }));
  }, [id]);
  useEffect(() => {
    dispatch(fetchgetProductType());
  }, []);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState();

  // Assuming getProductData is from your Redux store

  const getSuggestions = (input) => {
    const filteredSuggestions =
      getProductData &&
      getProductData?.items?.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );

    setSuggestions(filteredSuggestions);
  };

  useEffect(() => {
    setFormData({
      name: getitemNeededData?.name,
      price: getitemNeededData?.price || "",
      quantity: getitemNeededData?.quantity || "",
      description: getitemNeededData?.description || "",
    });
  }, [getitemNeededData]);

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setsaveData(suggestion);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search",
    value,
    onChange,
  };
  const onFinish = async (values) => {
    const Data = {
      name: saveData?.name === undefined ? value : saveData?.name,
      quantity: values.Quantity == undefined ? 1 : values.Quantity,
      description: values.description,
      price: values.price,
      waterbody_id: values?.WaterBody_id,
    };
    await dispatch(updateShopinglistData({ Data, id }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/shopping-list");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  useEffect(() => {
    dispatch(fetchAllgetCustomers());
  }, [dispatch]);

  const CustomerSelect = (id) => {
    dispatch(fetchgetCustomerServices({ id }));
  };
  const LocationSelect = (ServiceLocationID) => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  };

  useEffect(() => {
    setFormData({
      description: saveData?.description || "",
      price: saveData?.price,
    });
  }, [saveData]);
  const handleChangeData = (e) => {
    setShowData(e);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  form.setFieldsValue({
    name: formData?.name,
    price: formData?.price || "",
    quantity: formData?.quantity || "",
    description: formData?.description || "",
  });

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <Fragment>
      {/* <button
        onClick={onFill}
      >
        clickdata
      </button> */}
      <div className="row fomik customer cslocation">
        <Form
          name="Customer"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row">
          <div className="col-sm-12">
            <Form.Item
              name="name"
              label="Item"
              // rules={[
              //   { required: true, message: "Please input name" },
              // ]}
            >
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
                inputProps={inputProps}
              />
            </Form.Item>
          </div>
            <div className="col-sm-6">
              <Form.Item name="Assignto" label="Assign to">
                <Select
                  defaultValue={"inventory"}
                  placeholder="Assign to"
                  onChange={handleChangeData}
                >
                  <Option value="inventory">inventory</Option>
                  <Option value="Customer">Customer</Option>
                </Select>
              </Form.Item>
            </div>

            {DataShow != "inventory" ? (
              <>
                <div className="col-sm-6">
                  <Form.Item name="Assign Customer" label="Select Customer">
                    <Select
                      onChange={CustomerSelect}
                      placeholder="Select Customer"
                    >
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
                <div className="col-sm-6">
                  <Form.Item
                    name="Assign Location"
                    label="Select Service Location"
                  >
                    <Select
                      onChange={LocationSelect}
                      placeholder="Select Location"
                    >
                      {getCustomerService?.map((item, i) => {
                        return <Option value={item?._id}>{item.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item name="WaterBody_id" label="Select WaterBody">
                    <Select placeholder="Select WaterBody">
                      {waterbody?.map((item, i) => {
                        return <Option value={item?._id}>{item?.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="col-sm-6">
              <Form.Item name="description" label="Description">
                <Input placeholder="Part Description" />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="Quantity" label="Quantity">
                <Input placeholder="Quantity" defaultValue={0} />
              </Form.Item>
            </div>
            <div className="col-sm-6">
              <Form.Item name="price" label="Price">
                <Input placeholder="Price" />
              </Form.Item>
            </div>

            {/* <ShoppingImageUpload /> */}
            {/* <ShoppingSlider /> */}

            <div className="col-sm-12 savebtn editShoppingFormSaveBtn">
              <Form.Item>
                <Button
                  loading={loading}
                  disabled={loading}
                  className="yellowbtn"
                  type="primary"
                  htmlType="submit"
                >
                  {" "}
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}
