import React, { useState, useEffect } from 'react';
import { Form, Button} from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Sidebar from "../../components/Sidebar";
import swal from "sweetalert";
import "./UserProfilePage.css";

const UserEditPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwtToken");

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [usernameExistsError, setUsernameExistsError] = useState('');


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
                email: username
            };
           try{
            const response = await fetch('/api/user/request-update', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(user)
            });
            if(response.status==200){
                swal("Request sent!", `Request successfully sent`, "success");
            }
            else {
                swal("Request was not sent!", `Request was not sent`, "error");
            }

           }catch(error){
            console.error('Error sending request:', error);
           }
        }
       
    };

   

    return (

        <div className="">
            <div className="">
                <Sidebar/>
            </div>
            <FormContainer>
                <h1>Change data</h1>
                <Form onSubmit={submitHandler}>

                    <Form.Group className="my-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={user.firstName}
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
                            value={user.lastName}
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
                            value={user.username}
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
                        Send request
                    </Button>
                </Form>

            </FormContainer>
        </div>
    );
};


export default UserEditPage;
