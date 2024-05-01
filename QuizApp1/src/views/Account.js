import React, { Fragment, useEffect } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNav from "../components/Navbars/AdminNavbar";
import AccountHeader from "../components/Account/AccountHeader";
import { fetchaccountDetail } from "../redux/Slices/getAccoutDetails"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function AddChecklist() {

  const dispatch = useDispatch();
  const {data : accountDetail} = useSelector((state) => state.accountDetail)
  useEffect(() => {
    dispatch(fetchaccountDetail())
  },[dispatch])

  console.log(accountDetail)
  return (
    <Fragment>
      <Sidebar routes={routes} />
      <div className="main-panel">
        <AdminNav />
        <div className="content">
          <div className="addcustomers smsHeader">
            <AccountHeader />
            
          </div>

          <div className="smsHeader">
          <div className="rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="mt-1" width="250px" src={accountDetail?.image} alt="Profile"/>
                        {/* <span className="font-weight-bold">{accountDetail?.FirstName + " " + accountDetail?.LastName}</span> */}
                        <span className="text-black-50 fontsize-css">{accountDetail?.Email}</span>
                    </div>
                </div>
                <div className="col-md-9 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">First Name</label><input type="text" className="form-control form-css-data" placeholder="first name" value={accountDetail?.FirstName}/></div>
                            <div className="col-md-6"><label className="labels">Last Name</label><input type="text" className="form-control form-css-data" value={accountDetail?.LastName} placeholder="surname" /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control form-css-data" placeholder="enter phone number" value={accountDetail?.Mobile} /></div>
                            <div className="col-md-12"><label className="labels">Address</label><input type="text" className="form-control form-css-data" placeholder="enter address line 1" value={accountDetail?.Address} /></div>
                            <div className="col-md-12"><label className="labels">Customer Range</label><input type="text" className="form-control form-css-data" placeholder="enter address line 2" value={accountDetail?.CustomerRange1 +""+accountDetail?.CustomerRange2} /></div>
                            <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control form-css-data" placeholder="enter address line 2" value={accountDetail?.Zip} /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-css-data" placeholder="country" value={accountDetail?.CountryName} /></div>
                            <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-css-data" placeholder="enter address line 2" value={accountDetail?.StateName} /></div>

                        </div>
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                    </div>
                </div>
                
            </div>
        </div>
            
          </div>
        </div>
      </div>
    </Fragment>
  );
}
