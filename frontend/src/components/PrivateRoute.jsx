import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    jwtDecode(token); // token valid hai ya nahi
    return(<div>{ children}</div>);
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
