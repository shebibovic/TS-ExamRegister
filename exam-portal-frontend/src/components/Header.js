import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

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

  const logoutHandler = async () => {

    try {
      const token = localStorage.getItem("jwtToken");

      const response = await fetch(`http://10.0.142.35:8081/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate("/login");
      }
      if (!response.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      swal("Error!", "Failed to logout", "error");
    }

    localStorage.clear();
    setIsLoggedIn(false);

  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand></Navbar.Brand>

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
