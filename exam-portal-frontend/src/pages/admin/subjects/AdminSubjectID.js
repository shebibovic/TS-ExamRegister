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
    const categoryId = params.subjectId;
    const profId = params.professorId;

    const oldCategory = useSelector((state) =>
        state.categoriesReducer.categories.find((cat) => cat.categoryId === categoryId)
    );
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""
    );
    const token = localStorage.getItem("jwtToken");
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [profesorName, setProfesorName] = useState("");


    useEffect(() => {
        const fetchSelectedCategory = async () => {
            try {
                const response = await fetch(`/api/category/${categoryId}`, {

                    headers: {
                        Authorization: `Bearer ${token}`, // Dodajte ovu liniju kako biste poslali token
                        "Content-Type": "application/json", // Ovisno o potrebi, možda trebate dodati i Content-Type
                    },
                });
                if (response.ok) {
                    const selectedCategoryData = await response.json();
                    setTitle(selectedCategoryData.title);
                    setDescription(selectedCategoryData.description);
                    setProfesorName(selectedCategoryData.profesor.firstName + " " + selectedCategoryData.profesor.lastName);
                } else {
                    throw new Error("Failed to fetch selected category");
                }
            } catch (error) {
                console.error("Error fetching selected category:", error);
            }
        };

        fetchSelectedCategory();
    }, [categoryId, token]);

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
                    <p><strong>Professor:</strong> {profesorName}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSubjectID;
