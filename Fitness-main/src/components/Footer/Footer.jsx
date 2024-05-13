import React from "react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer__list">
          <li>
            <div className="footer__innerlist">
              <h3 className="footer__innertitle"> Поддержка</h3>
              <a href="tel:+7 (940) 657-34-34" className="footer__innertext">
                +7 (940) 657-34-34
              </a>
              <a
                className="footer__innertext"
                href="mailto: flexforce@gmail.com"
              >
                flexforce@gmail.com
              </a>
            </div>
          </li>
          <li>
            <div className="footer__innerlist">
              <h3 className="footer__innertitle">Услуги</h3>
              <span
                onClick={() => navigate("/yoga")}
                className="footer__innertext"
              >
                Йога
              </span>
              <span
                onClick={() => navigate("/allzananiya")}
                className="footer__innertext"
              >
                Групповые занятия
              </span>
              <span
                onClick={() => navigate("/saykstudio")}
                className="footer__innertext"
              >
                Сайкл-студия
              </span>
              <span
                onClick={() => navigate("/bassen")}
                className="footer__innertext"
              >
                Бассейн
              </span>
              <span
                onClick={() => navigate("/trejanor")}
                className="footer__innertext"
              >
                Тренажёрный зал
              </span>
              <span
                onClick={() => navigate("/detskiyfitnes")}
                className="footer__innertext"
              >
                Детский фитнес
              </span>
              <span
                onClick={() => navigate("/boevi")}
                className="footer__innertext"
              >
                Боевые искусства
              </span>
            </div>
          </li>
          <li>
            <div className="footer__innerlist">
              <h3 className="footer__innertitle">Прочее</h3>
              <span
                onClick={() => navigate("/about")}
                className="footer__innertext"
              >
                О клубе
              </span>
              <span
                onClick={() => navigate("/komanda")}
                className="footer__innertext"
              >
                Команда
              </span>
              <span
                onClick={() => navigate("/map")}
                className="footer__innertext"
              >
                Контакты
              </span>
            </div>
          </li>
          <li>
            <div className="footer__innerlist">
              <h3 className="footer__innertitle">Клубные карты</h3>
              <span
                onClick={() => navigate("/klubcart")}
                className="footer__innertext"
              >
                Lite
              </span>
              <span
                onClick={() => navigate("/klubcart")}
                className="footer__innertext"
              >
                {" "}
                Space
              </span>
              <span
                onClick={() => navigate("/klubcart")}
                className="footer__innertext"
              >
                Flex
              </span>
            </div>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
