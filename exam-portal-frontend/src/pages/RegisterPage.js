import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import swal from "sweetalert";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [usernameExistsError, setUsernameExistsError] = useState('');
  const emailRegex = /^.*@.*\..*$/;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerReducer = useSelector((state) => state.registerReducer);


  useEffect(() => {
    setUsernameExistsError('');
  }, [username]);

  const submitHandler = async (e) => {
       e.preventDefault();
       let isValid = true;

       if (!username.trim()) {
            setUsernameError('Email is required');
            isValid = false;
        }
       if (!emailRegex.test(username)) {
          setUsernameError('Email must be in e-mail format');
          isValid = false;
         }
           else {
              setUsernameError('');
        }
       if (isValid) {
          const user = {
            email: username,
            otp: code
        };
        try {
          const response = await fetch('/api/login-otp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          });
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwtToken', data.jwtToken); 
            navigate('/resetPassword');
          }
          
           else if (!response.ok) {
            return response.json().then(data => {
                throw new Error(data.message); // Bacanje greške sa porukom sa servera
            });
        }
        } catch(error){
            swal(error.message);
      };
      }
   };
  return (
      <FormContainer>
        <h1>Login with OTP</h1>
        <Form onSubmit={submitHandler}>

          <Form.Group className="my-3" controlId="username">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter Your Email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError('');
                }}
            ></Form.Control>
            {usernameError && <p className="text-danger">{usernameError}</p>}
          </Form.Group>

          <Form.Group className="my-3" controlId="code">
            <Form.Label>One time password</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                }}
            ></Form.Control>
          </Form.Group>
          <Button
              variant=""
              className="my-3"
              type="submit"
              style={{ backgroundColor: 'rgb(68 177 49)', color: 'white' }}
          >
            Login with OTP
          </Button>
        </Form>

        {registerReducer.loading ? (
            <Loader />
        ) : (
            <Row className="py-3">
              <Col>
                Have an Account?{' '}
                <Link to="/" style={{ color: 'rgb(68 177 49)' }}>
                  Login
                </Link>
              </Col>
            </Row>
        )}
      </FormContainer>
  );
};

export default RegisterPage;