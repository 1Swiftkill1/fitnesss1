import React from "react";
import "./samihero.css";
import { useNavigate } from "react-router-dom";
const Snamihome = () => {
  const navigate = useNavigate();
  return (
    <section className="samihome">
      <div className="container">
        <div className="samihome__wrapper">
          <h2
            data-aos="fade-right"
            data-aos-duration="1200"
            className="samihome__title"
          >
            с нами, вы получаете лучшее для себя и своего здоровья
          </h2>
          <p
            data-aos="fade-right"
            data-aos-duration="1500"
            className="samihome__doc"
          >
            Flex force – самая разветвленная сеть фитнес-клубов России, более 90
            клубов. Flex force – это больше, чем фитнес! Это образ жизни! С нами
            вы можете быть уверены в безопасности своего здоровья –
            дипломированный тренерский состав всегда к вашим
            услугам. Современные тренажеры, внушительный выбор групповых
            программ, персональные тренировки, сопутствующие услуги – в клубе
            есть все для достижения ваших целей.
          </p>
          <button
            onClick={() => navigate("/about")}
            data-aos="fade-right"
            data-aos-duration="1700"
            className="samihome__btn"
          >
            Подробнее
          </button>
        </div>
      </div>
    </section>
  );
};

export default Snamihome;
