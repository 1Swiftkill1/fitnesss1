import React, { useState } from "react";
import sitelogo from "../../assets/Images/svg/silelogo.svg";
import "./sbros.css";
import { useNavigate } from "react-router-dom";
import http from "../../servers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
const Sbrosparol = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const emailSubmit = (e) => {
    e.preventDefault();
    http
      .post("/request-reset-email/", {
        email: email,
      })
      .then((res) => {
        toast.success(res.data?.success, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEmail("");
      })
      .catch((err) => {
        toast.error("В введенном электронном письме есть ошибка !!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <section className="sbros">
      <ToastContainer />
      <div className="container">
        <div className="sbros__wrapper">
          <div className="sbros__box">
            <span onClick={() => navigate("/")} href="">
              <img className="sbros__logo" width={201} src={sitelogo} alt="" />
            </span>
            <h2 className="sbros__title">Сброс пароля</h2>
            <p className="sbros__text">
              Введите адрес электронной почты, связанный с вашей учетной записью
              Flex force, ниже.
            </p>
            <form
                onSubmit={(e) => emailSubmit(e)}
                action=""
                className="sbros__form"
            >
              <label className="sbros__label" htmlFor="">
                <p className="sbros__label-text">Email</p>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="sbros__input"
                    type="email"
                    value={email}
                />
              </label>
              <button type="submit" className="sboros__btn">
                Сброс пароля
              </button>
              <button
                  type="button"
                  className="sboros__btn sboros__btn--back"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
              >
                Назад
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sbrosparol;
