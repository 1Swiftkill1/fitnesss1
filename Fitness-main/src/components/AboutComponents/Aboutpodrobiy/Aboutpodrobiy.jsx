import React from "react";
import "./aboutpodrob.css";
import aboutlist1 from "../../../assets/Images/svg/aboulist1.svg";
import aboutlist2 from "../../../assets/Images/svg/aboutx2.svg";
import aboutlist3 from "../../../assets/Images/svg/aboutx3.svg";
import aboutlist4 from "../../../assets/Images/svg/aboutx4.svg";
import aboutlist5 from "../../../assets/Images/svg/aboutx5.svg";
import aboutlist6 from "../../../assets/Images/svg/aboutx6.svg";
import aboutlist7 from "../../../assets/Images/svg/aboutx7.svg";
import aboutlist8 from "../../../assets/Images/svg/aboutx8.svg";
import aboutlist9 from "../../../assets/Images/svg/aboutx9.svg";
const Aboutpodrobiy = () => {
  return (
    <section className="aboutpodrobiy">
      <div className="container">
        <h2
          data-aos="fade-down"
          data-aos-duration="1600"
          className="aboutpodrobiy__title"
        >
          Немного подробностей
        </h2>
        <ul className="aboutpodrobiy__list">
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist1} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Эффективные фитнес-программы
            </h4>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist2} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Групповые программы от мирового лидера Les Mills
            </h4>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist3} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Премиальное фитнес-оборудование Life Fitness и Hammer Strength
            </h4>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist4} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Бассейн (4 дорожки по 25 м), сауна, хамам и акватоник
            </h4>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist5} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Детский развивающий центр — спорт, интеллект, творчество
            </h4>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist6} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Ресторан правильного питания со специальным меню
            </h4>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist7} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Фитнес-тестирование и анализ тела
            </h4>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist8} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Универсальный браслет для входа в клуб и быстрого доступа
              к шкафчику
            </h4>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1600"
            className="aboutpodrobiy__listitem"
          >
            <img className="aboutpdorobiy__listimg" src={aboutlist9} alt="" />
            <h4 className="aboutpdorobiy__list__text">
              Более 2000 м2 полезной площади
            </h4>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Aboutpodrobiy;
