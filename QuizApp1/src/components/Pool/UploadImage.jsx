import React, { Fragment, useState , useEffect } from "react";
import Trash from "../../assets/img/Trash.png";
import Create from "../../assets/img/Create.png";
import Previewslider from "./Previewslider";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Upload, Form, Input } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { postwaterbodyImagesData , clearData } from "../../redux/postReducer/postPoolImages";
import { useDispatch } from "react-redux";
import { fetchwaterbodyImage } from "../../redux/Slices/getpoolImages";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
export default function UploadImage({data}) {


  const { success, error } = useSelector((state) => state.postwaterbodyImages);

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [Descroption, setDescroption] = useState("");
  const [image, setimage] = useState("");

  const waterbody_id = data?._id;

  const handleUpload = async () => {

    const data = {
      file: image,
      description: Descroption,
    };
    const formData = new FormData();
    formData.append("Description", Descroption);
    // formData.append("type", "image");
    formData.append("image", image);

  //   for (const key in image) {
  //     formData.append("file", image[key]);
  // }

    await dispatch(postwaterbodyImagesData({formData,waterbody_id}));

    dispatch(fetchwaterbodyImage({waterbody_id}))
  };


  useEffect(() => {
    if (success) {
      form.resetFields();
      toast.success("Data Submitted Successfully ");
      dispatch(clearData());
      // navigate("/dosages");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearData());
    }
  }, [error]);
  const handleChange = (e) => {
    setDescroption(e.target.value);
  };


  const handleIamge = (e) => {
    setimage(e.file);
  };






  return (
    <Fragment>
      <div className="container-fluid wordkorder">
        <div className="row headwork">
          <div className="col-sm-6 heads">
            <h3>Images</h3>
          </div>
        </div>
        <div className="row uploadImagePoOOLll">
          <div className="col-sm-6">
            <Form.Item
              name="desc"
              rules={[
                {
                  required: true,
                  message: "Please input your Description!",
                },
              ]}
            >
              <Input onChange={handleChange} placeholder="Image Description" />
            </Form.Item>
          </div>
          <div className="col-sm-6 uploadImageeePoolAccordion">
            <Upload
              beforeUpload={() => false}
              onChange={handleIamge}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </div>
        </div>
        <div className="col-sm-12 uploadImageeePoolAccordionBtn">
        <Button type="primary" onClick={handleUpload}>
          Upload
        </Button>
        </div>
      </div>
    </Fragment>
  );
}
