import React, { useEffect, useState } from "react";
import "./ProfessorCategoriesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Sidebar from "../../../components/SidebarProfessor";
import {
    deleteCategory,
    fetchCategories,
} from "../../../actions/categoriesActions";
import swal from "sweetalert";

const ProfessorCategoriesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwtToken");

    const categoriesReducer = useSelector((state) => state.categoriesReducer);
    const [categories, setCategories] = useState(categoriesReducer.categories);

    const categoryClickHandler = (catId) => {
        navigate(`/professorCategories/${catId}`);
    };



    const deleteCategoryHandler = (event, category) => {
        event.stopPropagation();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this subject!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteCategory(dispatch, category.catId, token).then((data) => {
                    if (data.type === categoriesConstants.DELETE_CATEGORY_SUCCESS) {
                        swal(
                            "Subject Deleted!",
                            `${category.title} succesfully deleted`,
                            "success"
                        );
                    } else {
                        swal(
                            "Subject Not Deleted!",
                            `${category.title} not deleted`,
                            "error"
                        );
                    }
                });
            } else {
                swal(`${category.title} is safe`);
            }
        });
    };

    useEffect(() => {
        if (!localStorage.getItem("jwtToken")) navigate("/");
    }, []);

    useEffect(() => {
        if (categories.length === 0) {
            fetchCategories(dispatch, token).then((data) => {
                setCategories(data.payload);
            });
        }
    }, []);

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
                            No subjects are present.
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
                                        onClick={() => categoryClickHandler(cat.catId)}
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{cat.title}</div>
                                            {cat.description}
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

export default ProfessorCategoriesPage;
