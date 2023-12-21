import axios from "axios";

const fetchQuestionsByQuiz = async (quizId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(
      `/api/question/?quizId=${quizId}`,
      config
    );
    return data;
  } catch (error) {
    console.error(
      "questionsServices:fetchQuestionsByQuiz() Error: ",
      error.response.statusText
    );
    return error.response.statusText;
  }
};

const addQuestion = async (question, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.post("/api/question/", question, config);
    return { data: data, isAdded: true, error: null };
  } catch (error) {
    console.error(
      "questionsServices:addQuestion()  Error: ",
      error.response.statusText
    );
    return { data: null, isAdded: false, error: error.response.statusText };
  }
};

const deleteQuestion = async (quesId, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.delete(`/api/question/${quesId}`, config);
    return {
      isDeleted: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "questionsServices:deleteQuestion() Error: ",
      error.response.statusText
    );
    return {
      isDeleted: false,
      error: error.response.statusText,
    };
  }
};

const updateQuestion = async (question, token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.put(
      `/api/question/${question.quesId}`,
      question,
      config
    );
    return {
      data: data,
      isUpdated: true,
      error: null,
    };
  } catch (error) {
    console.error(
      "questionsServices:updateQuestion() Error: ",
      error.response.statusText
    );
    return {
      data: null,
      isUpdated: false,
      error: error.response.statusText,
    };
  }
};

const questionsServices = {
  fetchQuestionsByQuiz,
  addQuestion,
  deleteQuestion,
  updateQuestion,
};
export default questionsServices;
