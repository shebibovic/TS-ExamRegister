import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/SidebarProfessor";
import "./ProfessorQuizzesPage.css";


const QuizDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const quizId = params.examId;
    console.log(quizId);
    const [quizDetails, setQuizDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const fetchRegisteredStudents = async () => {
            try {
                const response = await fetch(`http://10.0.142.35:8081/api/user/professor/exam-registered-students/${quizId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuizDetails(data);
                setLoading(false);
            } catch (error) {
                console.error("Greška prilikom dohvaćanja prijavljenih studenata:", error.message);
                setLoading(false);
            }
        };

        fetchRegisteredStudents();
    }, [quizId]);

    return (
        <div className="adminQuizzesPage__container">
            <div className="adminQuizzesPage__sidebar">
                <Sidebar />
            </div>
            <div>
                <h2>Registered students:</h2>
                {quizDetails.length === 0 ? (
                    <p>No registered students yet</p>
                ) : (
                    <ul>
                        {quizDetails.map((student) => (
                            <li key={student.id}>
                                {student.firstName} {student.lastName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
export default QuizDetails;