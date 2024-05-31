/* eslint-disable no-undef */
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import LgScreenInfoForm from "../lg-screen-info-form/LgScreenInfoForm";
import CustomInfoWindow from "../info-window/CustomInfoWindow";
import { addPin, getPins } from "../../../utils/apis/api";
import "./map-component.scss";
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
  const [center, setCenter] = useState({
    lat: "",
    lng: "",
  });
  const [loc, setLoc] = useState([]);
  const [infoForm, setInfoForm] = useState(false);
  const [err, setErr] = useState(false);
  const [newLatlng, setSewLatlng] = useState({ lat: "", lng: "" });
  const [zoom, setZoom] = useState(2);
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
    setCenter({ lat: latLng.lat, lng: latLng.lng });
    setZoom(7);
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
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    getPins()
      .then((resp) => {
        setLoc(resp.data);
      })
      .catch((err) => console.log(err));
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
      const resp = await addPin(data);
      setLoc((prev) => [...prev, resp.data]);
      setIsloading(false);
      setInfoForm(false);
      setSewLatlng(null);
    } catch (error) {
      console.log(error);
      setIsloading(false);
      setErr(true);
    }
  }

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          options={{ draggableCursor: "pointer" }}
          mapContainerStyle={containerStyle}
          center={center}
          onClick={handleForm}
          zoom={zoom}>
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
                    disableAutoPan: true,
                    pixelOffset: new google.maps.Size(0, 35),
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

                    <LgScreenInfoForm
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
