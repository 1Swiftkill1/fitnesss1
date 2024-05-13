import React from "react";
import "./zonihom.css";
import trenajor from "../../../assets/Images/png/ternajor.png";
import yogahome from "../../../assets/Images/png/yougahomeimg.png";
import gurpavoyhome from "../../../assets/Images/png/gurpavoyhomeimg.png";
import sayklstudiohome from "../../../assets/Images/png/sayklstudiohome.png";
import basseynhome from "../../../assets/Images/png/bassenhome.png";
import destskiyhome from "../../../assets/Images/png/fitnessyounghome.png";
import boevikhome from "../../../assets/Images/png/boevikhome.png";
import { useNavigate } from "react-router-dom";

const Zonihom = () => {
  const navigate = useNavigate();
  return (
    <section className="zonihom">
      <div className="container">
        <div
          data-aos="fade-down"
          data-aos-duration="1200"
          className="zonihom__textbox"
        >
          <h2 className="zonihom__title">Фитнес-зоны</h2>
          <p className="zonihom__doc">
            Мы внимательны к мелочам. Заботимся о вашем времени и результате.
            Помогаем тренироваться с удовольствием.
          </p>
        </div>
        <ul className="zonihom__cardlist">
          <li
            data-aos="fade-down"
            data-aos-duration="1000"
            className="zoniho__cardlist__item"
          >
            <img
              onClick={() => navigate("/trejanor")}
              className="zoniho__cardlist__img"
              src={trenajor}
              alt=""
            />
            <h3
              onClick={() => navigate("/trejanor")}
              className="zoniho__cardlist__title"
            >
              Тренажёрный зал
            </h3>
            <p className="zoniho__cardlist__doc">
              Лучшие тренажёры Life Fitness и Hammer Strength для всех типов
              нагрузок
            </p>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1000"
            className="zoniho__cardlist__item"
          >
            <img
              onClick={() => navigate("/yoga")}
              className="zoniho__cardlist__img"
              src={yogahome}
              alt=""
            />
            <h3
              onClick={() => navigate("/yoga")}
              className="zoniho__cardlist__title"
            >
              йога
            </h3>
            <p className="zoniho__cardlist__doc">
              Шесть разных стилей йоги для начинающих и профессионалов
            </p>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1000"
            className="zoniho__cardlist__item"
          >
            <img
              onClick={() => navigate("/allzananiya")}
              className="zoniho__cardlist__img"
              src={gurpavoyhome}
              alt=""
            />
            <h3
              onClick={() => navigate("/allzananiya")}
              className="zoniho__cardlist__title"
            >
              Групповые занятия
            </h3>
            <p className="zoniho__cardlist__doc">
              Единственный в области официальный клуб Les Mills
            </p>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1000"
            className="zoniho__cardlist__item"
          >
            <img
              onClick={() => navigate("/saykstudio")}
              className="zoniho__cardlist__img"
              src={sayklstudiohome}
              alt=""
            />
            <h3
              onClick={() => navigate("/saykstudio")}
              className="zoniho__cardlist__title"
            >
              Сайкл-студия
            </h3>
            <p className="zoniho__cardlist__doc">
              Увлекательные велотренировки перед огромным экраном
            </p>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1000"
            className="zoniho__cardlist__item"
          >
            <img
              onClick={() => navigate("/bassen")}
              className="zoniho__cardlist__img"
              src={basseynhome}
              alt=""
            />
            <h3
              onClick={() => navigate("/bassen")}
              className="zoniho__cardlist__title"
            >
              Бассейн
            </h3>
            <p className="zoniho__cardlist__doc">
              4 дорожки по 25 метров для индивидуальных и групповых занятий
            </p>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1000"
            className="zoniho__cardlist__item"
          >
            <img
              onClick={() => navigate("/detskiyfitnes")}
              className="zoniho__cardlist__img"
              src={destskiyhome}
              alt=""
            />
            <h3
              onClick={() => navigate("/detskiyfitnes")}
              className="zoniho__cardlist__title"
            >
              Детский фитнес
            </h3>
            <p className="zoniho__cardlist__doc">
              Физическое, интеллектуальное и творческое воспитание юных
              резидентов клуба
            </p>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1000"
            className="zoniho__cardlist__item"
          >
            <img
              onClick={() => navigate("/boevi")}
              className="zoniho__cardlist__img"
              src={boevikhome}
              alt=""
            />
            <h3
              onClick={() => navigate("/boevi")}
              className="zoniho__cardlist__title"
            >
              Боевые искусства
            </h3>
            <p className="zoniho__cardlist__doc">
              Отдельная зона с профессиональным оборудованием
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Zonihom;
