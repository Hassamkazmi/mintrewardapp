import React, { useEffect, useRef } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  Polyline,
  Circle,
} from "google-maps-react";
import { useSelector } from "react-redux";

function GoogleMap(props) {
  const { data: activeServicedashboard } = useSelector(
    (state) => state.activeServicedashboard
  );

  const TempleteData = [
    {
      _id: "",

      color: "#4287f5",
      RouteAssignmentTechnician: [
        {
          _id: "",
          servicelat: 24.9251083,
          servicelong: 67.097316,
        },
      ],
    },
  ];

  const convertData = (originalData) => {
    const convertedData = originalData?.data?.map((originalItem) => {
      const {
        _id,
        longitude,
        latitude,
        color_code,
        RouteAssignmentTechnician,
      } = originalItem;

      const convertedTechnicians = RouteAssignmentTechnician.map(
        (technician) => {
          const {
            _id: technicianId,
            RouteAssignmentWaterBody: { servicelat, servicelong },
          } = technician;

          return {
            _id: technicianId,
            servicelat,
            servicelong,
          };
        }
      );

      return {
        _id,
        longitude,
        latitude,
        color: color_code,
        RouteAssignmentTechnician: convertedTechnicians,
      };
    });

    return convertedData;
  };

  const Data1 =
    convertData(activeServicedashboard)?.length != 0
      ? convertData(activeServicedashboard)
      : TempleteData;

  if (!Data1 || Data1.length === 0) {
    console.error("Data1 is not defined or empty.");
    return null;
  }

  const [center, setCenter] = React.useState({
    lat: Data1[0].latitude || "38.922579",
    lng: Data1[0].longitude || "-77.042388",
  });

  const mapRef = useRef(null);
  const directionsService = new props.google.maps.DirectionsService();

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.map;
    }
  }, []);

  // ... (previous code)

  const renderDirections = (origin, destination, color, technicianName) => {
    const request = {
      origin,
      destination,
      travelMode: "DRIVING",
    };

    directionsService.route(request, (result, status) => {
      if (status === "OK" && result.routes.length > 0) {
        const directionsRenderer = new props.google.maps.DirectionsRenderer({
          map: mapRef?.current?.map,
          directions: result,
          suppressMarkers: true,
        });
      } else {
        console.error("Error fetching directions:", status);
      }
    });

    // Circle for each technician with the specified color
    const circle = new props.google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
      map: mapRef.current.map,
      center: destination,
      radius: 400, // Adjust radius as needed
    });

    // Marker for Technician with the specified color
    const technicianMarker = new props.google.maps.Marker({
      position: destination,
      map: mapRef.current.map,
      title: technicianName,
      icon: {
        url: `http://maps.google.com/mapfiles/ms/icons/${getMarkerColor(
          0
        )}-dot.png`,
        fillColor: color,
      },
    });

    // Marker for Service Location with the specified color
    const serviceMarker = new props.google.maps.Marker({
      position: origin,
      map: mapRef.current.map,
      title: `Technician`,
      icon: {
        url: `http://maps.google.com/mapfiles/ms/icons/blue-dot.png`,
        fillColor: color,
      },
    });

    // Add a click event listener to the technicianMarker
    technicianMarker.addListener("click", () => {
      // Add a delay before zooming (e.g., 1 second)
      setTimeout(() => {
        mapRef.current.map.setCenter(destination);
        mapRef.current.map.setZoom(10); // Adjust the zoom level as needed
      }, 1000); // 1000 milliseconds = 1 second (adjust the delay as needed)
    });
  };

  useEffect(() => {
    for (let i = 0; i < Data1.length; i++) {
      const serviceLocation = new props.google.maps.LatLng(
        Data1[i].latitude,
        Data1[i].longitude
      );

      for (let j = 0; j < Data1[i].RouteAssignmentTechnician.length; j++) {
        const technician = Data1[i].RouteAssignmentTechnician[j];
        const technicianLocation = new props.google.maps.LatLng(
          technician.servicelat,
          technician.servicelong
        );
        const color = Data1[i].color; // Use the color from your data
        const technicianName = `Location ${j + 1}`;
        renderDirections(
          serviceLocation,
          technicianLocation,
          color,
          technicianName
        );
      }
    }
  }, [Data1, props.google.maps.LatLng]);

  const getMarkerColor = (index) => {
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
    return colors[index % colors.length];
  };

  return (
    <div className="googlemap_frame">
      
      <Map
        google={props.google}
        center={center}
        initialCenter={center}
        zoom={10}
        ref={mapRef}
        className='mapRadius'
      />
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(GoogleMap);
