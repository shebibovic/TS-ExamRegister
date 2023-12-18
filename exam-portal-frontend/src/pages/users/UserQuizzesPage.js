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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString(); // Prikaz datuma bez vremena
        return formattedDate;
    };


    useEffect(() => {
        if (quizzes.length === 0) {
            fetchQuizzes(dispatch, token).then((data) => {
                setQuizzes(data.payload);
            });
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) navigate("/");
    }, []);

    return (
        <div className="adminQuizzesPage__container">
            <div className="adminQuizzesPage__sidebar">
                <Sidebar />
            </div>
            <div className="adminQuizzesPage__content">
                <h2>Exams</h2>
                {quizzes ? (
                    quizzes.length === 0 ? (
                        <Message>No exams are present. Try adding some exam.</Message>
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
                                                        <div className="fw-bold">{quiz.title}</div>
                                                        <p style={{ color: "grey" }}>{quiz.title}</p> 
                                                        {<p className="my-3">{quiz.description}</p>}
                                                    </div>
                                                    {/* Prikazivanje datuma */}
                                                    <div className="text-end">
                                                        <p>Exam Date: {formatDate(quiz.startDate)}</p>
                                                        <p>Registration deadline: {formatDate(quiz.registrationDeadlineDate)}</p>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => {
                                                                // Akcija koja se izvršava na klik
                                                                // Ovdje možete dodati logiku za registraciju
                                                                // Na primjer, poziv funkcije za registraciju
                                                            }}
                                                        >
                                                            Register exam
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="adminQuizzesPage__content--ButtonsList">

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
