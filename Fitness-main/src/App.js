import React, { useEffect } from "react";
import "./assets/main.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import About from "./pages/About/About";
import Komanda from "./pages/Komanda/Komanda";
import Trenajor from "./pages/Trenajor/Trenajor";
import Klubniyikarti from "./pages/Klubniyikarti/Klubniyikarti";
import Mapcomponent from "./pages/Map/Map";
import Login from "./pages/Login/Login";
import Createaccount from "./pages/Createaccout/Createaccount";
import Sbrosparol from "./pages/Sbrosparol/Sbrosparol";
import Profile from "./pages/Profile/Profile";
import Profilcart from "./pages/Profilcart/Profilcart";
import { useLocation } from "react-router-dom";
import Yoga from "./pages/Yoga/Yoga";
import Gurpavoyznaniya from "./pages/Gurpavoyznaniya/Gurpavoyznaniya";
import Saykstudio from "./pages/Sayklstudio/Saykstudio";
import Bassen from "./pages/Bassen/Bassen";
import Detskiyfitnes from "./pages/Detskiyfitnes/Detskiyfitnes";
import Boevi from "./pages/Boevi/Boevi";
import Raspisaniya from "./pages/Raspisaniya/Raspisaniya";
import ProfileSchedule from "./pages/ProfileSchedule/ProfileSchedule";
import PrivateRoutes from "./untils/PrivateRoute";
import ChangePassword from "./pages/Sbrosparol/Changepassword";
import NotFound from "./pages/Notfound/Notfound";
const token = localStorage.getItem("token");
const App = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/komanda" element={<Komanda />} />
          <Route path="/trejanor" element={<Trenajor />} />
          <Route path="/klubcart" element={<Klubniyikarti />} />
          <Route path="/map" element={<Mapcomponent />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/allzananiya" element={<Gurpavoyznaniya />} />
          <Route path="/saykstudio" element={<Saykstudio />} />
          <Route path="/bassen" element={<Bassen />} />
          <Route path="/detskiyfitnes" element={<Detskiyfitnes />} />
          <Route path="/boevi" element={<Boevi />} />
          <Route path="/schedule" element={<Raspisaniya />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profilecart" element={<Profilcart />} />
          <Route path="/profilschedule" element={<ProfileSchedule />} />
        </Route>
        {!token && (
          <>
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/sbrosparol" element={<Sbrosparol />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createaccount" element={<Createaccount />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
