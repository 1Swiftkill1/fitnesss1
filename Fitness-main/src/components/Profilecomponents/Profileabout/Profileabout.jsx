import React, { useContext, useEffect, useState } from "react";
import "./profileabout.css";
import avatarimg from "../../../assets/Images/svg/profile.svg";
import { useNavigate } from "react-router-dom";
import http from "../../../servers/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../../context/Context";
const Profileabout = () => {
  const { setMainavatar, refresh, setRefresh } = useContext(Context);
  const [userabout, setUserabout] = useState({});
  const email = localStorage.getItem("email");
  const [data, setData] = useState({});
  const [phone, setPhone] = useState("");
  const [emails, setEmails] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [refreshs, setRefreshs] = useState(false);
  const [avatarurl, setAvatarurl] = useState("");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  const handleDelete = () => {
    http
      .post("/delete-user/")
      .then((res) => {
        handleLogout();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    const formData = new FormData();
    formData.append("avatar", avatarurl ? avatarurl : ``);
    formData.append("phone_number", phone ? phone : userabout?.phone_number);
    formData.append("email", emails ? emails : userabout?.email);
    formData.append(
      "first_name",
      firstname ? firstname : userabout?.first_name
    );
    formData.append("last_name", lastname ? lastname : userabout?.last_name);
    formData.append(
      "father_name",
      middlename ? middlename : userabout?.father_name
    );
    http
      .put(`/update/profile/${email}/`, formData)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("email", emails ? emails : userabout?.email);
        toast.success(res.data, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setRefreshs(!refreshs);
        setRefresh(!refresh);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Profileimgchange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setAvatarurl(e.target.files[0]);
  };
  const getUser = () => {
    http
      .get(`/update/profile/${email}/`)
      .then((res) => {
        setUserabout(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="profileabout">
      <ToastContainer />
      <h3 className="profileabout__title">ЛИЧНЫЕ ДАННЫЕ</h3>
      <div className="profileabout__box">
        <div className="profileabout__imgbox">
          <img
            className="profileabout__avatar"
            src={avatar ? avatar : data.avatar ? data.avatar : avatarimg}
            alt="avatar"
          />
          <label className="profileabout__izminit">
            Изменить фото
            <input
              className="izminitphoto__fayl"
              defaultValue={avatarurl}
              onChange={(e) => Profileimgchange(e)}
              type="file"
            />
          </label>
        </div>
        <label className="profileabout__label" htmlFor="">
          <p className="profileabout__text">Телефон</p>
          <input
            onChange={(e) => setPhone(e.target.value)}
            defaultValue={data?.phone_number ? data?.phone_number : ""}
            className="profileabout__input"
            type="text"
          />
        </label>
        <label className="profileabout__label" htmlFor="">
          <p className="profileabout__text">E-mail</p>
          <input
            onChange={(e) => setEmails(e.target.value)}
            defaultValue={data?.email ? data?.email : ""}
            className="profileabout__input"
            type="text"
          />
        </label>
        <label className="profileabout__label" htmlFor="">
          <p className="profileabout__text">Фамилия</p>
          <input
            defaultValue={data?.last_name ? data?.last_name : ""}
            onChange={(e) => setLastName(e.target.value)}
            className="profileabout__input"
            type="text"
          />
        </label>
        <label className="profileabout__label" htmlFor="">
          <p className="profileabout__text">Имя</p>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            defaultValue={data?.first_name ? data?.first_name : ""}
            className="profileabout__input"
            type="text"
          />
        </label>
        <label className="profileabout__label" htmlFor="">
          <p className="profileabout__text">Отчество</p>
          <input
            defaultValue={data?.father_name ? data?.father_name : ""}
            onChange={(e) => setMiddleName(e.target.value)}
            className="profileabout__input"
            type="text"
          />
        </label>
        <button onClick={() => handleEdit()} className="profileabout__btn">
          Сохранить
        </button>
        <button onClick={() => handleLogout()} className="profileabout__btn">
          Выйти
        </button>
        <button onClick={() => handleDelete()} className="profileabout__logout">
          Удалить
        </button>
      </div>
    </div>
  );
};

export default Profileabout;
