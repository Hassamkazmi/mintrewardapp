import React, { Fragment, useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { UnorderedListOutlined } from "@ant-design/icons";
import moment from "moment";
import DragRoute from "./DragRoute";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NoData from "../NoDataComponent/NoData";

function RouteListing({ data }) {
  const [activeKey, setActiveKey] = useState(null);

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

  return (
    <Fragment>
      <div className="filteraccordian">
        <h3>{moment(data?.SocketData?.givenDate).format("LL")}</h3>
        {data?.SocketData?.data?.length === 0 ? (
          <NoData />
        ) : (
          data?.SocketData?.data?.map((item, i) => {
            return (
              <div className="main" key={i}>
                <Accordion activeKey={activeKey} onSelect={(i) => setActiveKey(i)}>
                  <Accordion.Item eventKey={i}>
                    <Accordion.Header onClick={() => data?.setTechniciandata(item)}>
                      <div className="row cslocation">
                        <div className="col-sm-2 white roueTabs">
                          <h2>
                            <span>POOL </span> {item?.completedPools} <br />
                            <span>OUT OF {item?.TotalPools}</span>
                          </h2>
                        </div>
                        <div className="col-sm-2 yellows roueTabs">
                          <h2>
                            <span>WORKORDERS </span> {item?.completedWorkOrder}{" "}
                            <br />
                            <span>{item.TotalWorkOrder}</span>
                          </h2>
                        </div>
                        <div className="col-sm-2 gray roueTabs">
                          <h2>
                            <span>SKIPPED </span> {item?.skippedcount}
                            <br />
                            <span>{item?.TotalPools}</span>
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
                              {metersToMiles(item.distanceCovered).toFixed(1)}{" "}
                              MILES
                            </div>
                            <div className="col-sm-4 roueTabsMaxContent">
                              {secondsToMinutes(item.totaltime).toFixed(2)} MIN
                            </div>
                            <div className="col-sm-4 roueTabsMaxContent">
                              {metersToMiles(item.totaldistance).toFixed(1)}{" "}
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
                      <DragRoute data={item?.RouteAssignmentTechnician} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            );
          })
        )}
      </div>
    </Fragment>
  );
}

export default RouteListing;
