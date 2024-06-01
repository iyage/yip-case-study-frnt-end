/* eslint-disable no-undef */
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import CustomInfoWindow from "../custom-info-window/CustomInfoWindow";
import { createPin, listPins } from "../../../utils/apis/api";
import "./map-component.scss";
import { useNavigate } from "react-router-dom";
import InfoFormComponent from "../info-form-component/InfoFormComponent";
const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  cursor: "pointer",
};
const dest = {
  lat: null,
  lng: null,
};
function MapComp() {
  const navigate = useNavigate();
  const [center, setCenter] = useState({
    lat: "",
    lng: "",
  });
  const [loc, setLoc] = useState([]);
  const [infoForm, setInfoForm] = useState(false);
  const [err, setErr] = useState(false);
  const [newLatlng, setSewLatlng] = useState({ lat: "", lng: "" });
  const [anchors, setAnchor] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
  });
  function handleForm(e) {
    setErr(false);
    let latLng = JSON.stringify(e.latLng);
    latLng = JSON.parse(latLng);
    setSewLatlng({ lat: latLng.lat, lng: latLng.lng });
    setInfoForm(true);
  }
  function handleCloseInfoWin(_id) {
    setAnchor((prev) => prev.filter((id) => id !== _id));
  }
  function handleCloseInfoForm() {
    setInfoForm(false);
    setSewLatlng(null);
    setErr(false);
  }
  function handleOpenInfo(id) {
    setAnchor((prev) => [...prev, id]);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dest.lat = position.coords.latitude;
      dest.lng = position.coords.longitude;
      setCenter({
        lat: parseFloat(position.coords.latitude),
        lng: parseFloat(position.coords.longitude),
      });
    });
  }, []);
  useEffect(() => {
    listPins()
      .then((resp) => {
        setLoc(resp.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 403 || err.response.status === 401) {
          sessionStorage.clear();
          navigate("/");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(data) {
    data.lat = newLatlng.lat;
    data.lng = newLatlng.lng;
    setIsloading(true);
    setErr(false);
    const service = new google.maps.DistanceMatrixService();
    const matrixOptions = {
      origins: [`${newLatlng.lat},${newLatlng.lng}`],
      destinations: [`${dest.lat},${dest.lng}`],
      travelMode: data.mode,
      unitSystem: google.maps.UnitSystem.METRIC,
    };
    await service.getDistanceMatrix(matrixOptions, (response, status) => {
      if (status !== "OK") {
        console.log(status);
        return;
      }
      data.distance = response?.rows[0]?.elements[0]?.distance?.text;
      data.travelTime = response?.rows[0]?.elements[0]?.duration?.text;
    });
    try {
      const resp = await createPin(data);
      setLoc((prev) => [...prev, resp.data]);
      setIsloading(false);
      setInfoForm(false);
      setSewLatlng(null);
    } catch (error) {
      console.log(error);
      if (error.response.status === 403 || error.response.status === 401) {
        sessionStorage.clear();
        navigate("/");
      }
      setIsloading(false);
      setErr(true);
    }
  }

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          options={{
            draggableCursor: "pointer",
            backgroundColor: "rgb(138,180,248)",
            fullscreenControl: false,
          }}
          mapContainerStyle={containerStyle}
          center={center}
          onClick={handleForm}
          zoom={3}>
          <>
            {infoForm && (
              <MarkerF
                position={{
                  lat: parseFloat(newLatlng.lat),
                  lng: parseFloat(newLatlng.lng),
                }}>
                <InfoWindowF
                  onCloseClick={handleCloseInfoForm}
                  options={{
                    pixelOffset: new google.maps.Size(0, 20),
                    minWidth: "90vw",
                  }}
                  position={{
                    lat: parseFloat(newLatlng.lat),
                    lng: parseFloat(newLatlng.lng),
                  }}>
                  <>
                    {err && (
                      <p className="errMsg">
                        Infomation not saved,Please try again!!
                      </p>
                    )}

                    <InfoFormComponent
                      onSubmit={onSubmit}
                      isLoading={isLoading}
                    />
                  </>
                </InfoWindowF>
              </MarkerF>
            )}

            {loc.length > 0 &&
              loc.map((item) => (
                <MarkerF
                  key={item._id}
                  position={{
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lng),
                  }}
                  onClick={() => handleOpenInfo(item._id)}>
                  {anchors.includes(item._id) && (
                    <InfoWindowF
                      onCloseClick={() => handleCloseInfoWin(item._id)}
                      options={{
                        minWidth: "90vw",
                        maxWidth: "450px",
                      }}
                      position={{
                        lat: parseFloat(item.lat),
                        lng: parseFloat(item.lng),
                      }}>
                      <CustomInfoWindow info={item} />
                    </InfoWindowF>
                  )}
                </MarkerF>
              ))}
          </>
        </GoogleMap>
      ) : (
        <p>Map Loading............</p>
      )}
    </>
  );
}

export default MapComp;
