import React, { useEffect } from "react";
import "./trenor.css";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
const token = localStorage.getItem("token");

const Trenor = ({ trenor, handleModal }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (token) {
      handleModal();
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="trener">
      <div className="container">
        <div className="trener__about">
          <img
            data-aos="fade-right"
            data-aos-duration="1600"
            className="trener__img"
            src={trenor?.Image}
            alt=""
          />
          <div
            data-aos="fade-left"
            data-aos-duration="1600"
            className="trener__about-text"
          >
            <h3 className="trener__title">Тренер</h3>
            <h5 className="trener__name">{trenor?.name}</h5>
            <p className="trener__position">{trenor?.position}</p>
          </div>
        </div>
        <div className="trener__order">
          <div
            data-aos="fade-right"
            data-aos-duration="1600"
            className="trener__orderbox"
          >
            <h3 className="trener__order-title">Персональные занятия</h3>
            <p className="trener__order-text">{trenor?.about}</p>
            <button onClick={() => handleClick()} className="trener__order-btn">
              Записаться
            </button>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="1600"
            className="trener__imges"
          >
            <div className="trener__controlitem">
              <img
                className="trener__imges__icon"
                src={trenor?.controlimg}
                alt=""
              />
            </div>
            <img
              width={498}
              className="trener__imges__img"
              src={trenor?.aboutimg}
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trenor;
