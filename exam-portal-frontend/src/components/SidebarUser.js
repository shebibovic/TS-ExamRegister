import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../actions/categoriesActions";
import { TbLayoutGrid, TbReport } from "react-icons/tb";

const SidebarUser = ({ children }) => {
  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");
  const [menuItems, setMenuItems] = useState([
    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "/userSubjects",
      name: "Subjects",
      icon: <TbLayoutGrid />,
    },
    {
      path: "/quizzes",
      name: "All Exams",
      icon: <MdQuiz />,
    },
  ]);

  //const [isOpen, setIsOpen] = useState(false);
  //const toggle = () => setIsOpen(!isOpen);



  return (
    <div
      className="container"
      style={{ display: "flex", width: "auto", margin: "0px", padding: "0px" }}
    >
      <div style={{ width: "12em"}} className="sidebar">
        <div className="top_section">
          {/* <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1> */}
          <div style={{ marginLeft:"50px"}} className="bars">
            <FaBars />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="sidemenulink"
            activeclassname="sidemenulink-active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display:"block" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SidebarUser;
