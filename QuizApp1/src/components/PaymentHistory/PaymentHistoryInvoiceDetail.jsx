import React, { Fragment } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export default function PaymentHistoryInvoiceDetail() {
    const arr = [
        { id: 1 },
        { id: 2 }
    ];
    return (
        <Fragment>
            <div className="row cslocation">
                <div className="col-sm-12 invoiceHistoryDet">
                    <div className="fullW">
                        <p className="privce">$ 120.00 at PoolNest</p>
                        <p className="cardddetail">Visa 5295</p>
                        <div className="widrhSix">
                            <p className="cardddetail">Feb 29, 2024</p>
                            <p className="cardddetail">#27123-222</p>
                        </div>
                    </div>
                    <div className="fuwl">
                        <div className="widrhSix">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th></th>
                                        <th>Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {arr.map((item , key) => (
                                        <tr>
                                            <td>108 x Surcharge for last month: 108 additional locations</td>
                                            <td></td>
                                            <td>$150.00</td>
                                            
                                        </tr>
                                    ))}
                                        <tr>
                                            <td>Subscription to this month PoolNest Subscription</td>
                                            <td></td>
                                            <td>$150.00</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Subtotal</td>
                                            <td>$600.00</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td><b>Total</b></td>
                                            <td><b>$600.00</b></td>
                                        </tr>
                                </tbody>
                            </table>

                        </div>
                        
                    </div>
                    <div className="fuwl fot">
                    <div className="widrhSix fot">
                            <p>Have a question or need help ? <span>Send us an email</span> or <span>give us a call at (480) 718-2158</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
