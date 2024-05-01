import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink, CSVDownload } from "react-csv";
import { fetchCustomerCSVData } from "../../redux/Slices/getCSVData";

export default function Customersearch() {

  
  const dispatch = useDispatch();

  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );
  const { data: getCustomer, statusdata } = useSelector(
    (state) => state.getCustomer
  );
  const datas = getCSVData ? getCSVData : [];

  const getCSVFunction = async () => {
    await dispatch(fetchCustomerCSVData());
  };
  console.log(getCSVData, "<===getCSVData");

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>
            Customers{" "}
            <span className="counts">{getCustomer?.items?.totalCount}</span>
          </h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <CSVLink data={datas} onClick={() => getCSVFunction()}>
            <button className="yellowbtn" disabled={isloading}>
              Export
            </button>
          </CSVLink>

          <Link to="/addcustomer">
            <button className="bluebtn">Add Customer</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
