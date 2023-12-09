import * as categoriesConstants from "../constants/categoriesConstants";
import categoriesServices from "../services/categoriesServices";

export const addCategory = async (dispatch, category, token) => {
  dispatch({ type: categoriesConstants.ADD_CATEGORY_REQUEST });
  const { data, isAdded, error } = await categoriesServices.addCategory(
    category,
    token
  );
  if (isAdded) {
    return dispatch({
      type: categoriesConstants.ADD_CATEGORY_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: categoriesConstants.ADD_CATEGORY_FAILURE,
      payload: error,
    });
  }
};

export const fetchCategories = async (dispatch, token, categoryId = null) => {
  dispatch({ type: categoriesConstants.FETCH_CATEGORIES_REQUEST });
  const data = await categoriesServices.fetchCategories(token);

  // Filter by categoryId if provided
  if (categoryId) {
    const categoryDetails = data.find(cat => cat.catId === categoryId);
    return dispatch({
      type: categoriesConstants.FETCH_CATEGORIES_SUCCESS,
      payload: categoryDetails ? [categoryDetails] : [], // Return an array with the found category or an empty array if not found
    });
  }

  // Otherwise, return all categories
  return dispatch({
    type: categoriesConstants.FETCH_CATEGORIES_SUCCESS,
    payload: data,
  });
};

export const updateCategory = async (dispatch, category, token) => {
  dispatch({ type: categoriesConstants.UPDATE_CATEGORY_REQUEST });
  const { data, isUpdated, error } = await categoriesServices.updateCategory(
    category,
    token
  );
  if (isUpdated) {
    return dispatch({
      type: categoriesConstants.UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: categoriesConstants.UPDATE_CATEGORY_FAILURE,
      payload: error,
    });
  }
};

export const deleteCategory = async (dispatch, catId, token) => {
  dispatch({ type: categoriesConstants.DELETE_CATEGORY_REQUEST });
  const { isDeleted, error } = await categoriesServices.deleteCategory(
    catId,
    token
  );
  if (isDeleted) {
    return dispatch({
      type: categoriesConstants.DELETE_CATEGORY_SUCCESS,
      payload: catId,
    });
  } else {
    return dispatch({
      type: categoriesConstants.DELETE_CATEGORY_FAILURE,
      payload: error,
    });
  }
};
