import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { fetchworkorderReport } from "../../redux/Slices/getworkOrderReport"
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

export default function Installedfilter({ setValue }) {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();


  const [StartDate, setStartDate] = useState(moment().startOf("month").format('YYYY-MM-DD'));
  const [EndDate, setEndDate] = useState(moment().endOf("month").format('YYYY-MM-DD'));
  const [currentPage, setCurrentPage] = useState(1);

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };

  const history = useNavigate();

  const handleOptionChange = (selectedValue) => {
    setValue(selectedValue);

    // Handle navigation based on selected option
    switch (selectedValue) {
      case "Service":
        history("/labour-report");
        break;
      case "WorkOrder":
        history("/labour-report-workorder");
        break;
      case "SkippedStop":
        history("/labour-report-skipped");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(fetchworkorderReport({StartDate , EndDate , currentPage}))
  } ,[dispatch , StartDate , EndDate , currentPage])

  return (
    <Fragment>
      <form className="myfilters tableFilters labourReportInvoice">
        <div className="row cslocation">
          <div className="col-sm-6">

            <select
                className="form-select form-select-lg mb-3 select1"
                aria-label=".form-select-lg example"
                onChange={(e) => handleOptionChange(e.target.value)}
            >
              <option>Select</option>
              <option value="Service">Service</option>
              <option value="WorkOrder">Work Order</option>
              <option value="SkippedStop">Skipped Stop</option>
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

                {/* <button type="submit">
          {" "}
          <i className="fa fa-search" aria-hidden="true" />
        </button> */}
      </form>
    </Fragment>
  );
}
