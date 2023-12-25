import React, { useState, useEffect } from "react";
import "./ProfessorCategoriesPage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/SidebarProfessor";
const ProfessorSubjectID = () => {
    const params = useParams();
    const subjectId = params.catId;

  
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""
    );
    const token = localStorage.getItem("jwtToken");
    const [students, setStudents] = useState([]);
    const [profesorName, setProfesorName] = useState("");


    useEffect(() => {
        const fetchSelectedCategory = async () => {
            try {
                const response = await fetch('http://10.0.142.35:8081/api/subject/professor', {
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

    /////////////////////////////
    useEffect(() => {
        const fetchStudentsCategory = async () => {
            try {
                const response = await fetch('http://10.0.142.35:8081/api/user/professor/subject-students', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const studentsData = await response.json();
                    setStudents(studentsData);
                } else {
                    throw new Error("Failed to fetch students");
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        

        fetchStudentsCategory();
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
                    <ul>
                        <strong>Students:</strong>
                        {students.map((student, index) => (
                            <li key={index}>{student.firstName} {student.lastName}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfessorSubjectID;
