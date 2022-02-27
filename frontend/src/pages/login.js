import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginImage from "../assets/images/login_image.png";
import services from "../services";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Label,
  CardImg,
} from "reactstrap";

const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });

  const changeHandler = (event) => {
    console.log(event.target.name);
    setUser(
      Object.assign({}, user, {
        [event.target.name]: event.target.value,
      })
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    services.login(user).then((res) => {
      const data = res.data;
      if (data.status) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.access_token);
        window.location.href = "/dashboard";
      } else {
        alert(data.message);
      }
    });
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="mt-2">
          <Col lg={7} md={7}>
            <CardImg src={LoginImage} height="100%" width={"100%"} />
          </Col>

          <Col lg={5} md={5} className="p-5">
            <Row className="mt-4">
              <h3 className="text-center"> Login </h3>
              <form onSubmit={submitHandler}>
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    id="email"
                    name="email"
                    onChange={changeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    bsSize="sm"
                    type="password"
                    id="password"
                    name="password"
                    onChange={changeHandler}
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  {" "}
                  Login
                </Button>

                <Link to="/signup">
                  <Button color="link" type="submit">
                    Sign Up
                  </Button>
                </Link>
              </form>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;
