import axios from "axios";

const BASEURL = process.env.REACT_APP_URL;
const api = axios.create({
  baseURL: BASEURL,
});

export const listPins = async () => {
  return await api.get("/pin", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

export const createPin = async (data) => {
  return await api.post("/pin", data, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
};

export const createUser = async (data) => {
  return await api.post("/user", data);
};

export const authenticate = async (data) => {
  return await api.post("/login", data);
};
