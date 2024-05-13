import React from "react";
import timeimg from "../../assets/Images/svg/time.svg";
import "./style.css";
import personimg from "../../assets/Images/svg/person.svg";
export const ProfileRaspisaninner = ({ item }) => {
  return (
    <div className="raspisaniinner">
      <h4 className="raspisaniinner__title">
        {" "}
        {item?.service_item?.name
          ? item?.service_item?.name
          : item?.service_title}
      </h4>
      <h5 className="raspisaninner__about">
        <img className="raspisaninner__img" src={timeimg} alt="icon" />
        <span className="raspisaninne__text">
          {item?.date} <br />
          {item?.start_time?.slice(0, 5)} - {item?.end_time?.slice(0, 5)}
        </span>
      </h5>
      <h5 className="raspisaninner__about">
        <img className="raspisaninner__img" src={personimg} alt="icon" />
        <span className="raspisaninne__text">{item?.trainer}</span>
      </h5>
    </div>
  );
};
