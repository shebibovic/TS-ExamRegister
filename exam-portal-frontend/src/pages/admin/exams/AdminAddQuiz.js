import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./AdminAddQuiz.css";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Sidebar from "../../../components/Sidebar";
import FormContainer from "../../../components/FormContainer";
import * as quizzesConstants from "../../../constants/quizzesConstants";
import { addQuiz } from "../../../actions/quizzesActions";
import { fetchCategories } from "../../../actions/categoriesActions";
import quizzesService from "../../../services/quizzesServices";

const AdminAddQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxMarks, setMaxMarks] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [examDate, setExamDate] = useState("");

  const onClickPublishedHandler = () => {
    setIsActive(!isActive);
  };

  const onSelectCategoryHandler = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const token = localStorage.getItem("jwtToken");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (selectedCategoryId !== null && selectedCategoryId !== "n/a") {
        const selectedCategory = categories.find((cat) => cat.catId === selectedCategoryId);

        if (selectedCategory) {
          const quiz = {
            title: title,
            description: description,
            isActive: isActive,
            category: {
              catId: selectedCategoryId,
              title: selectedCategory.title,
              description: selectedCategory.description,
            },
            examDate: examDate,
          };

          const response = await quizzesService.addQuiz(quiz, token);
          if (response && response.isAdded) {
            swal("Exam Added!", `${quiz.title} successfully added`, "success");
            // Optionally, you can redirect the user or perform other actions upon successful addition
          } else {
            swal("Error!", "Failed to add the quiz", "error");
          }
        } else {
          swal("Error!", "Selected category not found", "error");
        }
      } else {
        alert("Select a valid category!");
      }
    } catch (error) {
      console.error("Error adding quiz:", error);
      swal("Error!", "Failed to add the quiz", "error");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("jwtToken")) navigate("/");
  }, []);

  useEffect(() => {
    // Update local state when Redux store changes
    setCategories(categoriesReducer.categories);
  }, [categoriesReducer.categories]);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories(dispatch, token).then((data) => {
        // Update Redux store with fetched categories
        dispatch({ type: 'UPDATE_CATEGORIES', payload: data.payload }); // Update this action type as per your reducer
      });
    }
  }, [categories.length, dispatch, token]);

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

              <Form.Check
                  className="my-3"
                  type="switch"
                  id="publish-switch"
                  label="Publish Exam"
                  onChange={onClickPublishedHandler}
                  checked={isActive}
              />

              <div className="my-3">
                <label htmlFor="category-select">Choose a Subject:</label>
                <Form.Select
                    aria-label="Choose Subject"
                    id="category-select"
                    onChange={onSelectCategoryHandler}
                >
                  <option value="n/a">Choose Subject</option>
                  {categories ? (
                      categories.map((cat, index) => (
                          <option key={index} value={cat.catId}>
                            {cat.title}
                          </option>
                      ))
                  ) : (
                      <option value="">Choose one from below</option>
                  )}
                  {/* <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option> */}
                </Form.Select>

                <Form.Group className="my-3" controlId="examDate">
                  <Form.Label>Exam Date</Form.Label>
                  <Form.Control
                      type="date"
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
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

export default AdminAddQuiz;