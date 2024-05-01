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
import DateFilter from "./DateFilter";
import NoData from "../NoDataComponent/NoData";
import Locationonmap from "../RouteAssignment/Locationonmap";

function Routetabs({ data }) {
  const dispatch = useDispatch();
  const [Dates, setDates] = useState([]);

  const date1 = new Date();
  const [date, setDate] = useState(date1);

  const [NewDate, setNewDate] = useState();

  const [technician_id, settechnician_id] = useState(null);
  function metersToMiles(kilometers) {
    const conversionFactor = 0.621371;
    return kilometers * conversionFactor;
  }

  function secondsToMinutes(seconds) {
    return seconds / 60;
  }

  const calculatePercentage = (distanceCovered, totalDistance) => {
    const percentage = (distanceCovered / totalDistance) * 100;
    return percentage > 100 ? 100 : percentage; // Ensure it doesn't exceed 100%
  };

  // Function to set background color based on percentage
  const getBackgroundColor = () => {
    const percentage = calculatePercentage();
    if (percentage < 50) {
      return "#e9ecef"; // Set a color for the first half
    } else if (percentage < 80) {
      return "#fab51c"; // Set a color for the second half
    } else {
      return "#e9ecef"; // Set a color for the last part
    }
  };

  const GetDates = () => {
    var start = new Date();
    var end = new Date(start);

    end.setDate(start.getDate() + 3);
    let Dates = [];

    var loop = new Date(start);

    for (let i = 0; i < 7; i++) {
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

  return (
    <Fragment>
      <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        <DateFilter data={1} />
        <div className="onTabletDisplay workOrderMap">
          <Locationonmap />
        </div>

        <Row className="cslocation">
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane>
                <div className="filteraccordian">
               
                  {data?.length === 0 ? (
                    <NoData />
                  ) : (
                    data?.map((item, i) => {
                      return (
                        <div className="main">
                          <Accordion defaultActiveKey="0" flush>
                            <Accordion.Item eventKey={i}>
                              <Accordion.Header>
                                <div className="row cslocation">
                                  <div className="col-sm-2 white roueTabs">
                                    <h2>
                                      <span>POOL </span> {item.completedPools}{" "}
                                      <br />
                                      <span>OUT OF {item?.TotalPools}</span>
                                    </h2>
                                  </div>
                                  <div className="col-sm-2 yellows roueTabs">
                                    <h2>
                                      <span>WORKORDERS </span>{" "}
                                      {item.completedWorkOrder} <br />
                                      <span>{item.TotalWorkOrder}</span>
                                    </h2>
                                  </div>
                                  <div className="col-sm-2 gray roueTabs">
                                    <h2>
                                      <span>SKIPPED </span> {item.skippedcount}
                                      <br />
                                      <span>{item.TotalPools}</span>
                                    </h2>
                                  </div>
                                  <div className="col-sm-6 roueTabsMax">
                                    <div className="row">
                                      <h2>{item?.first_name}</h2>
                                      <div
                                        className="tech_color_code"
                                        style={{
                                          background: `${item?.color_code}`,
                                        }}
                                      ></div>
                                    </div>

                                    <div className="row miles">
                                      <div className="col-sm-4 roueTabsMaxContent">
                                        {metersToMiles(
                                          item.distanceCovered
                                        ).toFixed(1)}{" "}
                                        MILES
                                      </div>
                                      <div className="col-sm-4 roueTabsMaxContent">
                                        {secondsToMinutes(
                                          item.totaltime
                                        ).toFixed(2)}{" "}
                                        MIN
                                      </div>
                                      <div className="col-sm-4 roueTabsMaxContent">
                                        {metersToMiles(
                                          item.totaldistance
                                        ).toFixed(1)}{" "}
                                        MILES
                                      </div>
                                    </div>
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow={calculatePercentage()}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{
                                          width: `${calculatePercentage(
                                            item.distanceCovered,
                                            item.totaldistance
                                          )}%`,
                                          backgroundColor: getBackgroundColor(),
                                        }}
                                      >
                                        {`${calculatePercentage(
                                          item.distanceCovered,
                                          item.totaldistance
                                        ).toFixed(1)}%`}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                {item?.RouteAssignmentTechnician &&
                                  item?.RouteAssignmentTechnician?.map(
                                    (data, i) => {
                                      return (
                                        <div className="bodyroute row">
                                          <div className="col-sm-2 bluebox">
                                            <h3>{i + 1}</h3>
                                          </div>
                                          <div className="col-sm-3">
                                            <h2>
                                              {
                                                data?.RouteAssignmentWaterBody
                                                  ?.customer_name
                                              }
                                            </h2>
                                            <p>
                                              {
                                                data?.RouteAssignmentWaterBody
                                                  ?.service_address
                                              }
                                            </p>
                                          </div>
                                          <div className="col-sm-2">
                                            <h4>{item.name}</h4>
                                          </div>
                                          <div className="col-sm-3">
                                            <p>
                                              <h4>
                                                {
                                                  data?.RouteAssignmentWaterBody
                                                    ?.name
                                                }
                                              </h4>
                                              <span>
                                                {moment(data.start_date).format(
                                                  "DD/MM/YYYY"
                                                )}
                                              </span>
                                              <span>
                                                {" "}
                                                {data?.is_never_ending ===
                                                false ? (
                                                  moment(data.stop_date).format(
                                                    "DD/MM/YYYY"
                                                  )
                                                ) : (
                                                  <>Never End</>
                                                )}
                                              </span>
                                            </p>
                                          </div>
                                          <div className="col-sm-1">
                                            
                                            {data?.RouteAssignmentWaterBody
                                              ?.completeserviceid ? (
                                              <Link
                                                to={`/service-log/${data?.RouteAssignmentWaterBody?.completeserviceid}`}
                                              >
                                                {" "}
                                                <CaretRightOutlined />
                                              </Link>
                                            ) : (
                                              <Link
                                              to={`/service-log-workorder/${data?._id}`}
                                            >
                                              {" "}
                                              <CaretRightOutlined />
                                            </Link>
                                            )}
                                            {
                                              data?.WorkOrder_id == null ? <></> :  <p>WORKORDERS</p>
                                            }
                                          
                                          </div>
                                          
                                        </div>
                                      );
                                    }
                                  )}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </div>
                      );
                    })
                  )}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
}

export default Routetabs;
