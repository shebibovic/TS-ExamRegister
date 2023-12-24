import React, { useState, useEffect } from "react";
import "./AdminUpdateCategoryPage.css";
import { Button, Form } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import FormContainer from "../../../components/FormContainer";
import Sidebar from "../../../components/Sidebar";
import {
  updateCategory, fetchCategories} from "../../../actions/categoriesActions";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AdminUpdateCategoryPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // State to hold selected user
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [professor, setProfessor] = useState([]);
  const [profesorName, setProfesorName] = useState("");
  const token = localStorage.getItem("jwtToken");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [oldProfessor, setOldProfessor] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const params = useParams();
  const subjectId = params.catId;
  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);

  const submitHandler = (e) => {
    e.preventDefault();
    const category = {
      subjectId: parseInt(subjectId),
      title: title,
      description: description,
      professorId: parseInt(selectedUser),
      students: selectedStudents,
    };
    updateCategory(dispatch, category, token).then((data) => {
      if (data.type === categoriesConstants.UPDATE_CATEGORY_SUCCESS) {
        swal("Subject Updated!", `${title} successfully updated`, "success");
        // Ponovno učitavanje kategorija nakon uspješnog ažuriranja
        fetchCategories(dispatch, token).then((data) => {
          setCategories(data.payload);
        });
      } else {
        swal("Subject Not Updated!", `${title} not updated`, "error");
      }
    });
  };
  //fetch subject details
  useEffect(() => {
    const fetchSelectedCategory = async () => {
      try {
        const response = await fetch(`http://10.0.130.222:8081/api/subject/admin/${subjectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const selectedCategoryData = await response.json();
          console.log("selectedCategoryData", selectedCategoryData);
          setTitle(selectedCategoryData.title);
          setDescription(selectedCategoryData.description);
          setOldProfessor(selectedCategoryData.professor);
          console.log("ivdsjfbhsdjk", selectedCategoryData.professor.userId);
          //setSelectedUsers(selectedCategoryData.students);
          setSelectedStudents(selectedCategoryData.students.map(user => user.userId));

        } else {
          throw new Error("Failed to fetch selected subject");
        }
      } catch (error) {
        console.error("Error fetching selected subject:", error);
      }
    };


    fetchSelectedCategory();

  }, [subjectId, token]);



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://10.0.130.222:8081/api/user/admin/available-professors", {
          headers: {
            Authorization: `Bearer ${token}`, // Dodajte ovu liniju kako biste poslali token
            "Content-Type": "application/json", // Ovisno o potrebi, možda trebate dodati i Content-Type
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await response.json();
        console.log(userData); // Log fetched user data
        setProfessor(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      try {
        const response = await fetch("http://10.0.130.222:8081/api/user/admin/students", {
          headers: {
            Authorization: `Bearer ${token}`, // Dodajte ovu liniju kako biste poslali token
            "Content-Type": "application/json", // Ovisno o potrebi, možda trebate dodati i Content-Type
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const usersData = await response.json();
        console.log(usersData); // Log fetched user data
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchUsers();
    // setProfessor([...professor, oldProfessor])
  }, [dispatch, token]);

  useEffect(() => {
    setProfessor(professor => [...professor, oldProfessor]);

  }, [oldProfessor]);


  return (
      <div className="adminAddCategoryPage__container">
        <div className="adminAddCategoryPage__sidebar">
          <Sidebar />
        </div>
        <div className="adminAddCategoryPage__content">
          <FormContainer>
            <h2>Update Subject</h2>

            <Form onSubmit={submitHandler}>
              <Form.Group className="my-3" controlId="title">
                <Form.Label className="label"> <h5>Title</h5> </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Subject Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="description">
                <Form.Label className="label"> <h5>Description</h5> </Form.Label>
                <Form.Control
                    style={{ textAlign: "top" }}
                    as="textarea"
                    rows="5"
                    type="text"
                    placeholder="Enter Subject Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="professor">
                <Form.Label className="label" > <h5>Choose Professor</h5> </Form.Label>
                <Form.Select
                    aria-label="Choose Professor"
                    onChange={(e) => {
                      const selectedValue = parseInt(e.target.value);
                      setSelectedUser(selectedValue);
                    }}
                    value={selectedUser || (oldProfessor && oldProfessor.userId) || ""}
                >
                  {oldProfessor && (
                      <option value={oldProfessor.userId}>
                        {oldProfessor.firstName} {oldProfessor.lastName}
                      </option>
                  )}
                  {professor.map((user) => (
                      <option key={user.userId} value={user.userId}>
                        {user.firstName} {user.lastName}
                      </option>
                  ))}
                </Form.Select>

              </Form.Group>
              <div style={{ marginBottom: '20px' }}></div>

              <Form.Group controlId="students">

                <Form.Label className="label"> <h5>Choose Students</h5> </Form.Label>

                <Form.Group controlId="searchStudents">

                  <Form.Control
                      type="text"
                      placeholder="Search students by email"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>

                <div className="studentCheckboxes">
                  {users
                      .filter((user) =>
                          user.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((user) => (
                          <Form.Check
                              key={user.userId}
                              type="checkbox"
                              id={`user-${user.userId}`}
                              label={user.email}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                if (isChecked) {
                                  setSelectedStudents((prevSelected) => [
                                    ...prevSelected,
                                    user.userId,
                                  ]);
                                } else {
                                  setSelectedStudents((prevSelected) =>
                                      prevSelected.filter(
                                          (selectedUserId) => selectedUserId !== user.userId
                                      )
                                  );
                                }
                              }}
                              checked={selectedStudents.includes(user.userId)}
                          />
                      ))}
                </div>
              </Form.Group>

              <Button
                  className="my-3 adminAddCategoryPage__content--button"
                  type="submit"
                  variant=""
              >
                Update
              </Button>
            </Form>
          </FormContainer>
        </div>
      </div>
  );
};

export default AdminUpdateCategoryPage;