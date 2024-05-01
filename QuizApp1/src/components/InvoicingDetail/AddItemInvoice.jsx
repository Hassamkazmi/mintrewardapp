import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select, DatePicker, Radio } from "antd";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { fetchgetLaborCost } from "../../redux/Slices/getLaborCost";
import { useDispatch } from "react-redux";
import { fetchgetitemNeededShoping } from "../../redux/Slices/getItemNeeded";

const AddItemInvoice = ({data}) => {
  const { data: getLaborCost } = useSelector((state) => state.getLaborCost);
  const { data: getitemNeededData } = useSelector(
    (state) => state.getitemNeededData
  );

  const [serviceDate, setserviceDate] = useState("")
  const [Description, setDescription] = useState("")
  const [Rate, setRate] = useState("");
  const [Qty, setQty] = useState("");
  const [Price, setPrice] = useState("");
  const [Item, setItem] = useState("");
  const [Product, setProduct] = useState("");



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchgetLaborCost());
    dispatch(fetchgetitemNeededShoping({}));
  }, []);
  const handleSave = () => {
    const SenTData = {
      serviceDate:serviceDate,
      Description : Description,
      Rate : Rate,
      Qty : Qty,
      Price : Price,
      Item: Item,
      Product: Product
    }
    console.log(SenTData)
    console.log(data)

  };

  const handleChange = (e,date) => {
    setserviceDate(date)
  }


  return (
    <tr>
      <td className="no-line text-center">
        <Form.Item className="editinvoice-forminput">
          <DatePicker
            onChange={handleChange}
            placeholder="Service date"
            className="editinvoice-input"
          />
        </Form.Item>
      </td>
      <td className="no-line text-center">
        <Form.Item className="editinvoice-forminput">
          <select onChange={(e) => setProduct(e.target.value)} placeholder="Labot Cost Type" className="customselect-css">
            {getLaborCost?.map((item) => {
              return <option value={item._id}>{item.label}</option>;
            })}
          </select>
        </Form.Item>
      </td>
      <td className="no-line text-center">
        <Form.Item className="editinvoice-forminput">
          <Input
           onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description 1"
            type="text"
            className="editinvoice-input"
          />
        </Form.Item>
      </td>
      <td className="no-line text-center">
        <Form.Item className="editinvoice-forminput">
          <select  onChange={(e) => setItem(e.target.value)}  placeholder="Labot Cost Type" className="customselect-css">
            {getitemNeededData?.items?.map((item) => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </select>
        </Form.Item>
      </td>
      <td className="no-line text-center">
        {" "}
        <Form.Item className="editinvoice-forminput">
          <Input  onChange={(e) => setRate(e.target.value)}  placeholder="Rate" type="number"  className="editinvoice-input no-arrow"
/>
        </Form.Item>
      </td>
      <td className="no-line text-center">
        {" "}
        <Form.Item className="editinvoice-forminput">
          <Input
           onChange={(e) => setQty(e.target.value)} 
            placeholder="Quantity"
            type="number"
            className="editinvoice-input no-arrow"
            />
        </Form.Item>
      </td>
      <td className="no-line text-center">
        {" "}
        <Form.Item className="editinvoice-forminput">
          <Input
           onChange={(e) => setPrice(e.target.value)} 
            placeholder="Price"
            type="number"
            className="editinvoice-input no-arrow"
            />
        </Form.Item>
      </td>
      <td className="text-center">
        <strong>17%</strong>
      </td>
      <td className="text-center">Unpaid</td>
      <td>
        <MdOutlineSaveAlt onClick={handleSave} className="addnewlist" />
      </td>
    </tr>
  );
};

export default AddItemInvoice;
