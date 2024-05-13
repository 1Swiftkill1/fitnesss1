import { Navigate } from "react-router-dom";
import Layout from "../pages/Layout/Layout";

const PrivateRoutes = () => {
  let auth = {
    status: localStorage.getItem("token"),
  };
  return auth.status ? <Layout /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
