import React from "react";
import { Fragment } from "react";
import Accordion from "react-bootstrap/Accordion";
import Routefilters from "./Routefilters";
import RouteAssignment from "./RouteAssignment";

import Workorder from "./Workorder";
import Recurringwork from "./Recurringwork";
import Equipment from "./Equipment";
import Itemneeded from "./Itemneeded";
import Servicelist from "./Servicelist";
import UploadImage from "./UploadImage";
import Previewslider from "./Previewslider";
import { Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchwaterbody, STATUSES } from "../../redux/Slices/getWaterBody";
import { fetchsinglewaterbody } from "../../redux/Slices/getSingleWaterBody";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import { fetchgetserviceCheckList } from "../../redux/Slices/getserviceCheckList";
import { fetchwaterbodyImage } from "../../redux/Slices/getpoolImages";
import { fetchgetPoolEquipmemnt } from "../../redux/Slices/getEquipment";
import { fetchgetWorkOrderByWaterBody } from "../../redux/Slices/getWorkorder";
import { fetchgetRouteAssingnment } from "../../redux/Slices/getRouteAssignment";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import DeleteModal from "../Modals/DeleteModal";
import { useState } from "react";
import Loader from "../NoDataComponent/Loader";
import { fetchitemNeededWaterBody } from "../../redux/Slices/getItemNeededWaterBody";

export default function Poolaccordian({ isFieldsDisabled }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [poolTypeName, setPoolTypeName] = useState("");
  const [poolName, setPoolName] = useState("");
  const { pathname } = useLocation();

  const url = pathname;

  // Split the URL by "/"
  const parts = url.split("/");

  // Extract the IDs from the parts
  const customerID = parts[parts.length - 2];
  const ServiceLocationID = parts[parts.length - 1];
  const [prevWaterbodyId, setPrevWaterbodyId] = useState(null);

  const { data: waterbody, status } = useSelector((state) => state.waterbody);
  const { data: getWaterBodyItemNeeded } = useSelector(
    (state) => state.getWaterBodyItemNeeded
  );
  const { data: getEquipmemnt } = useSelector((state) => state.getEquipmemnt);
  const { data: getWorkOrder } = useSelector((state) => state.getWorkOrder);
  const { data: getRouteAssingnment } = useSelector(
    (state) => state.getRouteAssingnment
  );

  const { data: singlewaterbody, statusdata } = useSelector(
    (state) => state.singlewaterbody
  );
  const { data: getserviceCheckList } = useSelector(
    (state) => state.getserviceCheckList
  );
  const { data: waterbodyImage } = useSelector((state) => state.waterbodyImage);

  const onFinishs = (values) => {
    console.log("Received values of form:");
  };

  useEffect(() => {
    dispatch(fetchwaterbody({ ServiceLocationID }));
  }, []);

  const handleSubmit = () => {
    navigate("/customer");
    // alert("sada")
  };

  const RemovePool = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: Cookies.get("userToken"),
        },
      };

      const Response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/waterbody/${id}`,
        config
      );

      toast.success("Location Delete SuccessFully");
      dispatch(fetchgetCustomerServices({ id }));
    } catch (err) {
      const error = err.response?.data?.message || "An error occurred";

      toast.error(error);
    }
  };
  const handleOpen = async (id) => {
    if (id !== prevWaterbodyId) {
      setPrevWaterbodyId(id);
      const waterbody_id = id;
      await dispatch(fetchsinglewaterbody({ id }));
      dispatch(fetchwaterbody({ ServiceLocationID }));
      dispatch(fetchgetserviceCheckList({ waterbody_id }));
      dispatch(fetchgetPoolEquipmemnt({ waterbody_id }));
      dispatch(fetchgetWorkOrderByWaterBody({ waterbody_id }));
      dispatch(fetchgetRouteAssingnment({ waterbody_id }));
      dispatch(fetchwaterbodyImage({ waterbody_id }));
      dispatch(fetchitemNeededWaterBody({ waterbody_id }));
    }
  };
  const handleModal = (id) => {
    setModalOpen(true);
    setId(id);
  };

  const handleNav1 = () => {
    navigate(-1);
  };

  const handleNav2 = () => {
    navigate("/customer");
  };

  const handleNav3 = () => {
    navigate(`/edit-service-location/${customerID}`);
  };
  console.log(poolName, "<======poolTypeName");

  return (
    <Fragment>
      <Breadcrumb
        items={[
          {
            title: (
              <p style={{ cursor: "pointer" }} onClick={handleNav2}>
                Customer
              </p>
            ),
          },
          {
            title: (
              <p style={{ cursor: "pointer" }} onClick={handleNav1}>
                Customer View
              </p>
            ),
          },
          {
            title: (
              <p style={{ cursor: "pointer" }} onClick={handleNav3}>
                Service Location
              </p>
            ),
          },
        ]}
      />
      <Accordion flush>
        {waterbody?.map((item, i) => {
          return (
            <Accordion.Item eventKey={i} key={i}>
              <Accordion.Header onClick={() => handleOpen(item?._id)} key={i}>
                <span>
                  (
                  {poolTypeName && poolTypeName?.data?.i == i
                    ? poolTypeName?.name
                    : item?.WaterBodyType?.name}
                  ){" "}
                </span>
                {poolName && poolName?.data?.i == i
                  ? poolName?.name
                  : item?.name}
              </Accordion.Header>
              {statusdata === "idle" ? (
                <Accordion.Body key={i}>
                  <Form
                    name="dynamic_form_item"
                    disabled={isFieldsDisabled}
                    onFinish={onFinishs}
                  >
                    <Routefilters
                      data={{
                        singlewaterbody,
                        setPoolTypeName,
                        setPoolName,
                        i,
                      }}
                    />
                    <RouteAssignment
                      data={{ singlewaterbody, getRouteAssingnment }}
                    />
                    <Workorder data={getWorkOrder} />
                    {/* <Recurringwork /> */}
                    <Equipment data={{ singlewaterbody, getEquipmemnt }} />
                    <Itemneeded data={{ singlewaterbody, getWaterBodyItemNeeded }} />
                    <Servicelist
                      data={{ getserviceCheckList, singlewaterbody }}
                    />

                    <UploadImage data={singlewaterbody} />

                    <Previewslider imagePreview={waterbodyImage} />
                    <div className="col-sm-12 accordfinalbtn">
                      <Form.Item>
                        <Button
                          className="bluebtn form"
                          type="primary"
                          // onClick={() => RemovePool(item?.waterbody_id)}
                          onClick={() => handleModal(item.waterbody_id)}
                        >
                          Remove{" "}
                        </Button>
                        <Button
                          className="bluebtn form"
                          type="primary"
                          htmlType="submit"
                          onClick={() => handleSubmit()}
                        >
                          Save
                        </Button>
                      </Form.Item>
                    </div>
                  </Form>
                </Accordion.Body>
              ) : (
                <></>
              )}
            </Accordion.Item>
          );
        })}
      </Accordion>
      <DeleteModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleDelete={RemovePool}
        id={id}
      />
    </Fragment>
  );
}
