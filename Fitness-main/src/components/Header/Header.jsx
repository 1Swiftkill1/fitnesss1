import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import sitelogo from "../../assets/Images/svg/silelogo.svg";
import usulugiarrowimg from "../../assets/Images/svg/uslugiarrow.svg";
import { NavLink } from "react-router-dom";
import hamburgerimg from "../../assets/Images/svg/hamburger.svg";
import profileimg from "../../assets/Images/svg/profile.svg";
import closeimg from "../../assets/Images/svg/close.svg";
import http from "../../servers/axios";
import { Context } from "../../context/Context";
const token = localStorage.getItem("token");
const email = localStorage.getItem("email");

const Header = () => {
  const { setFirstname, refresh, setMainavatar } = useContext(Context);
  const [avatarimg, setAvatarimg] = useState("");
  const [mobileham, setMobileham] = useState(false);
  const [mobileinnerlink, setMobileinnerlink] = useState(false);
  const getAvatar = () => {
    if (token) {
      http
        .get(`/update/profile/${email}/`)
        .then((res) => {
          setAvatarimg(res.data.avatar);
          setFirstname(res.data.first_name);
          setMainavatar(res.data.avatar);
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("code");
            localStorage.removeItem("email");
            window.location.reload();
          }
        });
    }
  };
  useEffect(() => {
    getAvatar();
  }, [refresh]);
  const navigate = useNavigate();
  const [drobdown, setDrobdown] = useState(false);
  return (
    <header className={token ? "header" : "headerauth"}>
      <div className="container">
        <div className="header__wrapper">
          <div className="header__navbar__wrapper">
            <span onClick={() => navigate("/")} className="header__sitelogo">
              <img src={sitelogo} alt="sitelog" />
            </span>
            <nav className="header__nav">
              <div
                onClick={() => setDrobdown(!drobdown)}
                className="header__nav__uslugi"
              >
                <div
                  className={
                    drobdown
                      ? "drobdwon__active__box drobdwon__box"
                      : "drobdwon__box"
                  }
                >
                  <div className="drobdown__contents">
                    <p
                      onClick={() => {
                        navigate("/trejanor");
                        setDrobdown(!drobdown);
                      }}
                      className="drobdown__contents__item"
                    >
                      Тренажёрный зал
                    </p>
                    <p
                      onClick={() => {
                        navigate("/yoga");
                        setDrobdown(!drobdown);
                      }}
                      className="drobdown__contents__item"
                    >
                      Студия йоги
                    </p>
                    <p
                      onClick={() => {
                        navigate("/allzananiya");
                        setDrobdown(!drobdown);
                      }}
                      className="drobdown__contents__item"
                    >
                      Групповые занятия
                    </p>
                    <p
                      onClick={() => {
                        navigate("/saykstudio");
                        setDrobdown(!drobdown);
                      }}
                      className="drobdown__contents__item"
                    >
                      Сайкл-студия
                    </p>
                    <p
                      onClick={() => {
                        navigate("/bassen");
                        setDrobdown(!drobdown);
                      }}
                      className="drobdown__contents__item"
                    >
                      Бассейн
                    </p>
                    <p
                      onClick={() => {
                        navigate("/detskiyfitnes");
                        setDrobdown(!drobdown);
                      }}
                      className="drobdown__contents__item"
                    >
                      Детский фитнес
                    </p>
                    <p
                      onClick={() => {
                        navigate("/boevi");
                        setDrobdown(!drobdown);
                      }}
                      className="drobdown__contents__item"
                    >
                      Боевые искусства
                    </p>
                  </div>
                </div>
                <span className="header__navuslugi__text">Услуги</span>
                <img
                  className={
                    drobdown
                      ? "header__navuslugi__arrowimg header__navuslugi__arrowimgrotate"
                      : "header__navuslugi__arrowimg"
                  }
                  src={usulugiarrowimg}
                  alt=""
                />
              </div>
              <NavLink to={"/schedule"}>
                <span className="header__nav__uslugi__text header__nav__uslugi__text1 ">
                  Расписание
                </span>
              </NavLink>
              <NavLink to={"/klubcart"}>
                <span className="header__nav__uslugi__text">Клубные карты</span>
              </NavLink>
              <NavLink to={"/komanda"}>
                <span className="header__nav__uslugi__text">Команда</span>
              </NavLink>
              <NavLink to={"/about"}>
                <span className="header__nav__uslugi__text">О клубе</span>
              </NavLink>
              <NavLink to={"/map"}>
                <span className="header__nav__uslugi__text">Контакты</span>
              </NavLink>
            </nav>
          </div>
          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="header__avtorize__btn"
            >
              Авторизация
            </button>
          )}
          {token && (
            <button
              onClick={() => navigate("/profile")}
              className="header__profile__img"
            >
              <img
                width={40}
                height={40}
                className="header__profile__img__img"
                src={avatarimg ? avatarimg : profileimg}
                alt=""
              />
            </button>
          )}
          <button
            onClick={() => setMobileham(!mobileham)}
            className="header__avtorize__hambur"
          >
            <img
              width={30}
              src={mobileham ? closeimg : hamburgerimg}
              alt="menu"
            />
          </button>
        </div>
        <div
          className={
            mobileham
              ? "header__mobile__box header__mobile__boxopened"
              : "header__mobile__box header__mobile__boxclosed"
          }
        >
          <ul className="header__mobile__box__links">
            <li>
              <NavLink
                onClick={() => setMobileham(!mobileham)}
                to={"/schedule"}
              >
                <span className="header__mobile__link ">Расписание</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setMobileham(!mobileham)}
                to={"/klubcart"}
              >
                <span className="header__mobile__link">Клубные карты</span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setMobileham(!mobileham)} to={"/komanda"}>
                <span className="header__mobile__link ">Команда</span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setMobileham(!mobileham)} to={"/about"}>
                <span className="header__mobile__link ">О клубе</span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={() => setMobileham(!mobileham)} to={"/map"}>
                <span className="header__mobile__link ">Контакты</span>
              </NavLink>
            </li>
            <li>
              <div>
                <p
                  onClick={() => setMobileinnerlink(!mobileinnerlink)}
                  className="header__mobile__link "
                >
                  Услуги
                  <img
                    className={
                      mobileinnerlink
                        ? "header__navuslugi__arrowimgrotate header__mobile__imgarrow"
                        : "header__mobile__imgarrow"
                    }
                    src={usulugiarrowimg}
                    alt=""
                  />
                </p>
                {mobileinnerlink && (
                  <ul className="header__mobile__innerlink">
                    <li
                      onClick={() => {
                        navigate("/trejanor");
                        setMobileham(!mobileham);
                      }}
                      className="header__mobile__innerlink__item"
                    >
                      Тренажерный зал
                    </li>
                    <li
                      onClick={() => {
                        navigate("/yoga");
                        setMobileham(!mobileham);
                      }}
                      className="header__mobile__innerlink__item"
                    >
                      Йога
                    </li>
                    <li
                      onClick={() => {
                        navigate("/allzananiya");
                        setMobileham(!mobileham);
                      }}
                      className="header__mobile__innerlink__item"
                    >
                      Групповые занятия
                    </li>
                    <li
                      onClick={() => {
                        navigate("/saykstudio");
                        setMobileham(!mobileham);
                      }}
                      className="header__mobile__innerlink__item"
                    >
                      Сайкл-студияя
                    </li>
                    <li
                      onClick={() => {
                        navigate("/bassen");
                        setMobileham(!mobileham);
                      }}
                      className="header__mobile__innerlink__item"
                    >
                      Бассейн
                    </li>
                    <li
                      onClick={() => {
                        navigate("/detskiyfitnes");
                        setMobileham(!mobileham);
                      }}
                      className="header__mobile__innerlink__item"
                    >
                      Детский фитнес{" "}
                    </li>

                    <li
                      onClick={() => {
                        navigate("/boevi");
                        setMobileham(!mobileham);
                      }}
                      className="header__mobile__innerlink__item"
                    >
                      {" "}
                      Боевые искусства{" "}
                    </li>
                  </ul>
                )}
                {!token && (
                  <button
                    onClick={() => navigate("/login")}
                    className="header__avtorize__btn__mobile mobile__btn__top"
                  >
                    Авторизация
                  </button>
                )}
                {token && (
                  <button
                    onClick={() => navigate("/profile")}
                    className="header__profile__img__mobile"
                  >
                    <img
                      width={40}
                      height={40}
                      className="header__profile__img__img"
                      src={avatarimg ? avatarimg : profileimg}
                      alt=""
                    />
                  </button>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
