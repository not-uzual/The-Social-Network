import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import ProfilePage from "./pages/ProfilePage"

import useCurrentUser from "./hooks/useCurrentUser";

function App() {
  const { loading } = useCurrentUser();
  const { userData } = useSelector((state) => state.user);
  
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={!userData ? <Landing /> : <Navigate to="/home" />}
      />
      <Route
        path="/home"
        element={userData ? <Home user={userData.user} /> : <Navigate to="/signin" />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/home" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/home" />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/home" />}
      />
      <Route path="/profile" element={userData ? <ProfilePage userData={userData} /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
