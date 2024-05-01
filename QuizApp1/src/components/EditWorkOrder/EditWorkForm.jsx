import React, { Fragment, useEffect, useState } from "react";
import { Form, Select, Input, Button, Space, Upload, Card, Tag } from "antd";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Previewslides } from "../../Data/Data";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import {
  UpdateWorkOrder,
  UpdateWorkOrderData,
} from "../../redux/postReducer/postWorkorder";
import { fetchgetWorkOrderType } from "../../redux/Slices/getWorkOrderType";
import { fetchAllgetCustomers } from "../../redux/Slices/getCustomer";
import { fetchTechnician } from "../../redux/Slices/GetTechnician";
import { fetchwaterbody } from "../../redux/Slices/getWaterBody";
import { fetchsinglewaterbody } from "../../redux/Slices/getSingleWaterBody";

const { Option } = Select;
function EditWorkForm({ state }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();
  const [serviceDate, setServiceDate] = useState(null);

  const [formData, setFormData] = useState();
  const { data: Technician } = useSelector((state) => state.Technician);
  const { data: singlewaterbody } = useSelector(
    (state) => state.singlewaterbody
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    const Data = {
      id: id,
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
      work_order_type_id: values.work_order_type_id,
      service_date: formData?.service_date,
      labor_cost: values.labor_cost,
    };

    // await dispatch(UpdateWorkOrderData({ Data }));
  };

  const handleServiceDateChange = (date) => {
    setServiceDate(date);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (state) {
      form.setFieldsValue({
        technician_id: state?.technician_id,
        service_time: state?.service_time,
        work_performed: state?.work_performed,
        service_location_id: state?.service_location_id,
        customer_id: state?.customer_id,
        estimated_time_minutes: state?.estimated_time_minutes,
        status: "active",

        price: state?.price,
        work_needed: state?.work_needed,
        waterbody_id: state?.waterbody_id,
        work_order_type_id: state?.work_order_type_id,
        // service_date: selectedDate,
        labor_cost: state?.labor_cost,
      });

      // setIsTaxable(state?.id?.line_item_price_taxable);
    }
  }, [state]);
  useEffect(() => {
    dispatch(fetchgetWorkOrderType({}));
    dispatch(fetchAllgetCustomers());
    dispatch(fetchTechnician());
  }, [dispatch]);

  useEffect(() => {
    const id = state?.Waterbody?.waterbody_id;

    dispatch(fetchsinglewaterbody({ id }));
  }, []);

  return (
    <Fragment>
      <div className="container-fluid modals fomik addRoute">
        <Form
          name="Customer"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row">
            <div className="col-sm-8">
              <div className="repairSection">
                <button className="bluebtn">REPAIR</button>
                <div>
                  <h6>UNPAID</h6>
                </div>
              </div>

              <p className="addedP">
                Added By :
                <Tag>
                  <span> Muhammad Faiz Raza </span>
                </Tag>
              </p>

              <div className="row myselect">
                <div className="col-sm-12">
                  <Form.Item
                    name="work_needed"
                    label="Work Needed"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      rows={8}
                      showCount
                      maxLength={500}
                      placeholder="Work Needed"
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-12">
                  <Form.Item
                    name="work_performed"
                    label="Work Performed"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      showCount
                      rows={8}
                      maxLength={500}
                      placeholder="Work Performed"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <h4>Customer Info</h4>
              {state?.customer && (
                <Card
                  title={
                    state?.customer?.first_name +
                    " " +
                    state?.customer?.last_name
                  }
                >
                  <div className="row">
                    <div className="col-sm-12 ccuusssttinfffooo">
                      <p>{state?.customer?.address}</p>

                      <p>{state?.customer?.mobile_no_primary} - mobile</p>

                      <p>{state?.Waterbody?.name} </p>

                      <p>{state?.customer?.mobile_no_primary} - mobile</p>

                      <p>{state?.customer?.email}</p>
                    </div>
                  </div>
                </Card>
              )}

              <h4>Route Assignment Info</h4>
              <Card title={singlewaterbody?.name}>
                <div className="row">
                  {singlewaterbody?.Service?.map((data, i) => (
                    <>
                      <div className="col-sm-8 ccuusssttinfffooo">
                        <p>
                          {data.assigned_day}|{data.Frequency.name}{" "}
                        </p>
                      </div>
                      <div className="col-sm-4">
                        <p>2/2/23 No End</p>
                      </div>
                    </>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <h4>Technician Details</h4>
              <div className="row ">
                <div className="col-sm-6">
                  <Form.Item
                    label="Technician Name"
                    name="technician_id"
                    // initialValue={getSingleWorkOrder.Technician?.first_name}
                    rules={[
                      { required: true, message: "Tech Name  is required" },
                    ]}
                  >
                    <Select placeholder="Tech Name">
                      {Technician?.items &&
                        Technician.items?.map((item, i) => {
                          return (
                            <Option value={item.id}>{item.first_name}</Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item name={[name, "service_date"]} label="Service date">
                    <DatePicker
                      selected={serviceDate}
                      onChange={handleServiceDateChange}
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select Service date"
                    />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    name="estimated_time_minutes"
                    label="Est. Minutes"
                    rules={[
                      { required: true, message: "Est. Minutes is required" },
                    ]}
                  >
                    <Input placeholder="Est. Minutes" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="service_time"
                    label="Scheduled Time (optional)"
                  >
                    <Input placeholder="Scheduled Time (optional)" />{" "}
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    name="labor_cost"
                    label="Labor Cost"
                    rules={[
                      { required: true, message: "Labor Cost is required" },
                    ]}
                  >
                    <Input placeholder="Labor Cost" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: "Price is required" }]}
                  >
                    <Input placeholder="Price" />
                  </Form.Item>
                </div>
                <div className="col-sm-12">
                  <Form.Item name="" label="Notes">
                    <Input.TextArea
                      showCount
                      maxLength={100}
                      placeholder="Notes"
                      rows={4}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-8">
              <div className="container-fluid wordkorder">
                <div className="row headwork">
                  <div className="col-sm-8">
                    <h3>Items Used </h3>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="row fomik dynamic_form_nest_item">
                    <Form.List
                      name="recurringwork"
                      initialValue={[{ filterclean: "" }]}
                    >
                      {(fields, { add, remove }) => (
                        <>
                          <div className="row workaddbtn">
                            <div className="col-sm-6 btns">
                              <Form.Item>
                                <Button className="wbtn" onClick={() => add()}>
                                  {" "}
                                  + Add New
                                </Button>
                              </Form.Item>
                            </div>
                          </div>

                          {fields.map(({ key = [20], name, ...restField }) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <div className="row slignc grey">
                                <div className="col-sm-10">
                                  <Form.Item
                                    {...restField}
                                    name={[name, "filterclean1"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing Filter Clean",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Acid" />
                                  </Form.Item>
                                </div>

                                <div className="col-sm-1 editWO_iconnn1">
                                  <button
                                    className="wbtn"
                                    onClick={() => remove(name)}
                                  >
                                    <img src={Create} />
                                  </button>
                                </div>

                                <div className="col-sm-1 editWO_iconnn2">
                                  <button
                                    className="wbtn"
                                    onClick={() => remove(name)}
                                  >
                                    <img src={Trash} />
                                  </button>
                                </div>
                              </div>
                            </Space>
                          ))}
                        </>
                      )}
                    </Form.List>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="col-sm-4">
              <div className="container-fluid wordkorder preview workSlider">
                <div className="container-fluid">
                  <div className="row headwork">
                    <div className="col-sm-12 heads">
                      <h3>Images</h3>
                    </div>

                    <Form.Item
                      name="upload"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                    >
                      <Upload
                        name="logo"
                        action="/upload.do"
                        listType="picture-circle"
                      >
                        <Button icon={<UploadOutlined />} className="uplbtnnnn">
                          Click to upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={50}
                  loop={true}
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper"
                >
                  {Previewslides.map((data) => {
                    return (
                      <SwiperSlide key={data.key}>
                        <img src={data.image} alt="Preview" />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-sm-12 submitbtn workBtn">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="saaavvveeeBtnnn"
              >
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

export default EditWorkForm;
