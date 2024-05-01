import React, { useRef, useState, Fragment } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { Form, Select, Input, Button, Checkbox, ColorPicker } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postTechnicianData,
  resetData,
} from "../../redux/postReducer/postTechnician";
import { toast } from "react-toastify";

const { Option } = Select;
const { Item } = Form;

function AddTechnicianForm() {
  const form = Form.useForm()[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, success, error } = useSelector(
    (state) => state.postTechnician
  );
 
  const [colorCode, setColorCode] = useState("#000000"); // Initial color
  const [formData, setFormData] = useState({
    is_active: false,
    see_other_tech: false,
    manage_admin_panel: false,
    manage_general_settings: false,
    manage_route_stops: false,
    rearrange_routes: false,
  });

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const handleColorChange = (color) => {
    const metaColor = color.metaColor;
    const hexColor = `#${metaColor.toHex()}`;
    setColorCode(hexColor);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSelectChange = (value) => {
    if (value === "Admin") {
      const updatedFormData = {};
      for (const key in formData) {
        updatedFormData[key] = true;
      }
      setFormData(updatedFormData);
    } else {
      setFormData({
        is_active: false,
        see_other_tech: false,
        manage_admin_panel: false,
        manage_general_settings: false,
        manage_route_stops: false,
        rearrange_routes: false,
      });
    }
  };

  const onFinish = async (values) => {
    const Data = {
      color_code: colorCode,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      longitude: coordinates?.lng.toString(),
      latitude: coordinates?.lat.toString(),
      user_type:
        values.user_type == undefined ? "Technician" : values.user_type,
      password: values.password,
      is_active: formData.is_active,
      see_other_tech: formData.see_other_tech,
      manage_admin_panel: formData.manage_admin_panel,
      manage_general_settings: formData.manage_general_settings,
      manage_route_stops: formData.manage_route_stops,
      rearrange_routes: formData.rearrange_routes,
    };
    await dispatch(postTechnicianData({ Data }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

useEffect(()=>{
if(success){
  toast.success(success)
dispatch(resetData())
navigate("/user")


}
if(error){
  toast.error(error)
dispatch(resetData())


}




},[error,success])



  return (
    <Fragment>
      <div className="container-fluid modals addTechnicianFormmmss">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="row">
            <div className="col-sm-12">
              <div className="row editTechnicianFormAdd">
                <div className="col-sm-6">
                  <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <div>
                    <PlacesAutocomplete
                      value={address}
                      onChange={setAddress}
                      onSelect={handleSelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                      }) => (
                        <div>
                          <Item label="Location" name="location">
                            <Input
                              {...getInputProps({
                                placeholder: "Enter Address",
                              })}
                            />
                            <div>
                              {/* {loading && <div>Loading...</div>} */}
                              {suggestions?.map((suggestion) => {
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
                          </Item>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                </div>
                <div className="col-sm-6 colorPicker">
                  <Form.Item
                    label="Color Code"
                    name="color_code"
                    initialValue={colorCode}
                    rules={[
                      { required: true, message: "Color Code is required" },
                    ]}
                  >
                    <ColorPicker showText onChange={handleColorChange} />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    label="User Type"
                    name="user_type"
                    // rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Role"
                      defaultValue="Technician"
                      onChange={handleSelectChange}
                    >
                      <Select.Option value="Technician">
                        Technician
                      </Select.Option>
                      <Select.Option value="Admin">Admin</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>
                </div>
                <div className="col-sm-6 password">
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Please enter your password" },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                    label="Password"
                  >
                    <Input.Password type="password" placeholder="Password" />
                  </Form.Item>
                </div>

                <div className="col-sm-12 checkBoxxx">
                  <Form.Item>
                    <Checkbox
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleCheckboxChange}
                    >
                      is active
                    </Checkbox>
                    <Checkbox
                      name="see_other_tech"
                      checked={formData.see_other_tech}
                      onChange={handleCheckboxChange}
                    >
                      see other tech
                    </Checkbox>
                    <Checkbox
                      name="manage_admin_panel"
                      checked={formData.manage_admin_panel}
                      onChange={handleCheckboxChange}
                    >
                      manage admin panel
                    </Checkbox>
                    <Checkbox
                      name="manage_general_settings"
                      checked={formData.manage_general_settings}
                      onChange={handleCheckboxChange}
                    >
                      manage general settings
                    </Checkbox>
                    <Checkbox
                      name="manage_route_stops"
                      checked={formData.manage_route_stops}
                      onChange={handleCheckboxChange}
                    >
                      manage route stops
                    </Checkbox>
                    <Checkbox
                      name="rearrange_routes"
                      checked={formData.rearrange_routes}
                      onChange={handleCheckboxChange}
                    >
                      rearrange routes
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 submitbtn workBtn techlnglat">
            <Form.Item>
              <Button type="primary" htmlType="submit"           disabled={loading}
              loading={loading}>
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default AddTechnicianForm;
