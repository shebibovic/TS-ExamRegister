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

  const submitHandler = (e) => {
    e.preventDefault();
    const category = { catId: catId, title: title, description: description, userId: selectedUser, students: selectedUsers };
    updateCategory(dispatch, category, token).then((data) => {
      if (data.type === categoriesConstants.UPDATE_CATEGORY_SUCCESS) {
        swal("Subject Updated!", `${title} succesfully updated`, "success");
      } else {
        swal("Subject Not Updated!", `${title} not updated`, "error");
      }
    });
    navigate("/adminCategories");
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/category/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await response.json();
        console.log(usersData); // Log fetched user data
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

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
              {users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.username}
                  </option>
              ))}
            </Form.Select>

            <Form.Group controlId="students">
              <Form.Label>Choose Students (Multiple)</Form.Label>
              {users.map((user) => (
                  <Form.Check
                      key={user.userId}
                      type="checkbox"
                      id={`user-${user.userId}`}
                      label={user.username}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setSelectedUsers((prevSelected) => [...prevSelected, user.userId]);
                        } else {
                          setSelectedUsers((prevSelected) =>
                              prevSelected.filter((selectedUserId) => selectedUserId !== user.userId)
                          );
                        }
                      }}
                      checked={selectedUsers.includes(user.userId)}
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
