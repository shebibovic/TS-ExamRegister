import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Image from "react-bootstrap/Image";
import { fetchCategories } from "../../actions/categoriesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";

const AdminProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    if (!loginReducer.user) {
      // Fetch user data here if not available in the reducer
      // Example: dispatch action to get user details using the token
    }

    fetchCategories(dispatch, token);
    fetchQuizzes(dispatch, token);
  }, [dispatch, navigate, token, loginReducer.user]);

  const user = loginReducer.user;

  if (!user) {
    return <div>Loading...</div>; // You might want to show a loading indicator while fetching user data
  }

  return (
      <div className="adminProfilePage__container">
        <div className="adminProfilePage__sidebar">
          <Sidebar />
        </div>
        <div className="adminProfilePage__content">
          <Image
              className="adminProfilePage__content--profilePic"
              width="20%"
              height="20%"
              roundedCircle
              src="images/user.png"
          />

          <Table bordered className="adminProfilePage__content--table">
            <tbody>
            <tr>
              <td>Name</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.username}</td>
            </tr>

            <tr>
              <td>Role</td>
              <td>
                {user.role.roleName}
              </td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{`${user.active}`}</td>
            </tr>
            </tbody>
          </Table>
        </div>
      </div>
  );
};

export default AdminProfilePage;
