import React from "react";
import "./order.css";
import closeimg from "../../assets/Images/svg/close.svg";
import boldybuild from "../../assets/Images/png/boldybuilder.png";
import { useNavigate } from "react-router-dom";
const Orderpreyti = ({ onClose }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    onClose();
    navigate("/profilecart");
  };
  return (
    <div className="ordermodal">
      <img className="ordermodal__img" src={boldybuild} alt="" />
      <button onClick={() => onClose()} className="ordermodal__closebtn">
        <img src={closeimg} alt={"close"} />
      </button>
      <div className="ordermodal__box">
        <h3 className="odermodal__title">Спасибо!</h3>
        <p className="ordermodal__doc">
          Ваш персональный код выслан в личный кабинет
        </p>
        <button onClick={() => handleNavigate()} className="orderpretyi__btn">
          Перейти
        </button>
      </div>
    </div>
  );
};

export default Orderpreyti;
