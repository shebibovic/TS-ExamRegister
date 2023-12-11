import React, { useEffect, useState } from "react";
import "./AdminQuizzesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import Message from "../../../components/Message";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/Loader";
import { deleteQuiz, fetchQuizzes } from "../../../actions/quizzesActions";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const AdminQuizzesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const catId = urlParams.get("catId");
  const token = localStorage.getItem("jwtToken");

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
  const addNewQuizHandler = () => {
    navigate("/adminAddQuiz");
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
                  <Message>No exams are present. Try adding some exams.</Message>
              ) : (
                  quizzes.map((quiz, index) => {
                    if ((catId && quiz.category.catId == catId) || (catId == null))
                      return (
                          <ListGroup
                              className="adminQuizzesPage__content--quizzesList"
                              key={index}
                          >
                            <Link
                                to={`/adminQuizzes/${quiz.quizId}`}
                                className="list-group-item list-group-item-action"
                            >
                              <div className="ms-2 me-auto">
                                <div className="fw-bold">{quiz.title}</div>
                                <p style={{ color: "grey" }}>{quiz.category.title}</p>
                                {<p className="my-3">{quiz.description}</p>}
                                {/* Buttons... */}
                              </div>
                              {/* <Badge bg="primary" pill></Badge> */}
                            </Link>
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

export default AdminQuizzesPage;
