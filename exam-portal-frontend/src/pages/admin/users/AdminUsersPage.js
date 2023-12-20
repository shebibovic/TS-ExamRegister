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
import {deleteCategory} from "../../../actions/categoriesActions";
import * as categoriesConstants from "../../../constants/categoriesConstants";


const AdminUsers = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem("jwtToken");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [code, setCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');
    const [selectedRole, setSelectedRole] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [usernameExistsError, setUsernameExistsError] = useState('');
    const [users, setUsers] = useState([]);
    const [professors, setProfessors] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerReducer = useSelector((state) => state.registerReducer);


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
                fetch(`/api/user/admin/${userId}`, {
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
                <div className="studentCheckboxes">
                    {users.map((user, index) => (
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
                <div className="studentCheckboxes">
                    {professors.map((user, index) => (
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
