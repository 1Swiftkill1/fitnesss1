import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import worldimg from "../../../assets/Images/svg/world.svg";
import klubcard from "../../../assets/Images/svg/klubcard.svg";
import raspisani from "../../../assets/Images/svg/raspisaniimg.svg";
import profilearrow from "../../../assets/Images/svg/profilearrow.svg";
import profileimg from "../../../assets/Images/svg/profile.svg";
import "./profilenav.css";
import { Context } from "../../../context/Context";
const ProfileNavbar = () => {
  const { mainavatar, firstname } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="profilenavbar">
      <div className="profile__header">
        <img
          onClick={() => navigate("/profile")}
          className="profile__img"
          src={mainavatar ? mainavatar : profileimg}
          alt=""
        />
        <img
          onClick={() => navigate("/profile")}
          className="profile__arrow"
          src={profilearrow}
          alt=""
        />
      </div>
      <ul className="profile__list">
        <li onClick={() => navigate("/profile")} className="profile__listitem">
          <img src={worldimg} alt="" />
          <span className="profile__listiem__text">Владимир</span>
        </li>
        <li
          onClick={() => navigate("/profilecart")}
          className="profile__listitem"
        >
          <img src={klubcard} alt="" />
          <span className="profile__listiem__text">Клубные карты</span>
        </li>
        <li
          onClick={() => navigate("/profilschedule")}
          className="profile__listitem"
        >
          <img src={raspisani} alt="" />
          <span className="profile__listiem__text">Расписание</span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileNavbar;
