import { Select } from "antd";
import React from "react";

const EditShoppingDropDown = () => {
  return (
    <div className="row shoppingDropDown cslocation">
      <div className="col-sm-12">
        <Select placeholder="Select Type">
          <Option value="Part">Part</Option>
          <Option value="Chemical">Chemical</Option>
          <Option value="Other">Others</Option>
        </Select>
      </div>
    </div>
  );
};

export default EditShoppingDropDown;
