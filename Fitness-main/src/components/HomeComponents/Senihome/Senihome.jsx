import React from "react";
import "./seni.css";
import crownimg from "../../../assets/Images/svg/crown.svg";
import { useNavigate } from "react-router-dom";
const Senihome = () => {
  const navigate = useNavigate();
  return (
    <section className="senihome">
      <div className="container">
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="senihome__textbox"
        >
          <h2 className="senihome__title">Цены и клубные карты </h2>
          <p className="senihome__doc">
            Чтобы вам было удобнее, мы подготовили 3 разновидности клубных
            абонементов. Стоимость индивидуальных занятий вы можете узнать
            у администратора.
          </p>
        </div>
        <ul className="senihome__cardlist">
          <li
            data-aos="fade-right"
            data-aos-duration="1200"
            className="senihome__cardlistitem"
          >
            <h3 className="senihome__list__title">LITE</h3>
            <p className="senihome__list__doc">
              Удобная карта для тех, кто занимается фитнесом днём
            </p>
            <button
              onClick={() => navigate("/klubcart")}
              className="senihome__list__btn"
            >
              Подробнее
            </button>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1000"
            className="senihome__cardlistitem senihome__cardlistitem2"
          >
            <img
              width={69}
              className="senihome__list__crown"
              src={crownimg}
              alt=""
            />
            <h3 className="senihome__list__title">Space</h3>
            <p className="senihome__list__doc">
              Статусная карта с пакетом привилегий «Flex Business»
            </p>
            <button
              onClick={() => navigate("/klubcart")}
              className="senihome__list__btn"
            >
              Подробнее
            </button>
          </li>
          <li
            data-aos="fade-left"
            data-aos-duration="1200"
            className="senihome__cardlistitem"
          >
            <h3 className="senihome__list__title">FLEX</h3>
            <p className="senihome__list__doc">
              Оптимальная карта без ограничения посещений по времени
            </p>
            <button
              onClick={() => navigate("/klubcart")}
              className="senihome__list__btn"
            >
              Подробнее
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Senihome;
