import axios from "axios";

axios.defaults.baseURL = "http://10.0.142.35:8081"


const fetchCategories = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get("/api/subject/admin", config);
    return data;
  } catch (error) {
    console.error(
        "categoryService:fetchCategories() Error: ",
        error.response.statusText
    );
    return error.response.statusText;
  }
};

const addCategory = async (cat, token, userRole) => {
  try {

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const professor = {
      userId: parseInt(cat.userId),
      role: { roleName: "PROFESSOR" }
    };
    const category = {
      title: cat.title,
      description: cat.description,
      professorId: professor.userId,
      students: cat.students
    };
    const { data } = await axios.post("/api/subject/admin/add", category, config);
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
        "categoryService:addCategory() Error: ",
        error.response ? error.response.statusText : error.message
    );
    return {
      data: null,
      isAdded: false,
      error: error.response ? error.response.statusText : error.message
    };
  }
};

const deleteCategory = async (catId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.delete(`/api/subject/admin/delete/${catId}/`, config);
    return {
      isDeleted: true,
      error: null,
    };
  } catch (error) {
    console.error(
        "categoryService:deleteCategory()  Error: ",
        error.response.statusText
    );
    return {
      isDeleted: false,
      error: error.response.statusText,
    };
  }
};

const updateCategory = async (category, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post(
        `/api/subject/admin/update`,
        category,
        config
    );
    return {
      data: data,
      isUpdated: true,
      error: null,
    };
  } catch (error) {
    console.error(
        "categoryService:updateCategory()  Error: ",
        error.response.statusText
    );
    return {
      data: null,
      isUpdated: false,
      error: error.response.statusText,
    };
  }
};

const categoriesService = {
  addCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
};
export default categoriesService;