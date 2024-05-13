import React from "react";
import "./aboutlist.css";
import motivationimg from "../../../assets/Images/png/aboutmotivation.png";
import motivationimg2 from "../../../assets/Images/png/aboutmot2.png";
import motivationimg3 from "../../../assets/Images/png/aboutmot3.png";
const Aboutlist = () => {
  return (
    <section className="aboutlist">
      <div className="container">
        <ul className="aboutlist__list">
          <li
            data-aos="fade-left"
            data-aos-duration="1600"
            className="aboutlist__listitem"
          >
            <img className="aboutlist__listimg" src={motivationimg} alt="" />
            <div className="aboutlist__list__textbox">
              <h3 className="aboutlist__list__title">Мотивация</h3>
              <p className="aboutlist__list__doc">
                Мы помогаем ставить правильные цели и находим нужные слова,
                чтобы раскрыть ваш потенциал.
              </p>
            </div>
          </li>
          <li
            data-aos="fade-right"
            data-aos-duration="1600"
            className="aboutlist__listitem"
          >
            <img className="aboutlist__listimg" src={motivationimg2} alt="" />
            <div className="aboutlist__list__textbox">
              <h3 className="aboutlist__list__title">Позитивная атмосфера </h3>
              <p className="aboutlist__list__doc">
                Мы создали красивое и уютное место, в котором приятно
                тренироваться и заводить новые знакомства.
              </p>
            </div>
          </li>
          <li
            data-aos="fade-left"
            data-aos-duration="1600"
            className="aboutlist__listitem"
          >
            <img className="aboutlist__listimg" src={motivationimg3} alt="" />
            <div className="aboutlist__list__textbox">
              <h3 className="aboutlist__list__title">Экспертность</h3>
              <p className="aboutlist__list__doc">
                Мы собрали лучшие мировые фитнес-практики в экспертной
                программе.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Aboutlist;
