import React, { useEffect, useState } from "react";
import "../admin/subjects/AdminCategoriesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Sidebar from "../../components/SidebarUser";

const UserSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwtToken");

    const categoriesReducer = useSelector((state) => state.categoriesReducer);
    const [categories, setCategories] = useState(categoriesReducer.categories);

    const categoryClickHandler = (subjectId) => {
        navigate(`/userCategories/${subjectId}`);
    };



    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) navigate("/");
    }, []);

    useEffect(() => {
        if (categories.length === 0) {
            const fetchCategories = async () => {
                try {
                    const response = await fetch("/api/subject/student/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setCategories(data); // Postavljanje dohvaćenih predmeta u stanje
                    } else {
                        throw new Error("Failed to fetch categories");
                    }
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            };

            fetchCategories();
        }
    }, [categories, token]);

    return (
        <div className="adminCategoriesPage__container">
            <div className="adminCategoriesPage__sidebar">
                <Sidebar />
            </div>
            <div className="adminCategoriesPage__content">
                <h2>Subjects</h2>
                {categories ? (
                    categories.length === 0 ? (
                        <Message>
                            No subjects are present. Try adding some subjects.
                        </Message>
                    ) : (
                        categories.map((cat, index) => {
                            return (
                                <ListGroup
                                    className="adminCategoriesPage__content--categoriesList"
                                    key={index}
                                >
                                    <ListGroup.Item
                                        style={{ borderWidth: "0px" }}
                                        className="d-flex"
                                        onClick={() => categoryClickHandler(cat.subjectId)}
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{cat.title} </div>
                                            {cat.description}
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                height: "90%",
                                                margin: "auto 2px",
                                            }}
                                        >
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            );
                        })
                    )
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    );
};

export default UserSubjects;
