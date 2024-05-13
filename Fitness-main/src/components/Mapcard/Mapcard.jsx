import React from "react";
import telegramimg from "../../assets/Images/svg/telegram.svg";
import instagramimg from "../../assets/Images/svg/instagram.svg";
import vkimg from "../../assets/Images/svg/vk.svg";
import "./mapcard.css";
const Mapcard = () => {
  return (
    <aside className="mapcard">
      <div className="mapcard__textbox">
        <h2 className="mapcard__title">Контакты</h2>
        <p className="mapcard__addres">
          +7 (940) 657-34-34 / flexforce@gmail.com г. Владимир, ул.
          Дзержинского, 15
        </p>
        <p className="mapcard__rejim">
          Режим работы: <br /> Будни: 08:00 – 23:00 <br /> Выходные: 08:00 –
          22:00
        </p>
        <div className="mapcard__massangerbox">
          <h4 className="mapcard__massangerbox__title">
            Наши группы в соцсетях:
          </h4>
          <div className="mapcard__massangerlist">
            <a href="https://t.me/Swiftkill" target="_blank">
              <img src={telegramimg} alt="" />
            </a>
            <a href="https://www.instagram.com/werlamma" target="_blank">
              <img src={instagramimg} alt="" />
            </a>
            <a href="https://vk.com/1swiftkill1" target="_blank">
              <img src={vkimg} alt="" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Mapcard;
