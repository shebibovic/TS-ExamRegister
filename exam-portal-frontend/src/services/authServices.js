import axios from "axios";

axios.defaults.baseURL = "http://10.0.142.35:8081"

const register = async (user, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/user/admin/add/", user, config);
    if(data && data.userId){
      
      return {isRegistered:true, error:null};
    }
    else {
      console.error("authService:register() Error: ", data);
      return { isRegistered: false, error: data };
    }
  } catch (error) {
    console.error("authService:register() Error: ", error.response.statusText);
    return { isRegistered: false, error: error.response.statusText };
  }
};

const resetPassword = async (user, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/reset-password", user, config);
    if(data && data.userId){

      return {isReset:true, error:null};
    }
    else {
      console.error("authService:register() Error: ", data);
      return { isReset: false, error: data };
    }
  } catch (error) {
    console.error("authService:register() Error: ", error.response.statusText);
    return { isReset: false, error: error.response.statusText };
  }
};

//////////////

const login = async (username, password) => {
  try {
    const { data } = await axios.post("/api/login", {
      email: username,
      password: password,
    });

    if (data && data.jwtToken.length) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("jwtToken", data.jwtToken);
      return data;
    } else {
      console.error("authService:login() Error: ", data);
      return data;
    }
  } catch (error) {
    console.error("authService:login() Error: ", error.response.statusText);
    return error.response.statusText;
  }
};

const authServices = { register, login, resetPassword };
export default authServices;
