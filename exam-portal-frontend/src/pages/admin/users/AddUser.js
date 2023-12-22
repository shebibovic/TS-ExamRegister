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
import swal from "sweetalert";

const AddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [usernameExistsError, setUsernameExistsError] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerReducer = useSelector((state) => state.registerReducer);
    
    const token = localStorage.getItem("jwtToken");


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

        if (isValid) {
            const user = {
                firstName: firstName,
                lastName: lastName,
                email: username,
                role: selectedRole,
            };
            register(dispatch, user, token).then((data) => {
    // Log the response here to check its structure
                if (data.type === authConstants.USER_REGISTER_SUCCESS) {
                    swal("User added!", `successfully added`, "success")
                    navigate('/allUsers');
                }
                /*else{
                    swal("User not added!", `not added`, "error")
                }*/
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
                            placeholder="Enter Email"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setUsernameError('');
                            }}
                        ></Form.Control>
                        {usernameError && <p className="text-danger">{usernameError}</p>}
                    </Form.Group>

                    <Form.Group controlId="role" className="my-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            onChange={(e) => {
                                setSelectedRole(e.target.value);
                            }}
                            value={selectedRole}
                        >
                            <option value="">Select Role</option>
                            <option value="PROFESSOR">Professor</option>
                            <option value="STUDENT">Student</option>
                        </Form.Select>
                    </Form.Group>

                    <Button
                        variant=""
                        className="my-3"
                        type="submit"
                        style={{ backgroundColor: 'rgb(68 177 49)', color: 'white' }}
                    >
                        Register New User
                    </Button>
                </Form>

            </FormContainer>
        </div>
    );
};

export default AddUser;
