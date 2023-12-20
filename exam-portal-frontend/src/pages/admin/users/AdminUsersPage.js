import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../../components/FormContainer';
import Sidebar from "../../../components/Sidebar";
import swal from "sweetalert";
import { Button, Form } from "react-bootstrap";


const AdminUsers = () => {
    const [username, setUsername] = useState('');
    const token = localStorage.getItem("jwtToken");

    const [usernameExistsError, setUsernameExistsError] = useState('');
    const [users, setUsers] = useState([]);
    const [professors, setProfessors] = useState([]);

    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermProf, setSearchTermProf] = useState("");

    useEffect(() => {
        setUsernameExistsError('');
    }, [username]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/user/admin/students", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Dodajte ovu liniju kako biste poslali token
                        "Content-Type": "application/json", // Ovisno o potrebi, možda trebate dodati i Content-Type
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch students");
                }
                const usersData = await response.json();
                console.log(usersData); // Log fetched user data
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        const fetchProfessors = async () => {
            try {
                const response = await fetch("/api/user/admin/professors", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Dodajte ovu liniju kako biste poslali token
                        "Content-Type": "application/json", // Ovisno o potrebi, možda trebate dodati i Content-Type
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch professors");
                }
                const profData = await response.json();
                console.log(profData); // Log fetched user data
                setProfessors(profData);
            } catch (error) {
                console.error("Error fetching professors:", error);
            }
        };

        fetchProfessors();
        fetchUsers();
    }, [dispatch, token]);

    const deleteUserHandler = (userId, token) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                fetch(`/api/user/admin/delete/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })

                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');

                        }
                        return response.json();
                    })
                    .then(data => {
                        swal("User Deleted!", "User successfully deleted", "success");

                    })
                    .catch(error => {
                        console.error('There was a problem with the deletion:', error);
                        swal("User Not Deleted!", "There was an error while deleting the user", "error");
                    });
            } else {
                swal("User is safe");
            }
        });
    };


    return (
        <div className="adminCategoriesPage__container">
            <div className="adminCategoriesPage__sidebar">
                <Sidebar />
            </div>
            <FormContainer>
                <h3>Students:</h3>
                <Form.Group controlId="searchStudents">

                    <Form.Control
                        type="text"
                        placeholder="Search students by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
                <div className="studentCheckboxes">
                    {users
                        .filter((user) =>
                            user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((user, index) => (
                        <div key={index} className="userRow">
                            <p>{user.firstName} {user.lastName}
                                <div
                                    onClick={(event) => deleteUserHandler(event, user)}
                                    style={{
                                        color: "red",
                                        fontWeight: "500",
                                        cursor:"pointer"
                                    }}
                                >{`Delete`}</div>
                            </p>

                        </div>
                    ))}
                </div>

                <h3>Professors:</h3>
                <Form.Control
                    type="text"
                    placeholder="Search students by name"
                    value={searchTermProf}
                    onChange={(e) => setSearchTermProf(e.target.value)}
                />
                <div className="studentCheckboxes">
                    {professors
                        .filter((user) =>
                            user.firstName.toLowerCase().includes(searchTermProf.toLowerCase())
                        )
                        .map((user, index) => (
                        <div key={index} className="userRow">
                            <p>{user.firstName} {user.lastName}
                                <div
                                    onClick={(event) => deleteUserHandler(event, user)}
                                    style={{
                                        color: "red",
                                        fontWeight: "500",
                                        cursor:"pointer"
                                    }}
                                >{`Delete`}</div>
                            </p>

                        </div>
                    ))}
                </div>
            </FormContainer>
        </div>
    );
};

export default AdminUsers;
