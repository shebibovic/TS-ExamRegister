import React, { useState, useEffect } from 'react';
import { Form, Button} from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import swal from "sweetalert";
import "./ProfessorProfilePage.css";
import SidebarProfessor from '../../components/SidebarProfessor';

const ProfessorEditPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwtToken");

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [usernameExistsError, setUsernameExistsError] = useState('');

    const changePassword = async () => {
        try {
            const response = await fetch('/api/change-password', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(user)
            });
            if (response.status===200) {
                const responseData = await response.text(); // Dobavljanje odgovora kao teksta, ne kao JSON-a
                swal("Password change request!",responseData,"success")
              } else {
                const errorData = await response.text(); // Dobavljanje greške kao teksta
                swal("Password change request error!", errorData,"error")
              }
            } catch (error) {
              // Obrada grešaka ako postoji problem s resetiranjem lozinke
              console.error('Error changing password:', error);
            }
    };

    useEffect(() => {
        setUsernameExistsError('');
    }, [username]);


    const submitHandler = async (e) => {
        e.preventDefault();

        let isValid = true;

        // if (!username.trim()) {
        //     setUsernameError('Email is required');
        //     isValid = false;
        // } else {
        //     setUsernameError('');
        // }

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

        <div className="" style={{display:"flex"}}>
            <div className="">
                <SidebarProfessor/>
            </div>
            
            <FormContainer>
                <h1>Change data</h1>
                <h4>Leave the fields you don't want to update empty</h4>
                <Form onSubmit={submitHandler}>

                    <Form.Group className="my-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
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
                    <Button
                        onClick={changePassword}
                        variant=""
                        style={{ backgroundColor: 'rgb(68 177 49)', color: 'white', margin:'25px' }}
                    >Change password</Button>
                </Form>

            </FormContainer>
        </div>
    );
};


export default ProfessorEditPage;
