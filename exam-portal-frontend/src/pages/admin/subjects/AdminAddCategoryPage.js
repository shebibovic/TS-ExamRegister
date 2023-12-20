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
  const token = localStorage.getItem("jwtToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedStudents, setSelectedStudents] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        const response = await fetch("/api/user/admin/professors", {
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject Title"
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
                rows="5"
                type="text"
                placeholder="Enter Subject Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

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


            <Form.Group controlId="students">
              <Form.Label>Choose Students (Multiple)</Form.Label>
              {users.map((users) => (
                  <Form.Check
                      key={users.userId}
                      type="checkbox"
                      id={`user-${users.userId}`}

                      label={users.email}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setSelectedStudents((prevSelected) => [...prevSelected, users.userId]);
                        } else {
                          setSelectedStudents((prevSelected) =>
                              prevSelected.filter((selectedUserId) => selectedUserId !== users.userId)
                          );
                        }
                      }}
                      checked={selectedStudents.includes(users.userId)}
                  />
              ))}
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
