import React, { Fragment , useEffect , useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { UpdateserviceCheckListData } from "../../redux/postReducer/postServiceCheckList";
import { useDispatch } from "react-redux";
import {
  fetchgetCheckListAll,
  fetchgetserviceCheckList,
  fetchgetserviceCheckListAll,
} from "../../redux/Slices/getserviceCheckList";

function ServiceListModal({ data1 }) {
  const dispatch = useDispatch();

  const checklist_id = data1?.Edit?._id;
  const [form] = Form.useForm();

  const [formData, setFormData] = useState();

  useEffect(() => {
    setFormData({
      Description: data1?.Edit?.Description,
      DescriptionOnComplete: data1?.Edit?.DescriptionOnComplete || "",
      type: data1?.Edit?.type || "",
    });
  }, [data1]);

  const currentPage = 1;

  /* eslint-enable no-template-curly-in-string */
  const onFinish = async (values) => {
    await dispatch(UpdateserviceCheckListData({ values, checklist_id }));
    dispatch(fetchgetCheckListAll({ currentPage }));
    data1.handleCloseEdit();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  form.setFieldsValue({
    Description: formData?.Description,
    DescriptionOnComplete: formData?.DescriptionOnComplete || "",
    type: formData?.type || "",
    waterbody_id: formData?.waterbody_id || "",
  });

  return (
    <Fragment>
      <div className="container-fluid modals">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // onValuesChange={handleFormValuesChange}
          form={form}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row">
            <div className="col-sm-12">
              <h4>Service Check lists</h4>
              <div className="row myselect">
                <div className="col-sm-12">
                  <Form.Item
                    name="type"
                    type="hidden"
                    style={{ display: "none" }}
                    initialValue={"specific"}
                    // rules={[{ required: true }]}
                  >
                    <Input placeholder="List Type" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="Description"
                    rules={[
                      {
                        required: true,
                        message: "Service Description is required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Description"
                      showCount
                      maxLength={500}
                      rows={10}
                    />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    name="DescriptionOnComplete"
                    rules={[
                      {
                        required: true,
                        message: "Service Description on Complete is required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      placeholder="Description on Complete"
                      showCount
                      maxLength={500}
                      rows={10}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <Form.Item>
            <div className="col-sm-12 savebtn editShoppingFormSaveBtn">
              <Button type="primary" htmlType="submit">
                {" "}
                Save{" "}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
}

export default ServiceListModal;
