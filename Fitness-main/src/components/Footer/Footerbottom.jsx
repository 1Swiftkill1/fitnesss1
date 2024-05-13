import React from "react";
import "./footer.css";
import sitelogo from "../../assets/Images/svg/silelogo.svg";
import telegram from "../../assets/Images/svg/telegram.svg";
import instagram from "../../assets/Images/svg/instagram.svg";
import vk from "../../assets/Images/svg/vk.svg";
import { useNavigate } from "react-router-dom";
const Footerbottom = () => {
  const navigate = useNavigate();
  return (
    <section className="footerbottom">
      <div className="container">
        <div className="footerbottom__wrapper">
          <div onClick={() => navigate("/")} className="footerbottom__logo">
            <img src={sitelogo} alt="sitelog" />
          </div>
          <p className="footerbottom__report">© 2024 Фитнес-клуб Flex Force</p>
          <div className="footerbottom__social">
            <a target="_blank" href="https://t.me/Swiftkill">
              <img src={telegram} alt="" />
            </a>
            <a target="_blank" href="https://www.instagram.com/werlamma">
              <img src={instagram} alt="" />
            </a>
            <a target="_blank" href="https://vk.com/1swiftkill1">
              <img src={vk} alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footerbottom;
