import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, Radio } from "antd";
import { FaLock } from "react-icons/fa";
import PlacesAutocomplete from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchpackagesData } from "../../redux/Slices/getPackages";
import {
  postRegistrationData,
  resetData,
} from "../../redux/postReducer/PostRegistration";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetAllCity } from "../../redux/Slices/getCustomerCity";

const { Option } = Select;
const { Item } = Form;
const Registration = ({ data }) => {
  const [address, setAddress] = useState("");

  const { data: packagesData, statusdata } = useSelector(
    (state) => state.packagesData
  );

  const postDataResult = useSelector((state) => state.postRegistration);

  const { data: getCustomerCity } = useSelector(
    (state) => state.getCustomerCity
  );

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSearch = (value) => {
    // Fetch city data based on the search query
    dispatch(fetchgetAllCity(value));

    // Update the state with the fetched city data
    // Example: setCustomerCity(cityData);
  };

  useEffect(() => {
    dispatch(fetchpackagesData());
    dispatch(fetchgetAllCity());
  }, [dispatch]);

  const CustomerRange = [
    {
      id: "1",
      value: "0-49",
    },
    {
      id: "1",
      value: "50-99",
    },
    {
      id: "1",
      value: "100-249",
    },
    {
      id: "1",
      value: "250-499",
    },
    {
      id: "1",
      value: "500-10000",
    },
  ];

  const onFinish = async (values, key) => {
    try {
      const storeValue = values;
      const valuesArray = storeValue?.Range
        ? storeValue?.Range?.split("-")
        : ["0", "49"];
      const customerRange1 = valuesArray[0];
      const customerRange2 = valuesArray[1];
      const data = new FormData();
      data.append("FirstName", storeValue?.FirstName);
      data.append("LastName", storeValue?.LastName);
      data.append("Company", storeValue?.Company);
      data.append("Address", address);
      data.append("Email", storeValue?.Email);
      data.append("Mobile", storeValue?.Mobile);
      data.append("city_id", storeValue?.city_id);
      data.append("Zip", storeValue?.Zip);
      data.append("Name", storeValue?.Name);
      data.append("password", storeValue?.password);
      data.append("CustomerRange1", customerRange1);
      data.append("CustomerRange2", customerRange2);
      data.append("image", storeValue?.image[0]);
      data.append("packageId", packagesData?._id);
      // Call createUser and wait for it to complete
      await dispatch(postRegistrationData({ data }));
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  useEffect(() => {
    if (postDataResult.data) {
      // form.resetFields();
      toast.success("Form submitted successfully!");
      dispatch(resetData());
      navigate("/account/payment", {
        state: {
          client_secret: postDataResult,
        },
      });
    }
  }, [postDataResult.data, form, navigate]);

  useEffect(() => {
    if (postDataResult.error) {
      const err = postDataResult.error;
      toast.error(err);
    }
  }, [postDataResult.error, form]);
  console.log(postDataResult);

  const onFinishFailed = (errorInfo) => {};
  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const normFile = ({ fileList }) => {
    return fileList.map((file) => file.originFileObj);
  };

  return (
    <div className="row fomik addRoute registerForm">
      <h3 className="main-h1">
        Step 1: Account Information <FaLock />
      </h3>

      <Form
        className="login-form"
        name="Customer"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row cslocation">
          <div className="col-sm-6">
            <Form.Item
              name="FirstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please input First Name!",
                },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="LastName"
              label="Last Name"
              rules={[{ required: true, message: "Please input Last Name!" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Name"
              label="User Name"
              rules={[{ required: true, message: "Please input User Name!" }]}
            >
              <Input placeholder="User Name" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input Password!",
                },
              ]}
            >
              <Input.Password type="password" placeholder="Password" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item name="Company" label="Company">
              <Input placeholder="Company" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input Address!",
                },
              ]}
            >
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={data}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <Input
                      {...getInputProps({ placeholder: "Enter Address" })}
                    />
                    <div className="address-suggestion">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const style = {
                          backgroundColor: suggestion.active
                            ? "#41b6e6"
                            : "#fff",
                        };
                        return (
                          <div
                            key={suggestion.placeId}
                            {...getSuggestionItemProps(suggestion, {
                              style,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </Form.Item>
          </div>
          <div className="col-sm-12">
            <Form.Item
              name="Range"
              label="What is the average number of customers you service in a month?"
              rules={[
                {
                  required: true,
                  message:
                    "What is the average number of customers you service in a month?!",
                },
              ]}
            >
              <Select placeholder="Customer Range">
                {CustomerRange?.map((item, i) => {
                  return <Option value={item?.value}>{item?.value}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Email"
              label="Email"
              rules={[{ required: true, message: "Please input Email!" }]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Mobile"
              label="Mobile Phone"
              rules={[
                { required: true, message: "Please input Mobile Phone!" },
              ]}
            >
              <Input placeholder="Mobile Phone" />
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="city_id"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input City!",
                },
              ]}
            >
              <Select
                placeholder="City"
                showSearch
                filterOption={filterOption}
                onSearch={onSearch}
              >
                {getCustomerCity?.map((item, i) => {
                  return <Option value={item?._id}>{item?.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </div>

          <div className="col-sm-6">
            <Form.Item
              name="Zip"
              label="Zip"
              rules={[
                {
                  required: true,
                  message: "Please input Zip!",
                },
              ]}
            >
              <Input placeholder="Zip" />
            </Form.Item>
          </div>
          <div className="col-sm-9 imageUploader">
            <Form.Item
              name="image"
              // label="Profile Picture"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="logo"
                beforeUpload={() => false}
                action="/upload.do"
                listType="picture"
                accept="image/*, audio/*"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>
                  Click to Select Media File
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div className="col-sm-12 loginBtn">
            <Form.Item>
              <Button className="nextbtn" type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
