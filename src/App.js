import "./App.css";
import Signup from "./Components/SignupPage";
import Login from "./Components/LoginPage";
import MainPage from "./Components/MainPage";
import Profile from "./Components/Profile";
import Layout from "./Layout";
import { UserAuthContextProvider } from "./Components/Contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <UserAuthContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/wecomepage"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createProfile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </UserAuthContextProvider>
  );
}

export default App;
