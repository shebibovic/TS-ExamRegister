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
import UserProfilePage from "./pages/users/UserProfilePage";
import UserQuizzesPage from "./pages/users/UserQuizzesPage";
import AdminSubjectID from "./pages/admin/subjects/AdminSubjectID";
import ProfessorProfilePage from "./pages/professor/ProfessorProfilePage";
import AddUser from "./pages/admin/users/AddUser";
import ProfessorQuizzesPage from "./pages/professor/exams/ProfessorQuizzesPage";
import ProfessorAddQuiz from "./pages/professor/exams/ProfessorAddQuiz";
import ProfessorSubjectID from "./pages/professor/subjects/ProfessorSubjectID";
import UserSubjects from "./pages/users/UserSubjects";
import UserSubjectID from "./pages/users/UserSubjectID";
import AdminUsers from "./pages/admin/users/AdminUsersPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import GuardedRoute from "./components/GuardedRoute";
import { useState } from "react";
import { useEffect } from "react";
import UnguardedRoute from "./components/UnGuardedRoute";
import UserEditPage from "./pages/users/UserEditPage";
import ProfessorEditPage from "./pages/professor/ProfessorEditPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import QuizDetails from "./pages/professor/exams/QuizDetails";


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('jwtToken');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn])

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/professor-edit" element={
          <GuardedRoute role={"PROFESSOR"}>
            <ProfessorEditPage />
          </GuardedRoute>} />

        <Route path="/student-edit" element={
          <GuardedRoute role={"STUDENT"}>
            <UserEditPage />
          </GuardedRoute>} />

        <Route path="/" element={
          <UnguardedRoute>
            <LoginPage />
          </UnguardedRoute>} />
        <Route path="/login" element={
          <UnguardedRoute>
            <LoginPage />
          </UnguardedRoute>} />
        <Route path="/register" element={
          <UnguardedRoute>
            <RegisterPage />
          </UnguardedRoute>} />
        <Route path="/resetPassword" element={
          <GuardedRoute anyRole={true}>
            <ResetPasswordPage />
          </GuardedRoute>
        } />

        <Route path="/change-Password/:code" element={
          <GuardedRoute anyRole={true}>
            <ChangePasswordPage />
          </GuardedRoute>
        } />

        <Route path="/adminProfile" element={
          <GuardedRoute role={"ADMIN"}>
            <AdminProfilePage />
          </GuardedRoute>
        } />
        <Route path="/adminCategories" element={
          <GuardedRoute role={"ADMIN"}>
            <AdminCategoriesPage />
          </GuardedRoute>
        } />
        <Route path="/adminAddCategory" element={
          <GuardedRoute role={"ADMIN"}>
            <AdminAddCategoryPage />
          </GuardedRoute>
        } />
        <Route
          path="/adminUpdateCategory/:catId"
          element={
            <GuardedRoute role={"ADMIN"}>
              <AdminUpdateCategoryPage />
            </GuardedRoute>
          }
        />
        <Route path="/adminQuizzes" element={
          <GuardedRoute role={"ADMIN"}>
            <AdminQuizzesPage />
          </GuardedRoute>
        } />
        <Route path="/adminCategories/:catId" element={
          <GuardedRoute role={"ADMIN"}>
            <AdminSubjectID />
          </GuardedRoute>
        } />
        <Route path="/addUser" element={
          <GuardedRoute role={"ADMIN"}>
            <AddUser />
          </GuardedRoute>
        } />
        <Route path="/allUsers" element={
          <GuardedRoute role={"ADMIN"}>
            <AdminUsers />
          </GuardedRoute>
        } />
        <Route path="/profile" element={
          <GuardedRoute role={"STUDENT"}>
            <UserProfilePage />
          </GuardedRoute>
        } />
        <Route path="/quizzes" element={
          <GuardedRoute role={"STUDENT"}>
            <UserQuizzesPage />
          </GuardedRoute>
        } />
        <Route path="/userSubjects" element={
          <GuardedRoute role={"STUDENT"}>
            <UserSubjects />
          </GuardedRoute>
        } />
        <Route path="/userCategories/:catId" element={
          <GuardedRoute role={"STUDENT"}>
            <UserSubjectID />
          </GuardedRoute>
        } />
        <Route path="/professorProfile" element={
          <GuardedRoute role={"PROFESSOR"}>
            <ProfessorProfilePage />
          </GuardedRoute>
        } />
        <Route path="/professorQuizzes" element={
          <GuardedRoute role={"PROFESSOR"}>
            <ProfessorQuizzesPage />
          </GuardedRoute>
        } />
        <Route path="/quizzes/:examId" element={
          <GuardedRoute role={"PROFESSOR"}>
            <QuizDetails />
          </GuardedRoute>
        } />
        <Route path="/professorAddQuiz" element={
          <GuardedRoute role={"PROFESSOR"}>
            <ProfessorAddQuiz />
          </GuardedRoute>
        } />
        <Route path="/professorCategories/:catId" element={
          <GuardedRoute role={"PROFESSOR"}>
            <ProfessorSubjectID />
          </GuardedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
