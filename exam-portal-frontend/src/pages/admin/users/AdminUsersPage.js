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
                        if (response.status === 200) {
                            swal("User Deleted!", "User successfully deleted", "success");
                        }
                        else if (!response.ok) {
                            return response.json().then(data => {
                                throw new Error(data.message); // Bacanje greške sa porukom sa servera
                            });
                        }

                    })
                    .then(data => {
                        // Ovdje se može koristiti odgovor koji dolazi sa servera (data)
                        // Ako nema potrebe za prikazivanjem podataka, možete izostaviti ovaj then blok

                        swal("User Deleted!", "User successfully deleted", "success");
                    })
                    .catch(error => {
                        console.error('There was a problem with the deletion:', error);
                        swal("User Not Deleted!", error.message || "There was an error while deleting the user", "error");
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
            <div className="adminCategoriesPage__content">
                <FormContainer>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px' }}>
                        <div style={{ marginRight: '30px' }}>
                            <h3>Students:</h3>
                            <Form.Group controlId="searchStudents">
                                <Form.Control
                                    type="text"
                                    placeholder="Search students by name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </Form.Group>
                            <div className="studentCheckboxes" style={{ marginTop: '20px' }}></div>
                            <div className="studentCheckboxes">
                                {users
                                    .filter((user) =>
                                        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((user, index) => (
                                        <div key={index} className="userRow">
                                            <p>
                                                {user.firstName} {user.lastName}
                                                <span
                                                    className="deleteText"
                                                    onClick={() => deleteUserHandler(user.userId, token)}
                                                    style={{
                                                        color: "red",
                                                        marginLeft: "10px",
                                                        fontWeight: "500",
                                                        cursor: "pointer",
                                                    }}
                                                >
            Delete
          </span>
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div style={{ marginLeft: '30px' }}>

                            <h3>Professors:</h3>
                            <Form.Control
                                type="text"
                                placeholder="Search professors by name"
                                value={searchTermProf}
                                onChange={(e) => setSearchTermProf(e.target.value)}
                            />

                            <div className="studentCheckboxes" style={{ marginTop: '20px' }}></div>
                            <div className="professorCheckboxes">
                                {professors
                                    .filter((prof) =>
                                        prof.firstName.toLowerCase().includes(searchTermProf.toLowerCase()) ||
                                        prof.lastName.toLowerCase().includes(searchTermProf.toLowerCase())
                                    )
                                    .map((prof, index) => (
                                        <div key={index} className="profRow">
                                            <p>
                                                {prof.firstName} {prof.lastName}
                                                <span
                                                    className="deleteText"
                                                    onClick={() => deleteUserHandler(prof.userId, token)}
                                                    style={{
                                                        color: "red",
                                                        marginLeft: "10px",
                                                        fontWeight: "500",
                                                        cursor: "pointer",
                                                    }}
                                                >
            Delete
          </span>
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </FormContainer>
            </div>
        </div>
    );
};

export default AdminUsers;