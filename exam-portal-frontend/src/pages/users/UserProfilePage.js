import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { fetchCategories } from "../../actions/categoriesActions";
import { fetchQuizzes } from "../../actions/quizzesActions";
import SidebarUser from "../../components/SidebarUser";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    // Redirect to login page if token is not present
    if (!token) {
      navigate("/");
    }

    // Fetch categories and quizzes (assuming these actions require a token)
    fetchCategories(dispatch, token);
    fetchQuizzes(dispatch, token);
  }, [dispatch, navigate, token]);

  useEffect(() => {
    console.log("Token:", token);
    console.log("User:", user);
    console.log("User Roles:", user && user.role);

    if (token && user && user.role && user.role.length > 0) {
      user.role.map((r) => {
        if (r["roleName"] === "ADMIN") return navigate("/adminProfile");
        else return navigate("/profile");
      });
    }
  }, []);
  useEffect(() => {
    console.log("User Roles:", user && user.role);
  }, [user]);

  return (
      <div className="userProfilePage__container">
        <div className="userProfilePage__sidebar">
          <SidebarUser />
        </div>

        {user && (
            <div className="userProfilePage__content">
              <Image
                  className="userProfilePage__content--profilePic"
                  width="20%"
                  height="20%"
                  roundedCircle
                  src="images/user.png"
              />

              <Table bordered className="userProfilePage__content--table">
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
                    {user && user.role ? (
                        user.role.length > 0 ? (
                            user.roles[0].roleName
                        ) : (
                            "Role not assigned"
                        )
                    ) : (
                        "Role information unavailable"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Account Status</td>
                  <td>{`${user.enabled}`}</td>
                </tr>
                </tbody>
              </Table>
            </div>
        )}
      </div>
  );
};

export default UserProfilePage;
