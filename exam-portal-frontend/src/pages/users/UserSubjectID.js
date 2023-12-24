import React, { useState, useEffect } from "react";
import "../admin/subjects/AdminUpdateCategoryPage.css";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/SidebarUser";
import { useNavigate } from "react-router-dom";

const UserSubjectID = () => {

    const navigate = useNavigate();
    const params = useParams();
    const subjectId = params.catId;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""
    );
    const token = localStorage.getItem("jwtToken");
    const [profesorName, setProfesorName] = useState("");


    useEffect(() => {
        const fetchSelectedCategory = async () => {
            try {
                const response = await fetch(`http://10.0.130.222:8081/api/subject/student/${subjectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const selectedCategoryData = await response.json();
                    setTitle(selectedCategoryData.title);
                    setDescription(selectedCategoryData.description);
                    setProfesorName(
                        selectedCategoryData.professor.firstName +
                        " " +
                        selectedCategoryData.professor.lastName
                    );
                } else {
                    throw new Error("Failed to fetch selected subject");
                }
            } catch (error) {
                console.error("Error fetching selected subject:", error);
            }
        };

        fetchSelectedCategory();
    }, [subjectId, token]);



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
                    <Button

                        variant="primary"
                        onClick={() => {
                            navigate(`/quizzes`);
                        }}
                    >
                        Check exams
                    </Button>
                </div>
            </div>
        </div>
    );

};
export default UserSubjectID;

