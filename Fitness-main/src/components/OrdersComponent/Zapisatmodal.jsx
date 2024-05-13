import React from "react";
import "./order.css";
import closeimg from "../../assets/Images/svg/close.svg";
import boldybuild from "../../assets/Images/png/boldybuilder.png";
const Zapisatmodal = () => {
  return (
    <div className="ordermodal">
      <img className="ordermodal__img" src={boldybuild} alt="" />
      <button className="ordermodal__closebtn">
        <img src={closeimg} alt={"close"} />
      </button>
      <div className="ordermodal__box">
        <h3 className="odermodal__title">Запись на  занятие с тренером</h3>
        <p className="ordermodal__doc">
          Введите ваше имя и номер телефона. Мы позвоним вам в ближайшее время,
          а так же вышлем все детали вам на почту.
        </p>
        <form className="ordermodal__form" action="">
          <div className="ordermodal__form__heads">
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
          <div className="ordermodal__form__heads">
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
          <button className="ordermodal__btn">Отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Zapisatmodal;
