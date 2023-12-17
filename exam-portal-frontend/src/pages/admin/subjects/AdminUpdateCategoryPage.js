import React, {useEffect, useState} from "react";
import "./AdminUpdateCategoryPage.css";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import FormContainer from "../../../components/FormContainer";
import Sidebar from "../../../components/Sidebar";
import { updateCategory } from "../../../actions/categoriesActions";
import { useNavigate } from "react-router-dom";

const AdminUpdateCategoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const catId = params.catId;

  const oldCategory = useSelector((state) =>
    state.categoriesReducer.categories.filter((cat) => cat.catId == catId)
  )[0];
  const [title, setTitle] = useState(oldCategory ? oldCategory.title : "");
  const [description, setDescription] = useState(
    oldCategory ? oldCategory.description : ""
  );
  const token = localStorage.getItem("jwtToken");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [professor, setProfessor] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const category = {
      catId: catId,
      title: title,
      description: description,
      userId: selectedUser,
      students: selectedStudents,
    };

    try {
      dispatch({ type: categoriesConstants.UPDATE_CATEGORY_REQUEST });
      const updateResponse = await updateCategory(dispatch, category, token);
      if (updateResponse.isUpdated) {
        dispatch({
          type: categoriesConstants.UPDATE_CATEGORY_SUCCESS,
          payload: updateResponse.data,
        });
        swal("Subject Updated!", `${title} successfully updated`, "success");
      }
      navigate("/adminCategories");
    } catch (error) {
      console.error("Error updating category:", error);
      // Handle error (e.g., show an error message)
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/subject/profesors", {
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
        const response = await fetch("/api/subject/students", {
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
    <div className="adminUpdateCategoryPage__container">
      <div className="adminUpdateCategoryPage__sidebar">
        <Sidebar />
      </div>
      <div className="adminUpdateCategoryPage__content">
        <FormContainer>
          <h2>Update Subject</h2>
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
              className="my-3 adminUpdateCategoryPage__content--button"
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
