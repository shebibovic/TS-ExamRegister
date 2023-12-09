import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AdminAddCategoryPage from "./pages/admin/categories/AdminAddCategoryPage";
import AdminCategoriesPage from "./pages/admin/categories/AdminCategoriesPage";
import AdminUpdateCategoryPage from "./pages/admin/categories/AdminUpdateCategoryPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminQuizzesPage from "./pages/admin/quizzes/AdminQuizzesPage";
import AdminAddQuiz from "./pages/admin/quizzes/AdminAddQuiz";
import AdminUpdateQuiz from "./pages/admin/quizzes/AdminUpdateQuiz";
import AdminQuestionsPage from "./pages/admin/questions/AdminQuestionsPage";
import AdminAddQuestionsPage from "./pages/admin/questions/AdminAddQuestionsPage";
import AdminUpdateQuestionPage from "./pages/admin/questions/AdminUpdateQuestionPage";
import UserProfilePage from "./pages/users/UserProfilePage";
import UserQuizzesPage from "./pages/users/UserQuizzesPage";
import UserQuizManualPage from "./pages/users/UserQuizManualPage";
import UserQuestionsPage from "./pages/users/UserQuestionsPage";
import UserQuizResultPage from "./pages/users/UserQuizResultPage";
import AdminQuizResultPage from "./pages/admin/AdminQuizResultPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminProfile" element={<AdminProfilePage />} />
        <Route path="/adminCategories" element={<AdminCategoriesPage />} /> //ne radi
        <Route path="/adminAddCategory" element={<AdminAddCategoryPage />} />
        <Route
          path="/adminUpdateCategory/:catId"
          element={<AdminUpdateCategoryPage />}
        />
        <Route path="/adminQuizzes" element={<AdminQuizzesPage />} /> //ne radi
        <Route path="/adminAddQuiz" element={<AdminAddQuiz />} /> //ne radi
        <Route path="/adminUpdateQuiz/:quizId" element={<AdminUpdateQuiz />} /> //ne radi
        <Route path="/adminQuestions" element={<AdminQuestionsPage />} /> // ne radi
        <Route path="/adminAddQuestion" element={<AdminAddQuestionsPage />} />
        <Route path="/adminallResult" element={<AdminQuizResultPage />} />
        <Route
          path="/adminUpdateQuestion/:quesId"
          element={<AdminUpdateQuestionPage />}
        />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/quizzes" element={<UserQuizzesPage />} /> //ne radi
        <Route path="/quiz/*" element={<UserQuizzesPage />} />
        <Route path="/quizManual/" element={<UserQuizManualPage />} /> //ne radi
        <Route path="/questions/" element={<UserQuestionsPage />} />
        <Route path="/quizResults/" element={<UserQuizResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
