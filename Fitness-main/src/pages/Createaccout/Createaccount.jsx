import React, { useState } from "react";
import "./createaccount.css";
import { useNavigate } from "react-router-dom";
import sitelogo from "../../assets/Images/svg/silelogo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from "../../servers/axios";

const Createaccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
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
      postData();
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.first_name.trim()) {
      errors.first_name = "First Name is required";
    }
    if (!data.last_name.trim()) {
      errors.last_name = "Last Name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (!data.phone_number.trim()) {
      errors.phone_number = "Phone Number is required";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const postData = () => {
    http
      .post("/register/", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.email,
        password: formData.password,
        password2: formData.password,
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Регистрация успешно завершена!!!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error(`${err.response.data.email && err.response.data.email} `, {
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
    <section className="create">
      <ToastContainer />
      <div className="container">
        <div className="create__header">
          <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <img width={151} height={27} src={sitelogo} alt="" />
          </div>
        </div>
        <h2 className="create__title">Активируйте свой аккаунт</h2>
        <p className="create__accout">
          ВЫ СМОЖЕТЕ ПЛАНИРОВАТЬ ЗАНЯТИЯ И ПЕРСОНАЛЬНЫЕ ТРЕНИРОВКИ, ОТСЛЕЖИВАТЬ
          СВОЮ УСПЕВАЕМОСТЬ, ОБНОВЛЯТЬ СВОИ ПРЕДПОЧТЕНИЯ И МНОГОЕ ДРУГОЕ.
        </p>
        <form onSubmit={handleSubmit} action="" className="create__form">
          <label className="create__label" htmlFor="">
            <p className="create__text">Ваше имя</p>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="create__input"
              type="text"
            />
            {errors.first_name && <p className="error">{errors.first_name}</p>}
          </label>
          <label className="create__label" htmlFor="">
            <p className="create__text">Ваша фамилия</p>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="create__input"
              type="text"
            />
            {errors.last_name && <p className="error">{errors.last_name}</p>}
          </label>
          <label className="create__label" htmlFor="">
            <p className="create__text">Номер телефона</p>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="create__input"
              type="text"
            />
            {errors.phone_number && <p className="error">{errors.phone_number}</p>}
          </label>
          <label className="create__label" htmlFor="">
            <p className="create__text">Email</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="create__input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label className="create__label" htmlFor="">
            <p className="create__text">Пароль</p>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="create__input"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <button type="submit" className="create__btn">
            Зарегистрироваться
          </button>
          <button
            type="button"
            className="create__btn create__btn--back"
            onClick={() => navigate(-1)}
          >
            Назад
          </button>
        </form>
      </div>
    </section>
  );
};

export default Createaccount;
