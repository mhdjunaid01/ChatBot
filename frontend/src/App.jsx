import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import AuthPage from "./pages/Auth";
import ChatBot from "./components/ui/chatBot";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  const { auth, loading } = useContext(AuthContext);



  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            auth.authenticated ? (
              <Navigate to="/chatbot" replace />
            ) : (
              <AuthPage />
            )
          }
        />

        <Route
          path="/chatbot"
          element={
            auth.authenticated ? <ChatBot /> : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="*"
          element={
            auth.authenticated ? (
              <Navigate to="/chatbot" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
