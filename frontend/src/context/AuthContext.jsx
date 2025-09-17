import axiosInstance from "@/utils/axiosInstance";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [auth, setAuth] = useState({ user: null, authenticated: false });
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();
  const setAuthenticatedUser = (user) =>
    setAuth({ user: user, authenticated: true });

  const setUnauthenticatedUser = () => setAuth({ user: null, authenticated: false });

  const VerifyToken = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      if (response.data.success) {
        setAuthenticatedUser(response.data.user);
      } else {
        setUnauthenticatedUser();
      }
    } catch (error) {
      console.error(error);
      setUnauthenticatedUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    VerifyToken();
  }, []);

  const handleRegister = useCallback(
    async (event) => {
      event.preventDefault();
      setAuthLoading(true);
      try {
        const response = await axiosInstance.post(
          "/auth/registerUser",
          registerData
        );
        if (response.data.success) {
          setRegisterData({ userName: "", email: "", password: "" });
          toast.success("Student registered successfully!");
        }
      } catch (error) {
        console.error("Error registering student:", error);
        toast.error("Registration failed. Please try again.");
      } finally {
        setAuthLoading(false);
      }
    },
    [registerData]
  );

  const handleLogin = useCallback( async (event) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", signInData);
      if (response.data.success) {
        setAuthenticatedUser(response.data.data.user);
        setSignInData({ email: "", password: "" });
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  }, [signInData]);

  const handleLogout = useCallback(async () => {
    try {
      setUnauthenticatedUser();
      const response = await axiosInstance.post("/auth/logout");
      if (response.data.success) {
        toast.success("Logout successful!");      }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      navigate("/");
    }
  } , [navigate]);
  const contextValue = {
    auth,
    loading,
    authLoading,
    signInData,
    setSignInData,
    registerData,
    setRegisterData,
    handleRegister,
    setAuthenticatedUser,
    setUnauthenticatedUser,
    VerifyToken,
    handleLogin,
    handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-xl font-bold">Authenticating...</h1>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
