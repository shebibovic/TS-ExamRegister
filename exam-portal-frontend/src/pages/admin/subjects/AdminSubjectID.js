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
    console.log("paramsss: ", params);
    const subjectId = params.catId;
    const profId = params.professorId;
    const [subjectDetails, setSubjectDetails] = useState(null);

    const oldCategory = useSelector((state) =>
        state.categoriesReducer.categories.find((cat) => cat.subjectId === subjectId)
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
                const response = await fetch(`/api/subject/admin/${subjectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const selectedCategoryData = await response.json();
                    console.log("selectedCategoryData", selectedCategoryData);
                    setTitle(selectedCategoryData.title);
                    setDescription(selectedCategoryData.description);
                    setProfesorName(
                        selectedCategoryData.professor.firstName +
                        " " +
                        selectedCategoryData.professor.lastName
                    );
                    setSelectedUsers(selectedCategoryData.students);
                } else {
                    throw new Error("Failed to fetch selected subject");
                }
            } catch (error) {
                console.error("Error fetching selected subject:", error);
            }
        };

        fetchSelectedCategory();
    }, [subjectId, token]);

    useEffect(() => {
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Profesor Name:", profesorName);
    }, [title, description, profesorName]);

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
                    <ul> <strong>Students: </strong>
                        {selectedUsers.map( student => (
                            <li>{student.firstName} {student.lastName} - {student.email}</li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default AdminSubjectID;
