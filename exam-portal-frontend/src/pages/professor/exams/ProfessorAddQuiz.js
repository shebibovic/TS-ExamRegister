import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./ProfessorAddQuiz.css";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Sidebar from "../../../components/SidebarProfessor";
import FormContainer from "../../../components/FormContainer";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import { addQuiz } from "../../../actions/quizzesActions";
import { fetchCategories } from "../../../actions/categoriesActions";

const ProfessorAddQuiz = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [subject, setSubject] = useState([]);
   
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [examDate, setExamDate] = useState("");
    const [registrationDeadline, setRegistrationDeadline] = useState("");
   
    const onClickPublishedHandler = () => {
      setIsActive(!isActive);
    };
    const token = localStorage.getItem("jwtToken");
    const submitHandler = (e) => {
        e.preventDefault();
        if (selectedSubject.catId !== null && selectedSubject.catId !== "n/a") {
          const quiz = {
            title: title,
            description: description,
            isActive: isActive,
            subject: {
              subjectId: parseInt(selectedSubject)
            },
            startDate: examDate, // Include exam date in the quiz object
            registrationDeadlineDate: registrationDeadline
          };
         addQuiz(dispatch, quiz, token).then((data) => {
          console.log(quiz.subject.subjectId+"EHHH OVDJEE SAMMMM SAAAAAD!!!!!")
            if (data.type === quizzesConstants.ADD_QUIZ_SUCCESS)
              swal("Exam Added!", `${quiz.title} succesfully added`, "success");
            else {
              swal("Exam Not Added!", `${quiz.title} not added`, "error");
            }
          });
        } else {
          alert("Select valid category!");
        }
      };
      useEffect(() => {
        const fetchSubjects = async () => {
          try {
            const response = await fetch("/api/subject/subjects/professor", {
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
        <div className="adminAddQuizPage__container">
          <div className="adminAddQuizPage__sidebar">
            <Sidebar />
          </div>
          <div className="adminAddQuizPage__content">
            <FormContainer>
              <h2>Add Exam</h2>
              <Form onSubmit={submitHandler}>
                <Form.Group className="my-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter Exam Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                  ></Form.Control>
                </Form.Group>
   
                <Form.Group className="my-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                      style={{ textAlign: "top" }}
                      as="textarea"
                      rows="3"
                      type="text"
                      placeholder="Enter Exam Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                  ></Form.Control>
                </Form.Group>
   
                {/* <Form.Group className="my-3" controlId="maxMarks">
                <Form.Label>Maximum Marks</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Maximum Marks"
                  value={maxMarks}
                  onChange={(e) => {
                    setMaxMarks(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group> */}
   
                {/* <Form.Group className="my-3" controlId="numberOfQuestions">
                <Form.Label>Number of Questions</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Number of Questions"
                  value={numberOfQuestions}
                  onChange={(e) => {
                    setNumberOfQuestions(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group> */}
   

   
                <div className="my-3">
                  <label htmlFor="category-select">Choose a Subject:</label>
   
                  <Form.Select
                      aria-label="Choose Subject"
                      id="category-select"
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      value={selectedSubject}
                  >
                    <option value="n/a">Choose Subject</option>
                    {subject ? (
                        subject.map((cat) => (
                            <option key={cat.subjectId} value={cat.subjectId}>
                              {cat.title}
                            </option>
                        ))
                    ) : (
                        <option value="">Choose one from below</option>
                    )}
                  </Form.Select>
   
                  <Form.Group className="my-3" controlId="examDate">
                    <Form.Label>Exam Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
   
                  <Form.Group className="my-3" controlId="registrationDeadline">
                    <Form.Label>Registration deadline</Form.Label>
                    <Form.Control
                        type="date"
                        value={registrationDeadline}
                        onChange={(e) => setRegistrationDeadline(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
   
   
                </div>
                <Button
                    className="my-5 adminAddQuizPage__content--button"
                    type="submit"
                    variant="primary"
                >
                  Add
                </Button>
              </Form>
            </FormContainer>
          </div>
        </div>
    );
  };
   
  export default ProfessorAddQuiz;