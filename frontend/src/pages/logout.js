import React, { useEffect } from "react";

const Logout = (props) => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("loggedIn", false);
    window.location.href = "/login";
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default Logout;
