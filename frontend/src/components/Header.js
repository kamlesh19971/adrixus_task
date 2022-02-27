import React from "react";
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
} from "reactstrap";

const Header = (props) => {
  return (
    <Navbar color="light" expand="md" light>
      <NavbarBrand href="/dashboard">Adrixus</NavbarBrand>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="me-auto" navbar></Nav>
        {localStorage.getItem("token") && localStorage.getItem("token") !== "" && (
          <NavbarText>
            <Button
              outline
              color="link"
              onClick={(e) => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.setItem("loggedIn", false);
                window.location.href = "/login";
              }}
            >
              {" "}
              Logout{" "}
            </Button>
          </NavbarText>
        )}
      </Collapse>
    </Navbar>
  );
};

export default Header;
