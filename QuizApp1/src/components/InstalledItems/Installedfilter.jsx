import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { fetchinstalledItemsReport } from "../../redux/Slices/getinstalledItemsReport";
import { fetchgetCustomerType } from "../../redux/Slices/getCustomerType";

import { useDispatch } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";
export default function Installedfilter() {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  const customertype = useSelector((state) => state.getCustomerType);

  const [StartDate, setStartDate] = useState(moment().startOf("month").format('YYYY-MM-DD'));
  const [EndDate, setEndDate] = useState(moment().endOf("month").format('YYYY-MM-DD'));
  const [currentPage, setCurrentPage] = useState(1);
  const [Customer_type, setcustomer_type] = useState("");

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };
  useEffect(() => {
    dispatch(fetchgetCustomerType());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchinstalledItemsReport({StartDate , EndDate , Customer_type , currentPage}))
  } ,[dispatch,StartDate ,Customer_type, EndDate ,currentPage])

  return (
    <Fragment>
      <form className="myfilters tableFilters labourReportInvoice">
        <div className="row cslocation">
          <div className="col-sm-6">
            <select
              className="form-select form-select-lg mb-3 select1"
              aria-label=".form-select-lg example"
              onChange={(e) => setcustomer_type(e.target.value)}
            >
              <option value="">All</option>
              {customertype?.data?.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </select>
          </div>

          <div className="col-sm-6">
            <span className="myfilters tableFilters invoiceFilter">
              <DatePicker.RangePicker
                allowClear={true}
                onChange={handleDateChange}
              />
            </span>
          </div>
        </div>
        {/* <select
          className="form-select form-select-lg mb-3 select1"
          aria-label=".form-select-lg example"
        >
          <option selected>Choose Data Range</option>
          <option value="residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select> */}

     
        {/* <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button> */}
      </form>
    </Fragment>
  );
}
