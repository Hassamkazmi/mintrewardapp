import React, { useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postSalesTaxGroupPostData } from "../../redux/postReducer/postSalesTaxGroup";
import { fetchSalesTaxGroup } from "../../redux/Slices/getSaleGroup";

const TaxGroupForm = ({ data }) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const { data: SalesTax, status } = useSelector((state) => state.SalesTax);

  const [selectedIds, setSelectedIds] = useState([]);
  const [totalRate, setTotalRate] = useState(0);

  const handleCheckboxChange = (id, rate, checked) => {
    let newSelectedIds;

    if (checked) {
      newSelectedIds = [...selectedIds, id];
    } else {
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    }

    setSelectedIds(newSelectedIds);

    // Calculate total rate for selected items
    const newTotalRate = newSelectedIds.reduce((acc, selectedId) => {
      const selectedItem = SalesTax.items?.find(
        (item) => item._id === selectedId
      );
      return acc + (selectedItem ? selectedItem.Rate : 0);
    }, 0);

    setTotalRate(newTotalRate);
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  const onFinish = async (id, key) => {
    const values = {
      SalesTaxGroupName: id.name,
      SalesTaxGroup: selectedIds,
    };
    await dispatch(postSalesTaxGroupPostData({ values }));
    dispatch(fetchSalesTaxGroup({}));
    data();
  };

  return (
    <div className="row fomik addRoute taxratee">
      <Form
        name="Customer"
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFinish={onFinish}
      >
        <div className="row">
          <div className="col-sm-12">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input Name!" }]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </div>
          <div className="col-sm-12">
            <p className="selectrateinput"> Select Rate</p>
          </div>
          <div className="col-sm-6 workOrderSettingggss">
            {SalesTax?.items?.map((item, i) => (
              <Form.Item name={item._id} valuePropName="checked" key={i}>
                <Checkbox
                  onChange={(e) =>
                    handleCheckboxChange(item._id, item.Rate, e.target.checked)
                  }
                >
                  {item.name} ({item.Rate}%)
                </Checkbox>
              </Form.Item>
            ))}
          </div>

          <div className="col-sm-12">
            <p className="selectrateinput">Total Combined Rate: {totalRate}</p>
          </div>
          <div className="col-sm-12 savebtn addProductType">
            <Form.Item>
              <Button className="yellowbtn" type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default TaxGroupForm;
