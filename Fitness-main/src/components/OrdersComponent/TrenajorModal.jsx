import React, { useEffect, useState } from "react";
import "./order.css";
import closeimg from "../../assets/Images/svg/close.svg";
import boldybuild from "../../assets/Images/png/boldybuilder.png";
import http from "../../servers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TrenajorModal = ({ onClose, openPreyti, id, service }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    http
      .post("/join-training/", {
        schedule: id,
        phone: phone,
        email: email,
        name: name,
        item: service,
      })
      .then((res) => {
        console.log(res.data);
        onClose();
        openPreyti();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.non_field_errors) {
          toast.error(`${err.response?.data?.non_field_errors}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  return (
    <div className="ordermodal">
      <ToastContainer />
      <img className="ordermodal__img" src={boldybuild} alt="" />
      <button onClick={() => onClose()} className="ordermodal__closebtn">
        <img src={closeimg} alt={"close"} />
      </button>
      <div className="ordermodal__box">
        <h3 className="odermodal__title">Запись на  групповое занятие</h3>
        <p className="ordermodal__doc">
          Введите ваше имя и номер телефона. Мы позвоним вам в ближайшее время,
          а так же вышлем все детали вам на почту.
        </p>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="ordermodal__form"
          action=""
        >
          <div className="ordermodal__form__heads">
            <label className="ordermodal__label" htmlFor="">
              <input
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7"
                className="ordermodal__input"
                type="text"
              />
            </label>
            <label className="ordermodal__label" htmlFor="">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="ordermodal__input"
                type="email"
              />
            </label>
          </div>
          <label className="ordermodal__bodylabel" htmlFor="">
            <input
              onChange={(e) => setName(e.target.value)}
              className="ordermodal__input"
              placeholder="Имя"
              type="text"
            />
          </label>
          <button type="submit" className="ordermodal__btn">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrenajorModal;
