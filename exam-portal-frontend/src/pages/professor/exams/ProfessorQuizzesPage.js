import React, { useEffect, useState } from "react";
import "./ProfessorQuizzesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import Message from "../../../components/Message";
import Sidebar from "../../../components/SidebarProfessor";
import Loader from "../../../components/Loader";
import { deleteQuiz, fetchQuizzes } from "../../../actions/quizzesActions";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const ProfessorQuizzesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const urlParams = new URLSearchParams(window.location.search);
    const catId = urlParams.get("catId");
    const token = localStorage.getItem("jwtToken");

    const quizzesReducer = useSelector((state) => state.quizzesReducer);
    const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
    const addNewQuizHandler = () => {
        navigate("/professorAddQuiz");
    };

    const deleteQuizHandler = (quiz) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this quiz!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteQuiz(dispatch, quiz.quizId, token).then((data) => {
                    if (data.type === quizzesConstants.DELETE_QUIZ_SUCCESS) {
                        swal(
                            "Quiz Deleted!",
                            `${quiz.title} succesfully deleted`,
                            "success"
                        );
                    } else {
                        swal("Quiz Not Deleted!", `${quiz.title} not deleted`, "error");
                    }
                });
            } else {
                swal(`${quiz.title} is safe`);
            }
        });
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
                <h2>Quizzes</h2>
                {quizzes ? (
                    quizzes.length === 0 ? (
                        <Message>No quizzes are present. Try adding some quizzes.</Message>
                    ) : (
                        quizzes.map((quiz, index) => {
                            if ((catId && quiz.category.catId == catId) || (catId == null))
                                return (
                                    <ListGroup
                                        className="adminQuizzesPage__content--quizzesList"
                                        key={index}
                                    >
                                        <ListGroup.Item className="align-items-start" action>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{quiz.title}</div>
                                                <p style={{ color: "grey" }}>{quiz.category.title}</p>
                                                {<p className="my-3">{quiz.description}</p>}
                                                <div className="adminQuizzesPage__content--ButtonsList">
                                                    <div
                                                        onClick={() => deleteQuizHandler(quiz)}
                                                        style={{
                                                            border: "1px solid grey",
                                                            color: "white",
                                                            backgroundColor: "#ff0b0bdb",
                                                            width: "100px",
                                                            padding: "2px",
                                                            textAlign: "center",
                                                            borderRadius: "5px",
                                                            height: "35px",
                                                            margin: "0px 4px",
                                                        }}
                                                    >{`Delete`}</div>
                                                </div>
                                            </div>
                                            {/* <Badge bg="primary" pill></Badge> */}
                                        </ListGroup.Item>
                                    </ListGroup>
                                );
                        })
                    )
                ) : (
                    <Loader />
                )}
                <Button
                    variant=""
                    className="adminQuizzesPage__content--button"
                    onClick={addNewQuizHandler}
                >
                    Add Quiz
                </Button>
            </div>
        </div>
    );
};

export default ProfessorQuizzesPage;