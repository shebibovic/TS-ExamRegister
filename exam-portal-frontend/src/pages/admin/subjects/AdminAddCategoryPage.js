import React, { useState, useEffect } from "react";
import "./AdminAddCategoryPage.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import FormContainer from "../../../components/FormContainer";
import Sidebar from "../../../components/Sidebar";
import {
  addCategory,
  fetchCategories,
} from "../../../actions/categoriesActions";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AdminAddCategoryPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // State to hold selected user
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [professor, setProfessor] = useState([]);
  const [noProfessors, setNoProfessors] = useState(false);
  const token = localStorage.getItem("jwtToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedStudents, setSelectedStudents] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const category = {
      title: title,
      description: description,
      userId: selectedUser,
      students: selectedStudents,
    };
    addCategory(dispatch, category, token).then((data) => {
      if (data.type === categoriesConstants.ADD_CATEGORY_SUCCESS) {
        swal("Subject Added!", `${title} successfully added`, "success");
      } else {
        swal("Subject Not Added!", `${title} not added`, "error");
      }
    });
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/admin/available-professors", {
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
        if (userData && userData.length > 0) {
          setProfessor(userData);
        } else {
          setNoProfessors(true);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      try {
        const response = await fetch("/api/user/admin/students", {
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
  }, [dispatch, token]);

  return (
      <div className="adminAddCategoryPage__container">
        <div className="adminAddCategoryPage__sidebar">
          <Sidebar />
        </div>
        <div className="adminAddCategoryPage__content">
          <FormContainer>
            <h2>Add Subject</h2>

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

              <div>
                {noProfessors ? (
                    <p> <h4>No available professors now. You cannot add this subject</h4> </p>) : (
                    <Form.Group controlId="professor">
                      <Form.Label className="label">
                        <h5>Choose Professor</h5>
                      </Form.Label>
                      <Form.Select
                          aria-label="Choose Professor"
                          onChange={(e) => setSelectedUser(e.target.value)}
                          value={selectedUser}
                      >
                        <option value="">Choose Professor</option>
                        {professor.map((user) => (
                            <option key={user.userId} value={user.userId}>
                              {user.firstName} {user.lastName}
                            </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                )}
              </div>

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
                Add
              </Button>
            </Form>
          </FormContainer>
        </div>
      </div>
  );
};

export default AdminAddCategoryPage;
