import React, { Fragment, useState } from "react";
import { Form, Select, Input, Button, Checkbox, ColorPicker } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updatedTechnicianData,
  resetData,
} from "../../redux/postReducer/postTechnician";
import { toast } from "react-toastify";

const { Option } = Select;
function WorkTypeForm({ state }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState();

  const [is_active, setis_active] = useState(false);
  const [manage_admin_panel, setmanage_admin_panel] = useState(false);
  const [manage_general_settings, setmanage_general_settings] = useState(false);
  const [manage_route_stops, setmanage_route_stops] = useState(false);
  const [rearrange_routes, setrearrange_routes] = useState(false);
  const [see_other_tech, setsee_other_tech] = useState(false);

  console.log(state);

  useEffect(() => {
    setFormData({
      color_code: state?.id?.color_code,
      email: state?.id?.email || "",
      first_name: state?.id?.first_name || "",
      company_address: state?.id?.company_address || "",
      is_active: is_active || "",
      last_name: state?.id?.last_name,
      manage_admin_panel: manage_admin_panel,
      manage_general_settings: manage_general_settings,
      manage_route_stops: manage_route_stops,
      rearrange_routes: rearrange_routes,
      user_type: state?.id?.user_type,
    });
  }, [state]);

  console.log(formData);

  const { data, loading, success, error } = useSelector(
    (state) => state.postTechnician
  );

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };
  const [colorCode, setColorCode] = useState("#000000"); // Initial color
  const handleColorChange = (color) => {
    const metaColor = color.metaColor;
    const hexColor = `#${metaColor.toHex()}`;
    setColorCode(hexColor);
  };

  const [formData1, setFormData1] = useState({
    is_active: false,
    see_other_tech: false,
    manage_admin_panel: false,
    manage_general_settings: false,
    manage_route_stops: false,
    rearrange_routes: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData1({ ...formData1, [name]: checked });
  };

  const handleSelectChange = (value) => {
    if (value === "Admin") {
      const updatedFormData = {};
      for (const key in formData1) {
        updatedFormData[key] = true;
      }
      setFormData1(updatedFormData);
    } else {
      setFormData1({
        is_active: false,
        see_other_tech: false,
        manage_admin_panel: false,
        manage_general_settings: false,
        manage_route_stops: false,
        rearrange_routes: false,
      });
    }
  };

  const id = state?.id?._id;

  const onFinish = async (values) => {
    const Data = {
      color_code: colorCode,
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      user_type:
        values.user_type == undefined ? "Technician" : values.user_type,
      password: values.password,
      is_active: is_active,
      see_other_tech: see_other_tech,
      manage_admin_panel: manage_admin_panel,
      manage_general_settings: manage_general_settings,
      manage_route_stops: manage_route_stops,
      rearrange_routes: rearrange_routes,
    };

    await dispatch(updatedTechnicianData({ id, Data }));
  };

  // Handle successful form submission
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetData());
      navigate("/user");
    }
    if (error) {
      toast.error(error);
      dispatch(resetData());
    }
  }, [error, success]);

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        color_code: state?.id?.color_code,
        email: state?.id?.email || "",
        first_name: state?.id?.first_name || "",
        company_address: state?.id?.company_address || "",
        last_name: state?.id?.last_name,
        manage_admin_panel: state?.id?.manage_admin_panel,
        manage_general_settings: state?.id?.manage_general_settings,
        manage_route_stops: state?.id?.manage_route_stops,
        rearrange_routes: state?.id?.rearrange_routes,
        is_active: state?.id?.is_active || "",
        user_type: state?.id?.user_type,
      });
    }
  }, [state]);

  console.log(formData);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="User"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row">
            <div className="col-sm-12">
              <div className="row editTechnicianFormAdd">
                <div className="col-sm-6">
                  <Form.Item
                    label="First Name"
                    name="first_name"
                    value={formData?.first_name}
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
                    value={formData?.last_name}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
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
                    <ColorPicker
                      showText
                      onChange={handleColorChange}
                      // Pass the current color to the ColorPicker
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    label="Technician"
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
                <div className="col-sm-12">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>
                </div>
                {/* <div className="col-sm-6">
                  <Form.Item name="password" label="Password">
                    <Input type="password" placeholder="Password" />
                  </Form.Item>
                </div> */}

                <div className="col-sm-12 checkBoxxx" style={{ display: "flex" , flexWrap: 'wrap'}}>
                  <Form.Item name="is_active" valuePropName="checked">
                    <Checkbox
                      checked={is_active}
                      onChange={(e) => setis_active(e.target.checked)}
                    >
                      is_active
                    </Checkbox>
                  </Form.Item>

                  <Form.Item name="manage_admin_panel" valuePropName="checked">
                    <Checkbox
                      checked={manage_admin_panel}
                      onChange={(e) => setmanage_admin_panel(e.target.checked)}
                    >
                      manage_admin_panel
                    </Checkbox>
                  </Form.Item>

                  <Form.Item name="see_other_tech" valuePropName="checked">
                    <Checkbox
                      checked={see_other_tech}
                      onChange={(e) => setsee_other_tech(e.target.checked)}
                    >
                      see_other_tech
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    name="manage_general_settings"
                    valuePropName="checked"
                  >
                    <Checkbox
                      checked={manage_general_settings}
                      onChange={(e) =>
                        setmanage_general_settings(e.target.checked)
                      }
                    >
                      manage_general_settings
                    </Checkbox>
                  </Form.Item>

                  <Form.Item name="manage_route_stops" valuePropName="checked">
                    <Checkbox
                      checked={manage_route_stops}
                      onChange={(e) => setmanage_route_stops(e.target.checked)}
                    >
                      manage_route_stops
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 submitbtn workBtn">
            <Form.Item>
              <Button type="primary" htmlType="submit"           disabled={loading}
              loading={loading}>
                {" "}
                Save{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default WorkTypeForm;
