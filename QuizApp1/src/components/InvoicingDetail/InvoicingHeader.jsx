import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Previewslides } from "../../Data/Data";
import InvoicingTable from "./InvoicingTable";

export default function InvoicingHeader({toggleFields}) {

  const myFunction = toggleFields?.toggleFields;


  return (
    <Fragment>
      <div className="row customers invoicer">
        <div className="col-sm-10 ">
        <button className="bluebtn" onClick={myFunction} >{
          toggleFields?.isFieldsDisabled ? "Read Only Mode" : "Save"
        } </button>
        </div>
        <div className="col-sm-2">
        
          </div>
      </div>
    </Fragment>
  );
}
