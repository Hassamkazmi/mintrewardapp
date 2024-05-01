import React, { Fragment, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import Analyze from "../../assets/img/Analyze.png";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import Loader from "../NoDataComponent/Loader";
import Accordion from "react-bootstrap/Accordion";
import { Button, Modal, DatePicker } from "antd";
import { fetchInvoiceTemplate } from "../../redux/Slices/getInvoiceTemplateReportSlice";
import moment from "moment";
import { useDispatch } from "react-redux";

export default function InvoicingTable() {
  const { RangePicker } = DatePicker;

  const { data: getInvoiceData, statusdata } = useSelector(
    (state) => state.getInvoiceData
  );
  const { data: InvoiceTemplate, status } = useSelector(
    (state) => state.getInvoiceData
  );

  const [StartDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [EndDate, setEndDate] = useState(
    moment().endOf("month").format("YYYY-MM-DD")
  );

  const [ID, setId] = useState("");
  const [SID, setSId] = useState("");
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (e, _id, s_id) => {
    setId(_id);
    setSId(s_id);
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (dates, i) => {
    setStartDate(i[0]);
    setEndDate(i[1]);
  };

  const handleSingleProfit = (id, StartDate, EndDate) => {};

  const handleSubmit = () => {
    dispatch(fetchInvoiceTemplate({ ID, SID, StartDate, EndDate }));
    handleCancel();
  };

  console.log(status);
  return (
    <Fragment>
      <div className="routedashboard mainpage customertable invoicingTables">
        <div className="ct-chart" id="chartActivity">
          <div className="row new-head-invoice cslocation">
            <div className="col-sm-2">Customer Name</div>
            <div className="col-sm-2">Route Stop</div>
            <div className="col-sm-2">Chemical Dosages</div>
            <div className="col-sm-2">Installed Items Service</div>
            <div className="col-sm-2">Work Order</div>
            <div className="col-sm-2">Total</div>
          </div>

          <hr />

          {statusdata == "idle" ? (
            getInvoiceData?.items?.map((item, key) => (
              <Accordion
                activeKey={activeKey}
                onSelect={(key) => setActiveKey(key)}
                className="accordian-data-css"
              >
                <Accordion.Item
                  eventKey={key}
                  className="accordian-data-item-css"
                >
                  <Accordion.Header
                    onClick={() => handleSingleProfit()}
                    className="invoice-header"
                  >
                    <div className="row invoice-css-data">
                      <div className="col-sm-2">
                        <b>{item?.first_name}</b>
                      </div>
                      <div className="col-sm-2">{item?.RoutesStop}</div>
                      <div className="col-sm-2">{item?.ChemicalDosage}</div>
                      <div className="col-sm-2">{item?.InstalledItems}</div>
                      <div className="col-sm-2">{item?.RoutesStop}</div>
                      <div className="col-sm-2">
                        {item?.ServiceLocationChargesAfterTax
                          ? Math.round(item?.ServiceLocationChargesAfterTax)
                          : "00"}
                      </div>
                    </div>
                  </Accordion.Header>
                  <hr />
                  <Accordion.Body>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>

                          <th>Route Stop</th>
                          <th>Chemical Dosages</th>

                          <th>Sales Tax</th>

                          <th>Charges Before Tax</th>
                          <th>Action</th>
                          <th>Total</th>

                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {item?.CustomerServiceLocation?.map((data, i) => (
                          <tr>
                            <td>{data?.name}</td>
                            <td>{data?.RoutesStop}</td>
                            <td>{data?.ChemicalDosage}</td>
                            <td>{data?.TotalSalesTax}</td>
                            <td>
                              $
                              {Math.round(
                                data?.ServiceLocationChargesBeforeTax
                              )}
                            </td>
                            <td>
                              $
                              {Math.round(data?.ServiceLocationChargesAfterTax)}
                            </td>

                            <td>
                              <button
                                className="SendInvoice"
                                onClick={(e) =>
                                  showModal(e, item?._id, data?._id)
                                }
                              >
                                Send Invoice
                              </button>
                            </td>
                            <td>
                              {data?.ServiceLocationChargesAfterTax ? (
                                <Link
                                  to={`/invoice-detail/${item?._id}/${data?._id}/${getInvoiceData?.start}/${getInvoiceData?.end}`}
                                >
                                  <img src={Analyze} alt="" />
                                </Link>
                              ) : (
                                <></>
                              )}
                            </td>
                            <Modal
                              title="Date Range"
                              open={isModalOpen}
                              onOk={handleOk}
                              onCancel={handleCancel}
                              footer={[
                                <Button
                                  key="submit"
                                  type="primary"
                                  onClick={() => handleSubmit()}
                                >
                                  Send
                                </Button>,
                                <Button key="cancel" onClick={handleCancel}>
                                  Cancel
                                </Button>,
                              ]}
                            >
                              <form className="">
                                <DatePicker.RangePicker
                                  allowClear={true}
                                  onChange={handleDateChange}
                                />
                              </form>
                            </Modal>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </Fragment>
  );
}
