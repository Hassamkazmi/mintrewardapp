import React from "react";
import { Fragment, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { Routeassignments } from "../../Data/Data";
import Accordion from "react-bootstrap/Accordion";
import moment from "moment";
import { CaretRightOutlined } from "@ant-design/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";
import { DatePicker } from "antd";


function Routetabs({ data }) {
  const dispatch = useDispatch();


  const [Dates, setDates] = useState([]);

  const date1 = new Date();
  const [date, setDate] = useState(date1.toISOString().split('T')[0]);

  const [NewDate, setNewDate] = useState();


  const [technician_id, settechnician_id] = useState(null);

  const GetDates = () => {
    var start = new Date();
    var end = new Date(start);

    end.setDate(start.getDate() + 3);
    let Dates = [];

    var loop = new Date(start);

    for (let i = 0; i < 4; i++) {
      if (i == 0) {
        var newDates = loop.setDate(loop.getDate() + i);
        loop = new Date(newDates);
        Dates.push(moment(loop).format("YYYY-MM-DD"));
      } else {
        var newDates = loop.setDate(loop.getDate() - 1);
        loop = new Date(newDates);
        Dates.push(moment(loop).format("YYYY-MM-DD"));
      }
    }

    setDates(Dates.reverse());
    return Dates;
  };

  useEffect(() => {
    GetDates();
  }, []);


  const onChange = (date1, dateString) => {
    const date = new Date(dateString).toUTCString();
    dispatch(fetchactiveServicedashboard({ date, technician_id }));

}; 

  const handleDates = async (date2) => {
    console.log(date2)
    const date = new Date(date2);
    localStorage.setItem("date",date2)
    await setNewDate(date2);
    dispatch(fetchactiveServicedashboard({ date, technician_id }));
  };


  let savedate = localStorage.getItem("date")

  return (
    <Fragment>
       <Row className="cslocation">
          <Col sm={8}>
            <Nav variant="pills" className="flex-column">
              <Swiper
                slidesPerView={10}
                spaceBetween={30}
                loop={false}
                pagination={{ clickable: true }}
                navigation={false}
                modules={[Navigation]}
                className="mySwiper"
              >
                {Dates?.map((item) => {    
                  return (
                    <SwiperSlide>
                      <Nav.Item className={item == savedate ? "aaa" : "bbb"}>
                        <Nav.Link
                          eventKey={item}
                          onClick={() => handleDates(item)}
                        >
                          {moment(item).format("Do MMM")}
                        </Nav.Link>
                      </Nav.Item>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              
            </Nav>

          </Col>
          <div className='col-sm-4 DatePicker-1'>
            <DatePicker onChange={onChange}/>

            </div>
        </Row>
    </Fragment>
  );
}

export default Routetabs;
