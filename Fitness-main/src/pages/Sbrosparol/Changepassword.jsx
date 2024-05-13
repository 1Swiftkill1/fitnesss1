import React, { useState } from "react";
import sitelogo from "../../assets/Images/svg/silelogo.svg";
import "./sbros.css";
import { useNavigate, useLocation } from "react-router-dom";
import http from "../../servers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const uidb64 = queryParams.get("uidb64");
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
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
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.password.trim()) {
      errors.password = "Новый пароль is required";
    }
    if (!data.password2.trim()) {
      errors.password2 = "Подтвердите пароль is required";
    }
    if (
      data.password !== data.password2 &&
      data.password2.trim() &&
      data.password2.trim()
    ) {
      errors.similar = "Passwords do not match";
    }
    return errors;
  };
  const postData = () => {
    http
      .patch("/password-reset-complete/", {
        password: formData.password,
        token: token,
        uidb64: uidb64,
      })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message, {
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
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.detail) {
          toast.error(err?.response?.data?.detail, {
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
    <section className="sbros__chang">
      <ToastContainer />
      <div className="container">
        <div className="change__password__wrapper">
          <div className="sbros__change__header">
            <img width={151} src={sitelogo} alt="" />
          </div>
          <div className="sbros__change__body">
            <h2 className="sbros__change__title">Сброс пароля </h2>
            <form
              onSubmit={handleSubmit}
              action=""
              className="sbros__change__form"
            >
              <label className="sbros__change__label" htmlFor="">
                <p className="sbros__change__label-text">Новый пароль</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="sbros__change__input"
                />
                <p className="sbros__error">{errors?.password}</p>
              </label>
              <label className="sbros__change__label" htmlFor="">
                <p className="sbros__change__label-text">Подтвердите пароль</p>
                <input
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  className="sbros__change__input"
                />
                <p className="sbros__error">{errors?.password2}</p>
                <p className="sbros__similar__error">{errors?.similar}</p>
              </label>

              <button className="sbros__change__btn">Обновить пароль</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
