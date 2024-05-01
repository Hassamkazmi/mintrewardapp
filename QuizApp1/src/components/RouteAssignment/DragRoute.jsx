import React, { Fragment, useState, useEffect } from "react";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  DeleterouteAssignmentData,
  EndrouteAssignmwnt,
  UpdaterouteAssignmwntPosition,
} from "../../redux/postReducer/postRouteAssignment";
import { fetchactiveServicedashboard } from "../../redux/Slices/getActiveServiceRoute";
import ChangeTech from "./ChangeTech";
import Modal from "react-bootstrap/Modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchZoomToMap } from "../../redux/Slices/getZoomToMap";
import { useSelector } from "react-redux";

function RouteListing({ data }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentDate = new Date();
  const [active_service_id, setactive_service_id] = useState(false);
  const date1 = localStorage.getItem("date");
  const { data: profileDetail, status } = useSelector((state) => state.profileDetail);
  const [idData, setidData] = useState(profileDetail?.data?.rearrange_routes);



  const [date , setDate] = useState(date1)
    const [items, setItems] = useState([]);
  const [technician_id, setTechId] = useState("");
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    const id = list[startIndex]?._id;


    const Data = {
      date: localStorage.getItem("date"),
      Position: endIndex + 1,
      PreviousValue: startIndex + 1,
      id: id,
    };
    dispatch(UpdaterouteAssignmwntPosition({ Data, id }));
    // dispatch(fetchactiveServicedashboard({ date, technician_id }));
    return result;
  };

  useEffect(() => {
    setidData(profileDetail?.data?.rearrange_routes)
  },[])

  useEffect(() => {
    setItems(data);
    
  }, [data]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  const dispatch = useDispatch();

  const items1 = [
    {
      label: "Zoom on Map",
      key: "1",
    },
    {
      label: "Move to Different Day/Tech",
      key: "3",
    },
    {
      label: "End Route Assignments",
      key: "5",
    },
    {
      label: "Delete Route Assignments",
      key: "7",
    },
  ];

  const nowDate = new Date();

  const handleClick = async (e, data, data1) => {
    const selectedItem = items1.find((item) => item.key === e.key);

    let id = data1?._id;
    if (selectedItem && selectedItem.label === "Zoom on Map") {
      dispatch(fetchZoomToMap({ id }));
    }
    if (selectedItem && selectedItem.label === "Move to Different Day/Tech") {
      setactive_service_id(data1);
      handleShow();
    }

    if (selectedItem && selectedItem.label === "End Route Assignments") {
      const service_id = data1._id;
      const Data = {
        end_date: nowDate,
      };
      let date = localStorage.getItem("date")
      await dispatch(EndrouteAssignmwnt({ service_id, Data }));
      dispatch(fetchactiveServicedashboard({ date, technician_id }));
    }
    if (selectedItem && selectedItem.label === "Delete Route Assignments") {
      const service_id = data1._id;
      let date = localStorage.getItem("date")

      await dispatch(DeleterouteAssignmentData({ service_id }));
      dispatch(fetchactiveServicedashboard({ date, technician_id }));
    }
  };
  const menu = (serviceDataId, data) => (
    <Menu>
      {items1.map((item) => (
        <Menu.Item
          key={item.key}
          onClick={(e) => handleClick(e, serviceDataId, data)}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  function formatArrivalTime(arrivalTime) {
    // Create a new Date object from the arrivalTime string
    const date = new Date(arrivalTime);
  
    // Extract individual date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear() % 100; // Get last two digits of the year
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  
    // Construct the formatted string
    const formattedArrivalTime = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year < 10 ? '0' : ''}${year} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}`;
  
    return formattedArrivalTime;
  }


  return (
    <Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items?.map((data, index) => (
                <Draggable key={data._id} draggableId={data._id} index={index} isDragDisabled={!idData}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="bodyroute row">
                        <div className="col-sm-2 bluebox">
                          <h3>{data?.RouteAssignmentWaterBody?.position}</h3>
                        </div>
                        <div className="col-sm-4 bluebox">
                          <h2>
                            {data?.RouteAssignmentWaterBody?.customer_name}
                          </h2>
                          <p>
                            {data?.RouteAssignmentWaterBody?.service_address}
                          </p>
                        </div>
                        <div className="col-sm-2 bluebox">
                          <div className="arrivalTimecss">
                            <p>Arrival Time</p>
                            <p>{formatArrivalTime(data?.arrivalTime)}</p>
                          </div>
                        </div>
                        <div className="col-sm-3 bluebox">
                          <p>
                            <h4>{data?.RouteAssignmentWaterBody?.name}</h4>
                            <span>
                              {" "}
                              {moment(data.start_date).format("DD/MM/YYYY")}
                            </span>
                            <span>
                              {" "}
                              {data?.is_never_ending === false ? (
                                moment(data.stop_date).format("DD/MM/YYYY")
                              ) : (
                                <>Never End</>
                              )}
                            </span>
                          </p>
                        </div>
                        <div className="col-sm-1 bluebox">
                          <Dropdown
                            overlay={menu(data.active_service_id, data)}
                            placement="bottomLeft"
                            arrow={{ pointAtCenter: true }}
                          >
                            <UnorderedListOutlined
                              style={{ cursor: "pointer" }}
                            />
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          {/* Add Equiptment */}
          <Button variant="secondary" onClick={handleClose}>
            {" "}
            X
          </Button>
        </Modal.Body>
        <ChangeTech data1={{ handleClose, idData, active_service_id }} />
      </Modal>
    </Fragment>
  );
}

export default RouteListing;
