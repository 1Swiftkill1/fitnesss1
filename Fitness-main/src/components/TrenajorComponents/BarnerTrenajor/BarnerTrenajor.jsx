import React, { useEffect } from "react";
import "./style.css";
import previmg from "../../../assets/Images/svg/prev.svg";
import nextimg from "../../../assets/Images/svg/next.svg";
import arowimg from "../../../assets/Images/svg/heroarrow.svg";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
const token = localStorage.getItem("token");

const BarnerTrenajor = ({ pagechange, barnerback, title, text, openModal }) => {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init();
  }, []);
  const handleClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      openModal();
    }
  };
  return (
    <section className="barnerTrenajor">
      <div className="pagechange__controls">
        <div className="pagechange__box">
          <p className="pagechange__text">{pagechange?.prev__text}</p>
          <div
            onClick={() => navigate(`/${pagechange?.prev__url}`)}
            className="pagechange__btn"
          >
            <img src={previmg} alt="" />
          </div>
        </div>
        <div className="pagechange__box">
          <p className="pagechange__text">{pagechange?.next__text}</p>
          <div
            onClick={() => navigate(`/${pagechange?.next__url}`)}
            className="pagechange__btn"
          >
            <img src={nextimg} alt="" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="barnertrenajor__wrapper">
          <div
            data-aos="fade-right"
            data-aos-duration="1600"
            className="barnertrenajor__textbox"
          >
            <h2 className="barnertrenajor__title">{title}</h2>
            <p className="barnertrenajor__doc">{text}</p>
            <button
              onClick={() => handleClick()}
              className="barnertrenajor__btn"
            >
              Записаться на занятие
            </button>
          </div>
          <img
            data-aos="fade-left"
            data-aos-duration="1600"
            className="barnertrenajor__img"
            src={barnerback}
            alt=""
          />
        </div>
        <img className="barnertrenajor__arowimg" src={arowimg} alt="" />
      </div>
    </section>
  );
};

export default BarnerTrenajor;
