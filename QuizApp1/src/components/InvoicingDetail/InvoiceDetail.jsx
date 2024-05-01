import React, { Fragment, useState } from "react";
import AddItemInvoice from "./AddItemInvoice";
import AddmonthlyServiceInvoice from "./AddmonthlyServiceInvoice";
import image1 from "../../assets/img/avatar.png";
import { useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";

export default function InvoicingDetail({ data }) {
  const { data: getInvoiceDetail, status } = useSelector(
    (state) => state.getInvoiceDetail
  );
  const [ItemNeeded , setItemNeeded] = useState(false);
  const [MonthlyInvoice , setMonthlyInvoice] = useState(false);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function calculateTotalServiceChargesAfterTax(data1, data2) {
    let totalsales = data1 - data2;

    return totalsales.toFixed(0); // Return the total with 2 decimal places
  }

  const AddNewItem = () => {
    setItemNeeded(!ItemNeeded)
  }

  const AddNewMonthlyService = () => {
    setMonthlyInvoice(!MonthlyInvoice)
  }
  const invoiceEditData = () => {
    const firstName = document.getElementById("firstName").innerText;
    const lastName = document.getElementById("lastName").innerText;
    const companyName = document.getElementById("companyName").innerText;
    const billingAddress = document.getElementById("billingAddress").innerText;
    console.log(firstName, lastName, companyName, billingAddress);
  };

  return (
    <Fragment>
      <div className="routedashboard">
        {status === "idle" ? (
          <div className="container-fluid new-invoice">
            <div className="row">
              <div className="col-xs-12">
                <div className="invoice-title">
                  <h2>Invoice</h2>
                  <h3 className="pull-right">
                    {/* <button onClick={invoiceEditData}>Save</button> */}
                  </h3>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xs-3">
                    <address>
                      <strong>Bill To:</strong>
                      <br />
                      <div
                        id="firstName"
                        contentEditable={!data?.isFieldsDisabled}
                      >
                        {getInvoiceDetail?.first_name}
                      </div>
                      <div
                        id="lastName"
                        contentEditable={!data?.isFieldsDisabled}
                      >
                        {getInvoiceDetail?.last_name}
                      </div>
                      <div
                        id="companyName"
                        contentEditable={!data?.isFieldsDisabled}
                      >
                        {getInvoiceDetail?.company_name || "Null"}
                      </div>
                      <div
                        id="billingAddress"
                        contentEditable={!data?.isFieldsDisabled}
                      >
                        {getInvoiceDetail?.billing_address}
                      </div>
                    </address>
                  </div>
                  <div className="col-xs-3">
                    <address>
                      <strong className="text-left">Terms:</strong>
                      <br />
                      <div>Invoice Date:</div>
                      <div>Due Date:</div>
                    </address>
                  </div>
                  <div className="col-xs-4">
                    <address>
                      <strong>
                        {getInvoiceDetail?.company_name || "Null"}
                      </strong>
                      <br />
                      <div>-</div>
                      <div>-</div>
                      <div>{getInvoiceDetail?.billing_address}</div>
                    </address>
                  </div>
                  <div className="col-xs-2">
                    <img src={getInvoiceDetail?.CustomerSuperAdmin?.image ? getInvoiceDetail?.CustomerSuperAdmin?.image :image1} alt="" style={{ width: "100px" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row invoice-data-pool">
              <div className="col-sm-12">
                <div>
                  <p className="poolname-css">
                    {getInvoiceDetail.CustomerServiceLocation &&
                      getInvoiceDetail.CustomerServiceLocation[0]
                        ?.RouteAssignmentServiceLocation[data?.keyData].name} ({getInvoiceDetail.CustomerServiceLocation &&
                          getInvoiceDetail.CustomerServiceLocation[0]
                            ?.RouteAssignmentServiceLocation[data?.keyData].WaterBodyType?.name                          })
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title new-alignment">
                      <strong>Repairs/Work Orders/Items</strong>
                    </h3>
                  </div>
                 
                  <div className="panel-body">
                    <div className="table-responsive">
                      <table className="table table-condensed">
                        <thead>
                          <tr>
                            <td>
                              <strong>Service Date</strong>
                            </td>
                            <td className="text-center">
                              <strong>Product/Service </strong>
                            </td>
                            <td className="text-center">
                              <strong>Description</strong>
                            </td>
                            <td className="text-center">
                              <strong>Installed Items</strong>
                            </td>
                            <td className="text-center">
                              <strong>Rate</strong>
                            </td>
                            <td className="text-center">
                              <strong>Qty</strong>
                            </td>
                            <td className="text-center">
                              <strong>Price</strong>
                            </td>
                            <td className="text-center">
                              <strong>Tax</strong>
                            </td>
                            <td className="text-center">
                              <strong>Status</strong>
                            </td>
                            <td>
                            <span className="addnewlist">
                              {
                                !ItemNeeded ? <IoMdAdd onClick={() => AddNewItem()}/> : <FaMinus  onClick={() => AddNewItem()}/>
                              }
                            </span>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            ItemNeeded ? 
                            <AddItemInvoice data={getInvoiceDetail.CustomerServiceLocation &&
                              getInvoiceDetail.CustomerServiceLocation[0]
                                ?.RouteAssignmentWorkOrderServiceLocation}/> : <></>
                          }

                          {getInvoiceDetail.CustomerServiceLocation &&
                          getInvoiceDetail.CustomerServiceLocation[0]
                            ?.RouteAssignmentWorkOrderServiceLocation
                            ?.length !== 0 ? (
                            <>
                              {getInvoiceDetail.CustomerServiceLocation[0]?.RouteAssignmentWorkOrderServiceLocation[
                                data?.keyData
                              ].CompletedServiceRoutesWaterBodyWorkOrder?.map(
                                (item, key) => {
                                  return (
                                    <tr>
                                      <td
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {formatDate(item?.ServiceDate)}
                                      </td>
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {
                                          item
                                            ?.CompletedServiceLocationLaborTypeDetail
                                            ?.name
                                        }
                                      </td>
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {item?.work_needed
                                          ? item?.work_needed
                                          : "-"}
                                      </td>
                                      <td
                                        className="text-center InstalledItems"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {item?.InstalledItems}
                                      </td>
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        ${item?.LaborCost}
                                      </td>
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        1
                                      </td>
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        $
                                        {Math.round(
                                          item?.ServiceChargesAfterTax
                                        )}
                                      </td>
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        {item?.Tax}%
                                      </td>
                                      <td
                                        className="text-center"
                                        contentEditable={
                                          !data?.isFieldsDisabled
                                        }
                                      >
                                        unpaid
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                            </>
                          ) : (
                            <></>
                          )}

                          
                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Sales Tax</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              {getInvoiceDetail.CustomerServiceLocation &&
                              getInvoiceDetail.CustomerServiceLocation[0]
                                ?.RouteAssignmentWorkOrderServiceLocation
                                ?.length !== 0 ? (
                                <>
                                  {" "}
                                  $
                                  {calculateTotalServiceChargesAfterTax(
                                    getInvoiceDetail.CustomerServiceLocation &&
                                      getInvoiceDetail
                                        .CustomerServiceLocation[0]
                                        ?.RouteAssignmentWorkOrderServiceLocation[
                                        data?.keyData
                                      ]?.WaterBodyChargesAfterTax,
                                    getInvoiceDetail.CustomerServiceLocation &&
                                      getInvoiceDetail
                                        .CustomerServiceLocation[0]
                                        ?.RouteAssignmentWorkOrderServiceLocation[
                                        data?.keyData
                                      ]?.WaterBodyChargesBeforeTax
                                  )}
                                </>
                              ) : (
                                <>$0</>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Repairs/Work Order Total</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              {getInvoiceDetail.CustomerServiceLocation &&
                              getInvoiceDetail.CustomerServiceLocation[0]
                                ?.RouteAssignmentWorkOrderServiceLocation
                                ?.length !== 0 ? (
                                <>
                                  {" "}
                                  $
                                  {Math.round(
                                    getInvoiceDetail.CustomerServiceLocation &&
                                      getInvoiceDetail
                                        .CustomerServiceLocation[0]
                                        ?.RouteAssignmentWorkOrderServiceLocation[
                                        data?.keyData
                                      ]?.WaterBodyChargesAfterTax
                                  )}
                                </>
                              ) : (
                                <>$0</>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title new-alignment">
                      <strong>Monthly Service</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <div className="table-responsive">
                      <table className="table table-condensed">
                        <thead>
                          <tr>
                            <td>
                              <strong>Service Date</strong>
                            </td>
                            <td className="text-center">
                              <strong>Product/Service </strong>
                            </td>
                            <td className="text-center">
                              <strong>Description</strong>
                            </td>
                            <td className="text-center">
                              <strong>Rate</strong>
                            </td>
                            <td className="text-center">
                              <strong>Qty</strong>
                            </td>
                            <td className="text-center">
                              <strong>Price</strong>
                            </td>
                            <td className="text-center">
                              <strong></strong>
                            </td>
                            <td className="text-center">
                              <strong>Tax</strong>
                            </td>
                            <td className="text-center">
                              <strong>Status</strong>
                            </td>
                            <td>
                            <span className="addnewlist">
                              {
                                !MonthlyInvoice ? <IoMdAdd onClick={() => AddNewMonthlyService()}/> : <FaMinus  onClick={() => AddNewMonthlyService()}/>
                              }
                            </span>
                            </td>
                          </tr>
                        </thead>
                        <tbody>

                        {
                             MonthlyInvoice ? 
                            <AddmonthlyServiceInvoice/> : <></>
                          }


                          {getInvoiceDetail.CustomerServiceLocation &&
                            getInvoiceDetail.CustomerServiceLocation[0]?.RouteAssignmentServiceLocation[
                              data?.keyData
                            ].CompletedServiceRoutesWaterBody?.map(
                              (item, key) => {
                                return (
                                  <tr>
                                    <td
                                      contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {formatDate(item?.ServiceDate)}
                                    </td>
                                    <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {
                                        item
                                          ?.CompletedServiceLocationLaborTypeDetail
                                          ?.name
                                      }
                                    </td>
                                    <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {item?.Frequency}
                                    </td>
                                    <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    >
                                      ${item?.LaborCost}
                                    </td>
                                    <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    >
                                      1
                                    </td>
                                    <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    >
                                      $
                                      {Math.round(item?.ServiceChargesAfterTax)}
                                    </td>
                                    <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    ></td>
                                    <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    >
                                      {item?.Tax}%
                                    </td>
                                    <td
                                      className="text-center"
                                      contentEditable={!data?.isFieldsDisabled}
                                    >
                                      unpaid
                                    </td>
                                  </tr>
                                );
                              }
                            )}

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="thick-line text-center">
                              <strong>Subtotal</strong>
                            </td>
                            <td
                              className="thick-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {getInvoiceDetail.CustomerServiceLocation &&
                                getInvoiceDetail.CustomerServiceLocation[0]
                                  ?.RouteAssignmentServiceLocation[
                                  data?.keyData
                                ]?.WaterBodyChargesBeforeTax}
                            </td>
                          </tr>
                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Sales Tax</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {calculateTotalServiceChargesAfterTax(
                                getInvoiceDetail.CustomerServiceLocation &&
                                  getInvoiceDetail.CustomerServiceLocation[0]
                                    ?.RouteAssignmentServiceLocation[
                                    data?.keyData
                                  ]?.WaterBodyChargesAfterTax,
                                getInvoiceDetail.CustomerServiceLocation &&
                                  getInvoiceDetail.CustomerServiceLocation[0]
                                    ?.RouteAssignmentServiceLocation[
                                    data?.keyData
                                  ]?.WaterBodyChargesBeforeTax
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Discount</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              -
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line text-center">
                              <strong>Monthly Service Total</strong>
                            </td>
                            <td
                              className="no-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {Math.round(
                                getInvoiceDetail.CustomerServiceLocation &&
                                  getInvoiceDetail.CustomerServiceLocation[0]
                                    ?.RouteAssignmentServiceLocation[
                                    data?.keyData
                                  ]?.WaterBodyChargesAfterTax
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            {/* <td className="no-line text-center"><strong>Total Due </strong></td>
                          <td className="no-line text-center" contentEditable={!data?.isFieldsDisabled}>${getInvoiceDetail?.Total}</td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <h3 className="panel-title new-alignment">
                      <strong>Service Summary</strong>
                    </h3>
                  </div>
                  <div className="panel-body">
                    <div className="table-responsive">
                      <table className="table table-condensed">
                        <thead>
                          <tr>
                            <td>
                              <strong>Route Stops</strong>
                            </td>
                            <td className="text-center">
                              <strong>Skipped Stops</strong>
                            </td>
                            <td className="text-center">
                              <strong>Chemical Dosages </strong>
                            </td>
                            <td className="text-center">
                              <strong>Repairs/Work Orders</strong>
                            </td>
                            <td className="text-center">
                              <strong></strong>
                            </td>
                            <td className="text-center">
                              <strong></strong>
                            </td>
                            <td className="text-center">
                              <strong></strong>
                            </td>
                            <td className="text-center">
                              <strong>Installed Items</strong>
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {getInvoiceDetail?.CustomerServiceLocation?.map(
                            (item, key) => {
                              return (
                                <tr>
                                  <td contentEditable={!data?.isFieldsDisabled}>
                                    {item?.RoutesStop}
                                  </td>
                                  <td
                                    className="text-center"
                                    contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {item?.SkipStop}
                                  </td>
                                  <td
                                    className="text-center"
                                    contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {item?.ChemicalDosage}
                                  </td>
                                  <td
                                    className="text-center"
                                    contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {item?.TotalWorkOrder}
                                  </td>
                                  <td
                                    className="text-center"
                                    contentEditable={!data?.isFieldsDisabled}
                                  ></td>
                                  <td
                                    className="text-center"
                                    contentEditable={!data?.isFieldsDisabled}
                                  ></td>
                                  <td
                                    className="text-center"
                                    contentEditable={!data?.isFieldsDisabled}
                                  ></td>
                                  <td
                                    className="text-center"
                                    contentEditable={!data?.isFieldsDisabled}
                                  >
                                    {item?.InstalledItems}
                                  </td>
                                </tr>
                              );
                            }
                          )}

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="thick-line text-center">
                              <strong>Subtotal</strong>
                            </td>
                            <td
                              className="thick-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {Math.round(
                                getInvoiceDetail.CustomerServiceLocation &&
                                  getInvoiceDetail.CustomerServiceLocation[0]
                                    ?.ServiceLocationChargesBeforeTax
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="no-line"></td>
                            <td className="thick-line text-center">
                              <strong> Total</strong>
                            </td>
                            <td
                              className="thick-line text-center"
                              contentEditable={!data?.isFieldsDisabled}
                            >
                              $
                              {Math.round(
                                getInvoiceDetail.CustomerServiceLocation &&
                                  getInvoiceDetail.CustomerServiceLocation[0]
                                    ?.ServiceLocationChargesAfterTax
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>Loading ...</>
        )}
      </div>
    </Fragment>
  );
}
