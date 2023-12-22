import * as authConstants from "../constants/authConstants";
import authServices from "../services/authServices";

export const register = async (dispatch, user, token) => {
 dispatch({ type: authConstants.USER_REGISTER_REQUEST });
  const { isRegistered, error } = await authServices.register(user, token);
  if (isRegistered) {
    return dispatch({
      type: authConstants.USER_REGISTER_SUCCESS,
      payload: isRegistered,
    });
  } else {
    return dispatch({
      type: authConstants.USER_REGISTER_FAILURE,
      payload: error,
    });
  }
};

export const login = async (dispatch, email, password) => {
  dispatch({ type: authConstants.USER_LOGIN_REQUEST });
  try {
    const data = await authServices.login(email, password);

    if (data && data.user && data.user.role && data.user.role.roleName) {
      const { user } = data;
      const userDataWithRoles = {
        ...user,
        roles: [{ roleName: user.role.roleName }], // Create an array with a role object containing roleName
      };

      return dispatch({
        type: authConstants.USER_LOGIN_SUCCESS,
        payload: userDataWithRoles,
      });
    } else {
      return dispatch({
        type: authConstants.USER_LOGIN_FAILURE,
        payload: data,
      });
    }
  } catch (error) {
    console.error("authService:login() Error: ", error.response.statusText);
    return dispatch({
      type: authConstants.USER_LOGIN_FAILURE,
      payload: error.response.statusText,
    });
  }
};