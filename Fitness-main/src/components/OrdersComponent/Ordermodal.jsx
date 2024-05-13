import React, { useState } from "react";
import "./order.css";
import closeimg from "../../assets/Images/svg/close.svg";
import boldybuild from "../../assets/Images/png/boldybuilder.png";
import http from "../../servers/axios";
const Ordermodal = ({ type, onClose, openPodrob }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmits = () => {
    http
      .post("/abonoment-aplication/", {
        type: type,
        phone: formData.phone,
        email: formData.email,
        name: formData.name,
      })
      .then((res) => {
        onClose();
        openPodrob();
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data?.non_field_errors);
      });
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      handleSubmits();
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    }

    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    return errors;
  };

  return (
    <div className="ordermodal">
      <img className="ordermodal__img" src={boldybuild} alt="" />
      <button onClick={() => onClose()} className="ordermodal__closebtn">
        <img src={closeimg} alt={"close"} />
      </button>
      <div className="ordermodal__box">
        <h3 className="odermodal__title">Абонемент «{type}»</h3>
        <p className="ordermodal__doc">
          Введите ваше имя и номер телефона. И мы вышлем вам персональный код в
          личный кабинет.
        </p>
        {error && <p className="ordermodal__error">{error}</p>}
        <form onSubmit={handleSubmit} className="ordermodal__form" action="">
          <div className="ordermodal__form__heads">
            <label className="ordermodal__label" htmlFor="">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7"
                className="ordermodal__input"
                type="text"
              />
            </label>
            <label className="ordermodal__label" htmlFor="">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="ordermodal__input"
                type="email"
              />
            </label>
          </div>
          <label className="ordermodal__bodylabel" htmlFor="">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
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

export default Ordermodal;