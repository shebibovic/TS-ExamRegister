import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');

    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const passwordRegex = /^(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;

    const navigate = useNavigate();
    const token = localStorage.getItem("jwtToken");

    const showPasswordHandler = () => {
        const temp = !showPassword;
        setShowPassword(temp);
        setPasswordType(temp ? 'text' : 'password');
    };

    const showConfirmPasswordHandler = () => {
        const temp = !showConfirmPassword;
        setShowConfirmPassword(temp);
        setConfirmPasswordType(temp ? 'text' : 'password');
    };
    useEffect(() => {
        if (!token) {
          navigate('/'); // Ako nema tokena, redirektuj na login stranicu
        }
      }, []);


    const submitHandler = async (e) => {
        e.preventDefault();

        let isValid = true;

        if (!passwordRegex.test(password)) {
            setPasswordError('Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (isValid) {
            const user = {
//username: username, // Dodaj ovo ako trebaš korisničko ime za identifikaciju
                password: password
            };
            try {
                const response = await fetch('http://10.0.130.222:8081/api/reset-password', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(user)
                });
                if (response.status===200) {
                    const responseData = await response.text(); // Dobavljanje odgovora kao teksta, ne kao JSON-a
                    navigate('/login');
                  } else {
                    const errorData = await response.text(); // Dobavljanje greške kao teksta
                  }
                } catch (error) {
                  // Obrada grešaka ako postoji problem s resetiranjem lozinke
                  console.error('Error resetting password:', error);
                }
        }
    };

    return (
        <FormContainer>
            <h1>Reset Password</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group className="my-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={passwordType}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError('');
                            }}
                        ></Form.Control>
                        <Button
                            onClick={showPasswordHandler}
                            variant=""
                            style={{ border: '1px solid black' }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </InputGroup>
                    {passwordError && <p className="text-danger">{passwordError}</p>}
                </Form.Group>

                <Form.Group className="my-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={confirmPasswordType}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setConfirmPasswordError('');
                            }}
                        ></Form.Control>
                        <Button
                            onClick={showConfirmPasswordHandler}
                            variant=""
                            style={{ border: '1px solid black' }}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </InputGroup>
                    {confirmPasswordError && (
                        <p className="text-danger">{confirmPasswordError}</p>
                    )}
                </Form.Group>
                <Button
                    variant=""
                    className="my-3"
                    type="submit"
                    style={{ backgroundColor: 'rgb(68 177 49)', color: 'white' }}
                >
                    Reset Password
                </Button>
            </Form>

        </FormContainer>
    );
};

export default ResetPasswordPage;