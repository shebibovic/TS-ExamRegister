import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/SidebarProfessor";
import "./ProfessorQuizzesPage.css";

const QuizDetails = () => {
    const dispatch = useDispatch();
    const { quizId } = useParams();
    const quizzesReducer = useSelector((state) => state.quizzesReducer);
    const [quizDetails, setQuizDetails] = useState(null);

    useEffect(() => {
        // Formatiranje quizId iz URL-a u broj
        const quizIdFromURL = parseInt(quizId, 10);

        // Pronalaženje odgovarajućeg kviza na osnovu formatiranog quizId
        const selectedQuiz = quizzesReducer.quizzes.find((quiz) => quiz.examId === quizIdFromURL);

        // Postavljanje stanja samo ako je pronađen odgovarajući kviz
        if (selectedQuiz !== undefined) {
            setQuizDetails(selectedQuiz);
        }
    }, [quizId, quizzesReducer.quizzes]);

    if (!quizDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="adminQuizzesPage__container">
            <div className="adminQuizzesPage__sidebar">
                <Sidebar />
            </div>
        <div>
            <h2>Title: {quizDetails.title}</h2>
            <p>Description: {quizDetails.description}</p>
            <p>Exam Date: {quizDetails.startDate}</p>
            <ul>
                Registered students:
                <li>ja</li>
                <li>ti</li>
            </ul>
        </div>
        </div>
    );
};

export default QuizDetails;