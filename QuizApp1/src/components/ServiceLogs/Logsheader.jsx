import React from 'react'
import { Fragment } from 'react'
import { Link } from "react-router-dom";
import { fetchgetOptimizeRoute } from '../../redux/Slices/getOptimizeRoute';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Logsheader() {
  const dispatch = useDispatch();

  const { data: activeServicedashboard, statusdata } = useSelector(
    (state) => state.activeServicedashboard
  );



  console.log(activeServicedashboard,"activeServicedashboard")

  const handleOptized = () => {
    const date = activeServicedashboard?.givenDate;
    dispatch(fetchgetOptimizeRoute({ date }));
    toast.success("Route has been Optimized");
  };


  return (
    <Fragment>
        <div className='row customers'>
        <div className='col-sm-5 slog'>
            <h2>Service Logs</h2>
        </div>
        <div className='col-sm-4'></div>
        <div className='col-sm-3 right slog'>
        <button
            className="OptimizeRouteBtn"
            disabled={activeServicedashboard?.data?.length != 0 ? false : true}
            onClick={() => handleOptized()}
          >
            Optimize Route
          </button>
        </div>
        </div>
    </Fragment>
  )
}

export default Logsheader