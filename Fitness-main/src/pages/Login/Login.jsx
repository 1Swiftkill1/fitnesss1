import React, { useState } from "react";
import sitelogo from "../../assets/Images/svg/silelogo.svg";
import "./login.css";
import { useNavigate } from "react-router-dom";
import http from "../../servers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      setErrors({});
      postData();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Email address is invalid";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const postData = () => {
    http
      .post("/login/", {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("code", res.data.code);
        localStorage.setItem("email", res.data.email);
        navigate("/profile");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(err);
      });
  };

  return (
    <section className="login">
      <ToastContainer />
      <div className="container">
        <div className="login__wrapper">
          <div className="login__box">
            <div
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
              href="/"
            >
              <img className="login__logo" width={201} src={sitelogo} alt="" />
            </div>
            <h2 className="login__title">Авторизация</h2>
            <form onSubmit={handleSubmit} action="" className="login__form">
              <label className="login__label" htmlFor="">
                <p className="login__label-text">Email</p>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="login__input"
                />
                {errors.email && (
                    <div className="login__error">{errors.email}</div>
                )}
              </label>
              <label className="login__label" htmlFor="">
                <p className="login__label-text">Пароль</p>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="login__input"
                />
                {errors.password && (
                    <div className="login__error">{errors.password}</div>
                )}
              </label>
              <div className="login__zabil">
                <p
                    onClick={() => navigate("/sbrosparol")}
                    className="login__zabil__text"
                >
                  Забыли пароль?{" "}
                </p>
                <p
                    onClick={() => navigate("/createaccount")}
                    className="login__createaccout"
                >
                  Создать аккаунт
                </p>
              </div>
              <button type="submit" className="login__btn">
                Авторизоваться
              </button>
              <button
                  type="button"
                  className="login__btn login__btn--back"
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

export default Login;
