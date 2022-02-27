import "./App.css";
import React, { useEffect } from "react";

import Router from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Router />
      {/* {props.children} */}
      <Footer />
    </React.Fragment>
  );
};

export default App;
