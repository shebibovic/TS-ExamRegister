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
                    {user.role.roleName}
                  </td>
                </tr>

                </tbody>
              </Table>
            </div>
        )}
      </div>
  );
};

export default UserProfilePage;
