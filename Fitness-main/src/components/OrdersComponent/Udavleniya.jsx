import React from "react";
import udavleniyaicon from "../../assets/Images/svg/raspisaniimg.svg";
import closeimg from "../../assets/Images/svg/close.svg";
import { useNavigate } from "react-router-dom";
import "./order.css";
const token = localStorage.getItem("token");
const Udavleniya = ({
  onClose,
  openTrenajorModal,
  item,
  setSchedule,
  setService,
}) => {
  const navigate = useNavigate();
  const handleZapisat = () => {
    if (token) {
      onClose();
      setSchedule(item?.id);
      setService(item?.service);
      openTrenajorModal();
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="udavleniya">
      <button onClick={() => onClose()} className="udavleniya__closeimg">
        <img width={23} src={closeimg} alt="close" />
      </button>
      <h3 className="udavleniya__title">{item?.service_title}</h3>
      <h4 className="udavleniya__type">УСЛОВИЯ</h4>
      <div className="udavleniya__innerbox">
        <img className="udavleniya__icon" src={udavleniyaicon} alt="" />
        <div className="udavleniya__innerbox__text">
          <h5 className="udavleniya__date">
            {item?.date_name} {item?.start_time?.slice(0, 5)} -
            {item?.end_time?.slice(0, 5)}{" "}
          </h5>
          <h5 className="udavleniya__date">
            Участников: {item?.user_count}/{item?.participants}
          </h5>
        </div>
      </div>
      <h3 className="udavleniya__about__title">ВЕДЁТ ЗАНЯТИЕ</h3>
      <div className="udavleniya__trener__box">
        <img
          className="udavleniya__trener-img"
          src={`${process.env.REACT_APP_API_MEDIA}${item?.trainer?.avatar}`}
          alt=""
        />
        <p className="udavleniya__trener__name">{item?.trainer?.name}</p>
      </div>
      {item?.user_count < 10 && (
        <button onClick={() => handleZapisat()} className="udavleniya__btn">
          Записаться
        </button>
      )}
    </div>
  );
};

export default Udavleniya;
