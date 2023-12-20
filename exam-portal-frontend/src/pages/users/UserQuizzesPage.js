import React, { useEffect, useState } from "react";
import "./UserQuizzesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import Message from "../../components/Message";
import Sidebar from "../../components/SidebarUser";
import Loader from "../../components/Loader";
import { deleteQuiz, fetchQuizzes } from "../../actions/quizzesActions";
import * as quizzesConstants from "../../constants/quizzesConstants";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const UserQuizzesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const urlParams = new URLSearchParams(window.location.search);
    const catId = urlParams.get("catId");
    const token = localStorage.getItem("jwtToken");

    const quizzesReducer = useSelector((state) => state.quizzesReducer);
    const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
    const [otherQuizzes, setOtherQuizzes] = useState(quizzesReducer.quizzes);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString(); // Prikaz datuma bez vremena
        return formattedDate;
    };



    useEffect(() => {
        if (quizzes.length === 0) {
            const fetchQuizzesRegistered = async () => {
                try {
                    const response = await fetch("/api/exam/student/registered-active-exams/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setOtherQuizzes(data); // Postavljanje dohvaćenih predmeta u stanje
                    } else {
                        throw new Error("Failed to fetch exams");
                    }
                } catch (error) {
                    console.error("Error fetching exams:", error);
                }
            };

            fetchQuizzesRegistered();
        }
    }, [quizzes, token]);

    useEffect(() => {
        if (otherQuizzes.length === 0) {
            const fetchQuizzesUnregistered = async () => {
                try {
                    const response = await fetch("/api/exam/student/unregistered-active-exams/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setQuizzes(data); // Postavljanje dohvaćenih predmeta u stanje
                    } else {
                        throw new Error("Failed to fetch exams");
                    }
                } catch (error) {
                    console.error("Error fetching exams:", error);
                }
            };

            fetchQuizzesUnregistered();
        }
    }, [otherQuizzes, token]);


    const registerForExam = async (examId) => {
        try {
            const token = localStorage.getItem("jwtToken");
    
            const response = await fetch(`/api/exam/student/register-exam/${examId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error("Failed to register for the exam");
            }
            swal("Success!", "You have successfully registered for the exam.", "success");
        } catch (error) {
            // U slučaju greške pri registraciji, možete prikazati poruku ili obavijestiti korisnika
            swal("Error!", "Failed to register for the exam. Please try again.", "error");
        }
    };

    const unregisterForExam = async (examId) => {
        try {
            const token = localStorage.getItem("jwtToken");

            const response = await fetch(`/api/exam/student/unregister-exam/${examId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to unregister for the exam");
            }
            swal("Success!", "You have successfully unregistered for the exam.", "success");
        } catch (error) {
            // U slučaju greške pri registraciji, možete prikazati poruku ili obavijestiti korisnika
            swal("Error!", "Failed to unregister for the exam. Please try again.", "error");
        }
    };


    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) navigate("/");
    }, []);

    return (
        <div className="adminQuizzesPage__container">
            <div className="adminQuizzesPage__sidebar">
                <Sidebar />
            </div>
            <div className="adminQuizzesPage__content">
                <h2>Unregistered Exams</h2>
                {quizzes ? (
                    quizzes.length === 0 ? (
                        <Message>No unregistered exams are present for you.</Message>
                    ) : (
                        quizzes.map((quiz, index) => {
                            if ((catId && quiz.category.catId == catId) || (catId == null))
                                return (
                                    <ListGroup
                                        className="adminQuizzesPage__content--quizzesList"
                                        key={index}
                                    >
                                        <ListGroup.Item className="align-items-start" action key={index}>
                                            <div className="ms-2">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <div className="fw-bold">{quiz.subjectName}</div>
                                                        <p style={{ color: "grey" }}>{quiz.title}</p>
                                                        {<p className="my-3">{quiz.description}</p>}
                                                    </div>
                                                    <div className="text-end">
                                                        <p>Exam Date: {formatDate(quiz.startDatbue)}</p>
                                                        <p>Registration deadline: {formatDate(quiz.registrationDeadlineDate)}</p>
                                                        <Button onClick={() => registerForExam(quiz.examId)}>
                                                            Register Exam
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="adminQuizzesPage__content--ButtonsList">
                                                    {/* Dodaj bilo kakve dodatne gumbe ili funkcionalnosti */}
                                                </div>
                                            </div>

                                        </ListGroup.Item>
                                    </ListGroup>

                                );
                        })
                    )
                ) : (
                    <Loader />
                )}
                {/* Prikaz druge liste ispita */}
                <hr className="exams-section-divider" />
                <h2>Registered Exams</h2>
                {otherQuizzes ? (
                    otherQuizzes.length === 0 ? (
                        <Message>No registered exams are present.</Message>
                    ) : (
                        otherQuizzes.map((otherQuiz, index) => {
                            if ((catId && otherQuiz.category.catId == catId) || (catId == null))
                                return (
                                    <ListGroup
                                        className="adminQuizzesPage__content--quizzesList"
                                        key={index}
                                    >
                                        <ListGroup.Item className="align-items-start" action key={index}>
                                            <div className="ms-2">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <div className="fw-bold">{otherQuiz.subjectName}</div>
                                                        <p style={{ color: "grey" }}>{otherQuiz.title}</p>
                                                        {<p className="my-3">{otherQuiz.description}</p>}
                                                    </div>
                                                    <div className="text-end">
                                                        <p>Exam Date: {formatDate(otherQuiz.startDate)}</p>
                                                        <p>Registration deadline: {formatDate(otherQuiz.registrationDeadlineDate)}</p>
                                                        <Button onClick={() => unregisterForExam(otherQuiz.examId)}>
                                                            Unregister Exam
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="adminQuizzesPage__content--ButtonsList">
                                                    {/* Dodaj bilo kakve dodatne gumbe ili funkcionalnosti */}
                                                </div>
                                            </div>

                                        </ListGroup.Item>
                                    </ListGroup>

                                );
                        })
                    )
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};


export default UserQuizzesPage;
