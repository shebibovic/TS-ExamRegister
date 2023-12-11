import React, { useState, useEffect } from "react";
import "./AdminUpdateCategoryPage.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import FormContainer from "../../../components/FormContainer";
import Sidebar from "../../../components/Sidebar";
import { updateCategory } from "../../../actions/categoriesActions";
import { useNavigate } from "react-router-dom";

const AdminSubjectID = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const catId = params.catId;

    const oldCategory = useSelector((state) =>
        state.categoriesReducer.categories.filter((cat) => cat.catId == catId)
    )[0];
    const [title, setTitle] = useState(oldCategory ? oldCategory.title : "");
    const [description, setDescription] = useState(
        oldCategory ? oldCategory.description : ""
    );
    const token = JSON.parse(localStorage.getItem("jwtToken"));
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchSelectedUsers = async () => {
            try {
                // Make an API call to fetch selected users for the category
                const response = await fetch(`/api/category/users`, {
                    //const response = await fetch(`/api/category/${catId}/users`, {
                    //sad fetcha sve usere jer ovo fali u controllerima
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const selectedUsersData = await response.json();
                    setSelectedUsers(selectedUsersData); // Update the selectedUsers state
                } else {
                    throw new Error("Failed to fetch selected STUDENTS");
                }
            } catch (error) {
                console.error("Error fetching selected STUDENTS:", error);
            }
        };

        fetchSelectedUsers();
    }, [catId, token]);

    useEffect(() => {
        const fetchSelectedUser = async () => {
            try {
                // Make an API call to fetch selected users for the category
                const response = await fetch(`/api/category/users`, {
                    //const response = await fetch(`/api/category/${catId}/users`, {
                    //sad fetcha sve usere jer ovo fali u controllerima
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const selectedUserData = await response.json();
                    setSelectedUser(selectedUserData); // Update the selectedUsers state
                } else {
                    throw new Error("Failed to fetch selected PROFESSORS");
                }
            } catch (error) {
                console.error("Error fetching selected PROFESSORS:", error);
            }
        };

        fetchSelectedUser();
    }, [catId, token]);

    return (
        <div className="adminUpdateCategoryPage__container">
            <div className="adminUpdateCategoryPage__sidebar">
                <Sidebar />
            </div>
            <div className="adminUpdateCategoryPage__content">
                <div>
                    <h2>Subject Details</h2>
                    <p><strong>Subject Name:</strong> {title}</p>
                    <p><strong>Description:</strong> {description}</p>
                    <p><strong>Professor:</strong> {selectedUser ? selectedUser.username : 'Not Assigned'}</p>
                    <p><strong>Students:</strong></p>
                    <ul>
                        {selectedUsers.length > 0 ? (
                            selectedUsers.map((user) => (
                                <li key={user.id}>{user.username}</li>
                            ))
                        ) : (
                            <li>No Assigned Students</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminSubjectID;
