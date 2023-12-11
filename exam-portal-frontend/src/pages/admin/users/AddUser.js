import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import FormContainer from '../../../components/FormContainer';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as authConstants from '../../../constants/authConstants';
import { Link } from 'react-router-dom';
import Sidebar from "../../../components/Sidebar";

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [usernameExistsError, setUsernameExistsError] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerReducer = useSelector((state) => state.registerReducer);

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
        setUsernameExistsError('');
    }, [username]);


    const submitHandler = async (e) => {
        e.preventDefault();

        let isValid = true;

        if (!username.trim()) {
            setUsernameError('Email is required');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
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
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
                code: code,
            };
            register(dispatch, user).then((data) => {
                if (data.type === authConstants.USER_REGISTER_SUCCESS) {
                    navigate('/login');
                }
            });
        }
    };

    return (

        <div className="adminCategoriesPage__container">
            <div className="adminCategoriesPage__sidebar">
                <Sidebar />
            </div>
        <FormContainer>
            <h1>Create User</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group className="my-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter First Name"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="my-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Last Name"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    ></Form.Control>
                </Form.Group>

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

                <Button
                    variant=""
                    className="my-3"
                    type="submit"
                    style={{ backgroundColor: 'rgb(68 177 49)', color: 'white' }}
                >
                    Register
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
        </div>
    );
};

export default AddUser;
