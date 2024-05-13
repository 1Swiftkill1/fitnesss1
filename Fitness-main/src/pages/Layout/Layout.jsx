import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Footerbottom from "../../components/Footer/Footerbottom";
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <Footerbottom />
    </div>
  );
};

export default Layout;
