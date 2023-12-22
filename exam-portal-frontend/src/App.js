import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AdminAddCategoryPage from "./pages/admin/subjects/AdminAddCategoryPage";
import AdminCategoriesPage from "./pages/admin/subjects/AdminCategoriesPage";
import AdminUpdateCategoryPage from "./pages/admin/subjects/AdminUpdateCategoryPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminQuizzesPage from "./pages/admin/exams/AdminQuizzesPage";
import AdminAddQuiz from "./pages/admin/exams/AdminAddQuiz";
import AdminExamID from "./pages/admin/exams/AdminExamID";
import AdminUpdateQuiz from "./pages/admin/exams/AdminUpdateQuiz";
import AdminQuestionsPage from "./pages/admin/questions/AdminQuestionsPage";
import AdminAddQuestionsPage from "./pages/admin/questions/AdminAddQuestionsPage";
import AdminUpdateQuestionPage from "./pages/admin/questions/AdminUpdateQuestionPage";
import UserProfilePage from "./pages/users/UserProfilePage";
import UserQuizzesPage from "./pages/users/UserQuizzesPage";
import UserQuizManualPage from "./pages/users/UserQuizManualPage";
import UserQuestionsPage from "./pages/users/UserQuestionsPage";
import UserQuizResultPage from "./pages/users/UserQuizResultPage";
import RegisteredExams from "./pages/users/RegisteredExams";
import AdminQuizResultPage from "./pages/admin/AdminQuizResultPage";
import AdminSubjectID from "./pages/admin/subjects/AdminSubjectID";
import ProfessorProfilePage from "./pages/professor/ProfessorProfilePage";
import AddUser from "./pages/admin/users/AddUser";
import ProfessorCategoriesPage from "./pages/professor/subjects/ProfessorCategoriesPage";
import ProfessorQuizzesPage from "./pages/professor/exams/ProfessorQuizzesPage";
import ProfessorAddQuiz from "./pages/professor/exams/ProfessorAddQuiz";
import ProfessorSubjectID from "./pages/professor/subjects/ProfessorSubjectID";
import UserSubjects from "./pages/users/UserSubjects";
import UserSubjectID from "./pages/users/UserSubjectID";
import QuizDetails from "./pages/professor/exams/QuizDetails";
import AdminUsers from "./pages/admin/users/AdminUsersPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />

        <Route path="/adminProfile" element={<AdminProfilePage />} />
        <Route path="/adminCategories" element={<AdminCategoriesPage />} />
        <Route path="/adminAddCategory" element={<AdminAddCategoryPage />} />
        <Route
          path="/adminUpdateCategory/:catId"
          element={<AdminUpdateCategoryPage />}
        />
        <Route path="/adminQuizzes" element={<AdminQuizzesPage />} />
        <Route path="/adminCategories/:catId" element={<AdminSubjectID />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/allUsers" element={<AdminUsers />} />


        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/quizzes" element={<UserQuizzesPage />} />
        <Route path="/userSubjects" element={<UserSubjects />} />
        <Route path="/userCategories/:catId" element={<UserSubjectID />} />


        <Route path="/professorProfile" element={<ProfessorProfilePage />} />
        <Route path="/professorQuizzes" element={<ProfessorQuizzesPage />} />
        <Route path="/professorAddQuiz" element={<ProfessorAddQuiz />} />
        <Route path="/professorCategories/:catId" element={<ProfessorSubjectID />} />



      </Routes>
    </Router>
  );
};

export default App;
