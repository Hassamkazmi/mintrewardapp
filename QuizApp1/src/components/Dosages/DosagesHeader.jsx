import React from "react";
import { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDosageCSVData, fetchUserCSVData } from "../../redux/Slices/getCSVData";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function DosagesHeader() {
  const { data: getAlldosage } = useSelector((state) => state.getAlldosage);

  const { data: getCSVData, isloading } = useSelector(
    (state) => state.getCSVData
  );
  const dispatch = useDispatch();

  const data = getCSVData ? getCSVData : [];

  const getCSVFunction = async () => {
   try{
    await dispatch(fetchDosageCSVData());

   }catch(error){

toast.error(error)

   }

  };
  console.log(data, "<=====data");

  return (
    <Fragment>
      <div className="row customers">
        <div className="col-sm-5 equipmentssss">
          <h2>DOSAGES</h2>
        </div>
        <div className="col-sm-7 right equipmentssss">
          <button className="yellowbtn">
            <CSVLink data={data} onClick={() => getCSVFunction()}>
              Export
            </CSVLink>
          </button>
          <Link to="/add-dosages">
            <button className="bluebtn">Add New</button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
