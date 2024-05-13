import React from "react";
import ProfileNavbar from "../../components/Profilecomponents/ProfileNavbar/ProfileNavbar";
import Profileabout from "../../components/Profilecomponents/Profileabout/Profileabout";
import "./profile.css";

const Profile = () => {
  return (
    <section className="profile">
      <div className="container">
        <h2 className="profile__title">Профиль</h2>
        <div className="profile__wrapper">
          <ProfileNavbar />
          <Profileabout />
        </div>
      </div>
    </section>
  );
};

export default Profile;
