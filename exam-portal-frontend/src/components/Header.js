import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    console.log("jwtToken:", jwtToken);
    console.log("loginReducer.user:", loginReducer.user);

    if (jwtToken && loginReducer.user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [jwtToken, loginReducer.user]);

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <Navbar.Brand>Exam-Portal</Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {isLoggedIn && loginReducer.user ? (
                    <>
                      <Nav.Link>{loginReducer.user.name}</Nav.Link>
                      <LinkContainer to="/">
                        <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                      </LinkContainer>
                    </>
                ) : (
                    <>
                      <LinkContainer to="/">
                        <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/register">
                        <Nav.Link>First Login</Nav.Link>
                      </LinkContainer>
                    </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
  );
};

export default Header;
