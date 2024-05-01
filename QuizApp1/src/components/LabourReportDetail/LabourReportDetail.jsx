import React, { Fragment , useState , useEffect } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import Noti from "../../assets/img/more.png";
import { chemicalData } from "../../Data/Data";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

export default function LabourReportDetail() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const {data : labourReport } = useSelector((state) => state.labourReport)

  const [TotalPages, setTotalPages] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(1);
  const [totalPost, settotalPost] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (page) => setCurrentPage(page);
  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    setTotalPages(labourReport.totalPages);
    setpostsPerPage(labourReport.pageSize);
    settotalPost(labourReport.totalCount);
  },[labourReport]);

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
                <th>Labor Cost/type</th>

                <th>Labor Amount</th>
              </tr>
            </thead>

            <tbody>
              {labourReport?.items?.map((item, key) => (
                <tr>
                  <td>12 May 2023</td>
                  <td>
                    <img
                      src={
                        chemicalData.image
                          ? chemicalData.image
                          : "../images/avatar.png"
                      }
                      alt="image"
                    />
                    <b>Alisher Lwani</b>
                  </td>
                  <td>Kids Pool</td>
                  <td>Per Stop</td>
                  <td>$520</td>
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
