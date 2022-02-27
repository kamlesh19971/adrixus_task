import React, { useState } from "react";
import { Link } from "react-router-dom";

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
import services from "../services";
import LoginImage from "../assets/images/login_image.png";

const Login = () => {
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialState);

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
    services.signup(user).then((res) => {
      const data = res.data;
      alert(data.message);
      data.status && setUser(initialState);
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
              <h3 className="text-center"> Register </h3>
              <form onSubmit={submitHandler}>
                <FormGroup>
                  <Label htmlFor="email">First Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    id="first_name"
                    name="first_name"
                    onChange={changeHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="email">Last Name</Label>
                  <Input
                    bsSize="sm"
                    type="text"
                    id="last_name"
                    name="last_name"
                    onChange={changeHandler}
                  />
                </FormGroup>
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
                  SignUp
                </Button>

                <Link to="/login">
                  <Button color="link" type="submit">
                    Login
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
