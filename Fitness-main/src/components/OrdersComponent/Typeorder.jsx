import React, { useState } from "react";
import "./order.css";
import closeimg from "../../assets/Images/svg/close.svg";
import boldybuild from "../../assets/Images/png/boldybuilder.png";
import http from "../../servers/axios";
import { ToastContainer, toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Typeorder = ({ onClose, openPreyti, types }) => {
  const [typeselect, setTypeselect] = useState("");
  const [error, setErrors] = useState(false);
  const [date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(false);
    http
      .post("/participant-training/", {
        service: typeselect,
        date: date,
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
        if (err?.response.status === 409) {
          setErrors(true);
        }
      });
  };

  return (
    <div className="ordermodal__typeorder">
      <ToastContainer />
      <img className="ordermodal__img__typeorder" src={boldybuild} alt="" />
      <button onClick={() => onClose()} className="ordermodal__closebtn">
        <img src={closeimg} alt={"close"} />
      </button>
      <div className="ordermodal__box">
        <h3 className="odermodal__title">Запись на  занятие с тренером</h3>
        <p className="ordermodal__doc">
          Введите ваше имя и номер телефона. Мы позвоним вам в ближайшее время,
          а так же вышлем все детали вам на почту.
        </p>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="ordermodal__form"
          action=""
        >
          <div className="ordermodal__form__heads__ordermodal">
            <label className="ordermodal__label" htmlFor="">
              <select
                onChange={(e) => setTypeselect(e.target.value)}
                className="ordermodal__input"
                name=""
                id=""
              >
                <option style={{ color: "#000" }} selected disabled value="">
                  Направление
                </option>
                {types?.map((item, index) => (
                  <option
                    style={{ color: "#000", cursor: "pointer" }}
                    key={index}
                    value={item?.service_type?.key}
                  >
                    {item?.service_type?.value}
                  </option>
                ))}
              </select>
            </label>
            <label className="ordermodal__label" htmlFor="">
              <input
                onChange={(e) => setDate(e.target.value)}
                placeholder="Дата и время"
                className="ordermodal__input ordermodal__typedate"
                type="datetime-local"
              />
            </label>
          </div>
          <div className="ordermodal__form__heads__ordermodal">
            <label className="ordermodal__label" htmlFor="">
              <input
                placeholder="+7"
                className="ordermodal__input"
                type="text"
              />
            </label>
            <label className="ordermodal__label" htmlFor="">
              <input
                placeholder="E-mail"
                className="ordermodal__input"
                type="email"
              />
            </label>
          </div>
          <label className="ordermodal__bodylabel" htmlFor="">
            <input
              className="ordermodal__input"
              placeholder="Имя"
              type="text"
            />
          </label>
          <p style={{ marginTop: "20px" }} className="ordermodal__error">
            {error && (
              <span style={{ color: "red" }}>
                К сожалению текущие даты и время заняты
              </span>
            )}
          </p>
          <button type="submit" className="ordermodal__btn">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default Typeorder;
