import React, { Fragment } from "react";
import viewImage from '../../assets/img/Analyze.png'
import { HiOutlineMail } from "react-icons/hi";
import { FaPrint } from "react-icons/fa6";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function PaymentHistoryTable({data}) {
    const arr = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 }
    ];
      

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
                        <th>Status</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {data?.data?.map((item , key) => (
                        <tr>
                            <td>Paid</td>
                            <td>{formatDate(item?.created)}</td>
                            <td>${item?.amount}</td>
                            <td></td>
                            <td>
                                <div className="paymentHistoryButtons">
                                    <Button>
                                        <Link to={`/payment-history/${item._id}`}>
                                            <img src={viewImage}/>
                                        </Link>
                                    </Button>
                                    <Button>
                                        <HiOutlineMail />
                                    </Button>
                                    <Button>
                                        <FaPrint />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
        </Fragment>
    );
}
