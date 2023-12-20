import React, { useEffect, useState } from "react";
import "./AdminQuizzesPage.css";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import Message from "../../../components/Message";
import Sidebar from "../../../components/Sidebar";
import Loader from "../../../components/Loader";
import { deleteQuiz, fetchQuizzes } from "../../../actions/quizzesActions";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import swal from "sweetalert";

const AdminQuizzesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const catId = urlParams.get("catId");
  const token = localStorage.getItem("jwtToken");

  const quizzesReducer = useSelector((state) => state.quizzesReducer);
  const [quizzes, setQuizzes] = useState(quizzesReducer.quizzes);
  const [selectedSubject, setSubject] = useState("");



  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const response = await fetch("/api/exam/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setQuizzes(data);
        console.log(data);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja kvizova:", error.message);
      }
    };

    fetchAllQuizzes();
  }, [token]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/api/subject/admin", {
          headers: {
            Authorization: `Bearer ${token}`, // Dodajte ovu liniju kako biste poslali token
            "Content-Type": "application/json", // Ovisno o potrebi, možda trebate dodati i Content-Type
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const userData = await response.json();
        setSubject(userData);
      } catch (error) {
        console.error("Error fetching subjects:", error);
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
                                  <div>
                                    <div className="fw-bold">{quiz.title}</div>
                                    {<p className="my-3">{selectedSubject.title}</p>}
                                    {<p className="my-3">{quiz.description}</p>}
                                  </div>
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

export default AdminQuizzesPage;