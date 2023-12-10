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
    const [assignedProfessor, setAssignedProfessor] = useState(null); // State to hold professor info
    const token = JSON.parse(localStorage.getItem("jwtToken"));

    useEffect(() => {
        const fetchProfessor = async () => {
            try {
                if (oldCategory && oldCategory.assignedProfessorId) {
                    const response = await fetch(`/api/professors/${oldCategory.assignedProfessorId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.ok) {
                        const professorData = await response.json();
                        setAssignedProfessor(professorData);
                    } else {
                        throw new Error("Failed to fetch professor");
                    }
                }
            } catch (error) {
                console.error("Error fetching professor:", error);
            }
        };

        fetchProfessor();
    }, [oldCategory, token]);

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
                    <p><strong>Professor:</strong> {assignedProfessor ? assignedProfessor.username : 'Not Assigned'}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminSubjectID;
