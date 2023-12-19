import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../actions/authActions";
import Loader from "../components/Loader";
import * as authConstants from "../constants/authConstants";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const token = localStorage.getItem("jwtToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const [errorMessage, setErrorMessage] = useState("");

  const showPasswordHandler = () => {
    const temp = !showPassword;
    setShowPassword(temp);
    if (temp) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };


  const submitHandler = (e) => {
    e.preventDefault();
    login(dispatch, email, password).then((data) => {
     /* if (data.type === authConstants.USER_LOGIN_SUCCESS) {
        if (data.role.roleName === 'ADMIN') {
          navigate("/adminProfile"); // Redirect to admin profile for admins
        } else if (data.role.roleName === 'PROFESSOR') {
          navigate("/professorProfile"); // Redirect to professor profile for professors
        } else {
          navigate("/profile"); // Redirect to user profile for other roles
        }
      } else if (data.type === authConstants.USER_LOGIN_FAILURE) {
        setErrorMessage("User does not exist. Wrong email or password.");
      }*/
    });
  };

  useEffect(() => {
    if (token) {
      if (loginReducer.user && loginReducer.user.roles) {
        let isAdmin = false;
        let isProfessor = false;

        loginReducer.user.roles.forEach(role => {
          if (role.roleName === "ADMIN") {
            isAdmin = true;
          } else if (role.roleName === "PROFESSOR") {
            isProfessor = true;
          }
        });

        if (isAdmin) {
          return navigate("/adminProfile");
        } else if (isProfessor) {
          return navigate("/professorProfile");
        } else {
          return navigate("/profile");
        }
      }
    }
  }, [token, loginReducer.user]);


  return (
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                  type={`${passwordType}`}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
              />
              <Button
                  onClick={showPasswordHandler}
                  variant=""
                  style={{ border: "1px solid black" }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button
              variant=""
              className="my-3"
              type="submit"
              style={{ backgroundColor: "rgb(68 177 49)", color: "white" }}
          >
            Login
          </Button>
          {errorMessage && (
              <p style={{ color: 'red' }}>{errorMessage}</p>
          )}
        </Form>

        {loginReducer.loading ? (
            <Loader />
        ) : (
            <Row className="py-3">
              <Col>
                New Customer?{" "}
                <Link to="/register" style={{ color: "rgb(68 177 49)" }}>
                  First Login
                </Link>
              </Col>
            </Row>
        )}
      </FormContainer>
  );
};

export default LoginPage;