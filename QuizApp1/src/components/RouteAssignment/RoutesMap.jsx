import React, { useEffect, useState, useRef } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import { renderToString } from "react-dom/server";
import { GrDirections } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { ImZoomIn } from "react-icons/im";

// Modified GoogleMap component to accept Techniciandata as a prop
function GoogleMap({ google, Techniciandata }) {
  const { data: activeServicedashboard } = useSelector(
    (state) => state.activeServicedashboard
  );



  const { data: ZoomToMap } = useSelector((state) => state.ZoomToMap);
  const [activeButton, setActiveButton] = useState("Selected"); // "All" or "Selected"

  const [ToggleRoute , setToggleRoute] = useState([])

  const [activeMarker, setActiveMarker] = useState(null);
  const [zoom, setzoom] = useState(6);
  const [originalCoordinates, setOriginalCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.map;
    }
  }, []);

  console.log(originalCoordinates,"originalCoordinates")

  
  useEffect(() => {
    setToggleRoute(Techniciandata?.RouteAssignmentTechnician?.map((item) => ({
    lat: parseFloat(item?.RouteAssignmentWaterBody.servicelat),
    lng: parseFloat(item?.RouteAssignmentWaterBody.servicelong),
    name: item?.RouteAssignmentWaterBody?.customer_name,
    tech_color_code: Techniciandata?.color_code,
    totalPool: item?.RouteAssignmentWaterBody?.name,
    completedPools: "",
    skippedcount: "",
    totaldistance:"",
    totaltime: "",
    last_name: "" ,
    }))
    )
    setzoom(10)

    setOriginalCoordinates({
      lat: Techniciandata && Techniciandata?.RouteAssignmentTechnician[0]?.RouteAssignmentWaterBody?.servicelat,
      lng: Techniciandata && Techniciandata?.RouteAssignmentTechnician[0]?.RouteAssignmentWaterBody?.servicelong,
    });

    onClose()
  },[Techniciandata])

  useEffect(() => {
    if (ZoomToMap.length !== 0) {
      setOriginalCoordinates({
        lat: ZoomToMap?.RouteAssignmentWaterBody?.servicelat,
        lng: ZoomToMap?.RouteAssignmentWaterBody?.servicelong,
      });
      setzoom(15);
    }
  }, [ZoomToMap, activeServicedashboard]);

  

  useEffect(() => {
    const coordinatesData =
      activeServicedashboard?.data?.length != 0
        ? activeServicedashboard?.data?.map((item) => ({
          lat: parseFloat(item.latitude),
              lng: parseFloat(item.longitude),
              name: item?.first_name,
              tech_color_code: item?.color_code,
        totalPool: item?.TotalPools,
        completedPools: item?.completedPools,
        skippedcount: item?.skippedcount,
        totaldistance: item?.totaldistance,
        totaltime: item?.totaltime,
        })
            )
          
        : [
            {
              lat: "38.922579",
              lng: "-77.042388",
              name: "name",
              tech_color_code: "#4287f5",
            },
          ];

    setOriginalCoordinates({
      lat: coordinatesData && coordinatesData[0]?.lat,
      lng: coordinatesData && coordinatesData[0]?.lng,
    });
  }, [activeServicedashboard]);


  const coordinatesData = activeServicedashboard?.data?.map((item) => ({
    lat: parseFloat(item.latitude),
    lng: parseFloat(item.longitude),
    name: item?.first_name,
    tech_color_code: item?.color_code,
    totalPool: item?.TotalPools,
    completedPools: item?.completedPools,
    skippedcount: item?.skippedcount,
    totaldistance: item?.totaldistance,
    totaltime: item?.totaltime,
    last_name: item?.last_name,
})
  )
  useEffect(() => {
    setToggleRoute(coordinatesData)
  },[])

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props);
  };

  const onClose = () => {
    if (activeMarker) {
      setActiveMarker(null);
      setSelectedPlace(null);
    }
  };

  function metersToMiles(kilometers) {
    const conversionFactor = 0.621371;
    return kilometers * conversionFactor;
  }

  function secondsToMinutes(seconds) {
    return seconds / 60;
  }

  const SelectedRoute = () => {
   setActiveButton("Selected")
   setzoom(8)
   setToggleRoute(Techniciandata?.RouteAssignmentTechnician?.map((item) => ({
    lat: parseFloat(item?.RouteAssignmentWaterBody.servicelat),
  lng: parseFloat(item?.RouteAssignmentWaterBody.servicelong),
  name: item?.name,
  tech_color_code: Techniciandata?.color_code,
  totalPool: item?.name,
  completedPools: item?.name,
  skippedcount: item?.name,
  totaldistance:item?.name,
  totaltime: item?.name,
  last_name: item?.name,
  }))
  )
  }

  const AllRoute = () => {
    setActiveButton("All")
    setToggleRoute(coordinatesData)
    setzoom(2)
   }

   const zoomToTech = () => {
    setzoom(1)
   }


  return (
    <div className="googlemap_frame">
      <div className="row routefilters routeMap">
        <div className="col-sm-6">
          <button
            className={`OptimizeRouteBtn ${
              activeButton === "Selected" ? "active" : ""
            }`}
            onClick={SelectedRoute}
          >
            Selected Route
          </button>
        </div>
        <div className="col-sm-6">
          <button
            className={`OptimizeRouteBtn ${
              activeButton === "All" ? "active" : ""
            }`}
            onClick={AllRoute}
          >
            All Routes
          </button>
        </div>
      </div>
      <Map
        google={google}
        center={originalCoordinates}
        initialCenter={originalCoordinates}
        zoom={zoom}
        ref={mapRef}
        className="mapRadius"
      >
        {ToggleRoute?.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: `data:image/svg+xml,${encodeURIComponent(
                renderToString(
                  <FaMapMarkerAlt color={marker.tech_color_code} size={30} />
                )
              )}`,
              scaledSize: new google.maps.Size(30, 30),
            }}
            onClick={onMarkerClick}
            name={marker}
          />
        ))}

        <InfoWindow
          marker={activeMarker}
          visible={activeMarker !== null}
          onClose={onClose}
        >
          <div className="selectedPlace">
            <h5>
              {selectedPlace?.name &&
                selectedPlace?.name?.name +
                  " " +
                  selectedPlace?.name?.last_name}
            </h5>
            <hr />
            <p>
              {" "}
              <span>Pool :</span> {selectedPlace?.name?.totalPool}
            </p>
            {
              selectedPlace?.name?.completedPools ? <p>
              {" "}
              <span>CompletedPools :</span>{" "}
              {selectedPlace?.name?.completedPools}
            </p> : <></>
            }
           {
            selectedPlace?.name?.totaldistance ?  <p>
            <span>Total Distance :</span>{" "}
            {metersToMiles(selectedPlace?.name?.totaldistance).toFixed(1)}{" "}
          </p> : <></>
           }
           {
            selectedPlace?.name?.totaltime ?  <p>
            <span>Total Time :</span>{" "}
            {secondsToMinutes(selectedPlace?.name?.totaltime).toFixed(1)}{" "}
          </p> : <></>
           }
           

          
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(GoogleMap);
