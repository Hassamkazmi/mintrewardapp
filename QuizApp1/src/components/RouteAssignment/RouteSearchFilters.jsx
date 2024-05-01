import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { DatePicker, Space } from 'antd';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTechnician } from '../../redux/Slices/GetTechnician';
import { fetchactiveServicedashboard } from '../../redux/Slices/getActiveServiceRoute';
import { fetchgetOptimizeRoute } from '../../redux/Slices/getOptimizeRoute';
import { toast } from 'react-toastify';
import socket from "../../Socket";

function RouteSearchFilters({ data }) {
  const { data: Technician } = useSelector((state) => state.Technician);
  const [routeData, setRouteData] = useState();
  const currentDate = new Date(); // Example: replace this with your actual date
  const date1 = new Date(currentDate.toISOString().split("T")[0]);

  const [date, setDate] = useState(date1);
  const [technician_id, setTechId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (Technician?.length === 0) {
      dispatch(fetchTechnician());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchactiveServicedashboard({ date, technician_id }));
  }, [dispatch, date, technician_id]);

  const onChange = (date, dateString) => {
    setDate(new Date(dateString));
  };

  
useEffect(() => {
  localStorage.setItem("date", date?.toISOString().split("T")[0]);
},[date])

  const handleOptized = () => {
    const date = data?.givenDate;
    dispatch(fetchgetOptimizeRoute({ date }));
    toast.success("Route has been Optimized");
  };

  

  useEffect(() => {
    const date = "2024-02-28"; // Replace with the actual date
    socket.emit("joinDateGroup", date);

    // Listen for events emitted to the room
    socket.on("routeAssignment", (data) => {
      setRouteData(data);
    });
  }, []);

  return (
    <Fragment>
      <div className="row routefilters cslocation">
        <div className="col-sm-7">
          <select
            name="labortype"
            onChange={(e) => setTechId(e.target.value)}
            className="form-control"
          >
            <option value="">Select Tech</option>
            {Technician?.items?.map((item, i) => {
              return (
                <option value={item._id}>
                  {item.first_name + " " + item.last_name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-sm-5">
          <DatePicker onChange={onChange} />
        </div>
        {/* <div className="col-sm-4">
          <button
            className="OptimizeRouteBtn"
            disabled={data?.data?.length != 0 ? false : true}
            onClick={() => handleOptized()}
          >
            Optimize Route
          </button>
        </div> */}
      </div>
    </Fragment>
  );
}

export default RouteSearchFilters