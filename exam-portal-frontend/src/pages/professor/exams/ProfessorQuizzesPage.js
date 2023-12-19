import React, { useEffect, useState } from "react";
import "./ProfessorQuizzesPage.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
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
    const params = useParams();
    const examId = params.examId;
    const [selectedSubject, setSubject] = useState("");
    const quizzesReducer = useSelector((state) => state.quizzesReducer);
    const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
    const addNewQuizHandler = () => {
        navigate("/professorAddQuiz");
    };
    // Funkcija za formatiranje datuma
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(); // Prikaz datuma bez vremena
    return formattedDate;
};
    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const fetchQuizzesForProfessor = async () => {
            try {
                if (token) {
                    const response = await fetch("/api/exam/professor/active-exams", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch quizzes for professor");
                    }
                    const data = await response.json();
                    setQuizzes(data); // Assuming the response contains the quizzes for the professor
                }
            } catch (error) {
                console.error("Error fetching quizzes for professor:", error);
                // Handle errors appropriately
            }
        };
        fetchQuizzesForProfessor();
    }, []);
    
    const deleteQuizHandler = (quiz) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this exam!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteQuiz(dispatch, quiz.examId, token).then((data) => {
                    if (data.type === quizzesConstants.DELETE_QUIZ_SUCCESS) {
                        swal(
                            "Exam Deleted!",
                            `${quiz.title} succesfully deleted`,
                            "success"
                        );
                    } else {
                        swal("Exam Not Deleted!", `${quiz.title} not deleted`, "error");
                    }
                });
            } else {
                swal(`${quiz.title} is safe`);
            }
        });
    };
    useEffect(() => {
        const fetchSubjects = async () => {
          try {
            const response = await fetch("/api/subject/professor", {
              headers: {
                Authorization: `Bearer ${token}`, // Dodajte ovu liniju kako biste poslali token
                "Content-Type": "application/json", // Ovisno o potrebi, možda trebate dodati i Content-Type
              },
            });
            if (!response.ok) {
              throw new Error("Failed to fetch professors");
            }
            const userData = await response.json();
            setSubject(userData);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
     
        fetchSubjects();
      }, [dispatch, token]);

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
                                                <Link to={`/quiz/${quiz.examId}`} style={{ textDecoration: 'none' }}>
                                                    <div>
                                                        <div className="fw-bold">{quiz.title}</div>
                                                        {<p className="my-3">{selectedSubject.title}</p>} 
                                                        {<p className="my-3">{quiz.description}</p>}
                                                    </div>
                                                    </Link>
                                                    {/* Prikazivanje datuma */}
                                                    <div className="text-end">
                                                        <p>Exam Date: {formatDate(quiz.startDate)}</p>
                                                        <p>Registration deadline: {formatDate(quiz.registrationDeadlineDate)}</p>
                                                    </div>
                                                </div>
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
                    Add Exam
                </Button>
            </div>
        </div>
    );
};
export default ProfessorQuizzesPage;
 
