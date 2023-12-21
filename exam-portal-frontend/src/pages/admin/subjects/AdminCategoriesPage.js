import React, { useEffect, useState } from "react";
import "./AdminCategoriesPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ListGroup } from "react-bootstrap";
import * as categoriesConstants from "../../../constants/categoriesConstants";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import Sidebar from "../../../components/Sidebar";
import {
  deleteCategory,
  fetchCategories,
} from "../../../actions/categoriesActions";
import swal from "sweetalert";

const AdminCategoriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");

  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const [categories, setCategories] = useState(categoriesReducer.categories);

  const categoryClickHandler = (subjectId) => {
    console.log(subjectId)
    navigate(`/adminCategories/${subjectId}`);
  };

  const addNewCategoryHandler = () => {
    navigate("/adminAddCategory");
  };

  const updateCategoryHandler = (event, category) => {
    event.stopPropagation();
    navigate(`/adminUpdateCategory/${category.subjectId}/`);
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
        deleteCategory(dispatch, category.subjectId, token).then((data) => {
          if (data.type === categoriesConstants.DELETE_CATEGORY_SUCCESS) {
            swal(
              "Subject Deleted!",
              `${category.title} succesfully deleted`,
              "success"
            );
          } else {
            swal(
              "Subject Not Deleted!",
              `${category.title} not deleted. You have already deleted it. Please refresh the page.`,
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
                    className="d-flex" action key={index}
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
                      <div
                        onClick={(event) => updateCategoryHandler(event, cat)}
                        style={{
                          margin: "2px 8px",
                          textAlign: "center",
                          color: "rgb(68 177 49)",
                          fontWeight: "500",
                          cursor:"pointer"
                        }}
                      >{`Update`}</div>

                      <div
                        onClick={(event) => deleteCategoryHandler(event, cat)}
                        style={{
                          margin: "2px 8px",
                          textAlign: "center",
                          color: "red",
                          fontWeight: "500",
                          cursor:"pointer"
                        }}
                      >{`Delete`}</div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              );
            })
          )
        ) : (
          <Loader />
        )}
        <Button
          variant=""
          className="adminCategoriesPage__content--button"
          onClick={addNewCategoryHandler}
        >
          Add Subject
        </Button>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
