import React, { Fragment, useEffect, useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";
import { toast } from "react-toastify";
import Pagination from "../Pagination/Pagination";
import { useDispatch } from "react-redux";
import moment from "moment";
import { fetchinstalledItemsReport } from "../../redux/Slices/getinstalledItemsReport";
import { useSelector } from "react-redux";


export default function Installedtable() {


  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (page) => setCurrentPage(page);

  const {data : installedItemsReport , status} = useSelector((state) => state.installedItemsReport)
  const [StartDate, setStartDate] = useState(moment().startOf("month").format('YYYY-MM-DD'));
  const [EndDate, setEndDate] = useState(moment().endOf("month").format('YYYY-MM-DD'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchinstalledItemsReport({StartDate , EndDate , currentPage}))
  } ,[dispatch,currentPage])

  useEffect(() => {
    setTotalPages(installedItemsReport.totalPages);
    setpostsPerPage(installedItemsReport.pageSize);
    settotalPost(installedItemsReport.totalCount);
  },[installedItemsReport]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  return (
    <Fragment>

      <div className="routedashboard mainpage customertable">
        <div className="ct-chart" id="chartActivity">
          <table>
            <thead>
              <tr>
              <th>Date</th>
                <th>Customer</th>

                <th>Pool</th>
                <th>Labor Cost/Type</th>
                <th>labor Amount</th>
              </tr>
            </thead>

            <tbody>
            {installedItemsReport?.items?.map((item , key) => (
                <tr>
                 <td>{formatDate(item?.ServiceDate)}</td>
                  <td>
                    <b>{item?.CompletedServiceRoutesCustomerId?.first_name + " " + item?.CompletedServiceRoutesCustomerId?.last_name}</b>
                    
                  </td>
                  <td>{item?.CompletedServiceRoutesWaterBody?.name}</td>
                  <td>{item?.CompletedServiceLocationLaborTypeDetail?.name}</td>
                  <td>${item?.LaborCost}</td>

                  <td>
                    {/* <Dropdown as={Nav.Item} className="notidrop">
                      <Dropdown.Toggle
                        data-toggle="dropdown"
                        id="dropdown-67443507"
                        variant="default"
                        className="m-0"
                      >
                        <img src={Noti} alt="boximg" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Edit</Dropdown.Item>
                 
                        <Dropdown.Item> Delete </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={totalPost}
            TotalPages={TotalPages}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Fragment>
  );
}
