import axios from "axios";
//http://localhost:5000
let config = {
  baseURL: "/api/",
  timeout: 10000,
};

if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
  config["headers"] = {
    token: localStorage.getItem("token"),
  };
}

const api = axios.create(config);

const login = (data) => api.post("/login", data).then((res) => res);

const signup = (data) => api.post("/signup", data).then((res) => res);

const getUsers = () => api.get("/users").then((res) => res);

export default {
  login,
  signup,
  getUsers,
};
