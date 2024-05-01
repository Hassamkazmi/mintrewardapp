import React, { useState } from "react";
import { Fragment } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import InvoicingTabs from "./InvoicingTabs";
import moment from "moment";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchgetInvoiceData } from "../../redux/Slices/getInvoiceData";

export default function InvoicingFilter() {
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();

  const [selectedDates, setSelectedDates] = useState([]);
  const [StartDate, setStartDate] = useState(moment().startOf("month").format('YYYY-MM-DD'));
  const [EndDate, setEndDate] = useState(moment().endOf("month").format('YYYY-MM-DD'));

  const handleDateChange = (dates, i) => {
    setSelectedDates(i);
    setStartDate(i[0]);
    setEndDate(i[1]);
  };

  useEffect(() => {
    dispatch(fetchgetInvoiceData({ StartDate, EndDate }));
  }, [dispatch, StartDate, EndDate]);


  return (
    <Fragment>
      <div className="d-flex">
        <div className="col-sm-12 inVoicingTabsss">
          {" "}
          <InvoicingTabs />
        </div>

        <form className="myfilters tableFilters invoiceFilter">
          <DatePicker.RangePicker
            allowClear={true}
            onChange={handleDateChange}
          />
          {/* <button type="submit">
            <i className="fa fa-search" aria-hidden="true" />
          </button> */}
        </form>
      </div>
    </Fragment>
  );
}
