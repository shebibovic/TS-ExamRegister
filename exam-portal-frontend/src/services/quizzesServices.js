import axios from "axios";

axios.defaults.baseURL = "http://10.0.142.35:8081"



const addQuiz = async (quiz, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.post("/api/exam/professor/add/", quiz, config); 
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
        "quizzesServices:addQuiz()  Error: ",
        error.response.statusText
    );
    return { data: null, isAdded: false, error: error.response.statusText };
  }
};


const deleteQuiz = async (examId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.delete(`/api/exam/professor/delete/${examId}/`, config);
    return {
      isDeleted: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "quizzesServices:deleteQuiz()  Error: ",
      error.response.statusText
    );
    return {
      isDeleted: false,
      error: error.response.statusText,
    };
  }
};

const updateQuiz = async (quiz, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put(`/api/quiz/${quiz.quizId}/`, quiz, config);
    return {
      data: data,
      isUpdated: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "quizzesServices:updateQuiz()  Error: ",
      error.response.statusText
    );
    return {
      data: null,
      isUpdated: false,
      error: error.response.statusText,
    };
  }
};

const quizzesService = {  addQuiz, deleteQuiz, updateQuiz };
export default quizzesService;
