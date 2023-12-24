import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import SidebarUser from "../../components/SidebarUser";
import "./UserProfilePage.css";
import { Button } from "react-bootstrap";
import swal from "sweetalert";



const UserProfilePage = () => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const handleEditData = () => {
    navigate('/user-edit');
  };
  const handleChangePassword = async () => {
     try{ const response = await fetch('http://10.0.130.222:8081/api/change-password', {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
  });
  if(response.status==200){
      swal("Request sent!", `Request successfully sent`, "success");
  }
  else {
      swal("Request was not sent!", `Request was not sent`, "error");
  }

 }catch(error){
  console.error('Error sending request:', error);
 }
  }





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
                    <Button
                        variant=""
                        className="my-3"
                        type="submit"
                        style={{ backgroundColor: 'rgb(68 177 49)', color: 'white' }}
                        onClick={handleEditData}
                    >
                        Edit data
                    </Button>
                    <Button
                        variant=""
                        className="my-3"
                        type="submit"
                        style={{ backgroundColor: 'rgb(68 177 49)', color: 'white' }}
                        onClick={handleChangePassword}
                    >
                        Change password
                    </Button>
      </div>
      
  );
};

export default UserProfilePage;
