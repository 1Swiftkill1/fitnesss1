import React, { useState } from "react";
import "./klubnicart.css";
import crownimg from "../../assets/Images/svg/crown.svg";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import Ordermodal from "../OrdersComponent/Ordermodal";
import Orderpreyti from "../OrdersComponent/Orderpreyti";
export const Klubniycarti = () => {
  const token = localStorage.getItem("token");
  const [orderModal, setOrderModal] = useState(false);
  const [orderType, setOrderType] = useState("");
  const [orderprodrob, setOrderPodrob] = useState(false);
  const navigate = useNavigate();
  const openOrder = () => {
    setOrderModal(true);
  };
  const closeOrder = () => {
    setOrderModal(false);
  };
  const openOrderPodrob = () => {
    setOrderPodrob(true);
  };
  const closeOrderPodrob = () => {
    setOrderPodrob(false);
  };
  const handleOrder = (type) => {
    if (token) {
      setOrderType(type);
      openOrder();
    } else {
      navigate("/login");
    }
  };
  return (
    <section className="klubniycart">
      <Modal isOpen={orderModal} onClose={closeOrder}>
        <Ordermodal
          openPodrob={openOrderPodrob}
          type={orderType}
          onClose={closeOrder}
        />
      </Modal>
      <Modal isOpen={orderprodrob} onClose={closeOrderPodrob}>
        <Orderpreyti onClose={closeOrderPodrob} />
      </Modal>

      <div className="container">
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="klubniycart__textbox"
        >
          <h2 className="klubniycart__title">Цены и клубные карты </h2>
          <p className="klubniycart__doc">
            Чтобы вам было удобнее, мы подготовили 3 разновидности клубных
            абонементов. Стоимость индивидуальных занятий вы можете узнать
            у администратора.
          </p>
        </div>
        <ul className="klubniycart__list">
          <li
            data-aos="fade-right"
            data-aos-duration="1500"
            className="klubniycart__listitem"
          >
            <h3 className="klubniycart__list__title">lite</h3>
            <p className="klubniycar__list__doc">
              Удобная карта для тех, кто занимается фитнесом днём
            </p>
            <ul className="klubniycart__innerlist">
              <li className="klubniycart__innerlistitem">
                Будни: 10:30–17:00, 21:00–00:00 Выходные: 08:00–22:00
              </li>
              <li className="klubniycart__innerlistitem">
                Посещение фитнес-зон
              </li>
              <li className="klubniycart__innerlistitem">
                Посещение групповых классов
              </li>
              <li className="klubniycart__innerlistitem">Посещение SPA-зон</li>
              <li className="klubniycart__innerlistitem">
                Шкафчик в раздевалке на время занятий
              </li>
              <li className="klubniycart__innerlistitem">
                Комплект из 2 полотенец
              </li>
              <li className="klubniycart__innerlistitem__bottom">
                Активация карты в течение 30 дней
              </li>
            </ul>
            <button
              onClick={() => handleOrder("lite")}
              className="klubniycart__list__btn"
            >
              Забронировать
            </button>
          </li>
          <li
            data-aos="fade-down"
            data-aos-duration="1500"
            className="klubniycart__listitem klubniycart__listitemmain"
          >
            <img className="klubniycart__crownimg" src={crownimg} alt="" />
            <h3 className="klubniycart__list__title">Space</h3>
            <p className="klubniycar__list__doc">
              Статусная карта с пакетом привилегий «Flex Business»
            </p>
            <ul className="klubniycart__innerlist">
              <li className="klubniycart__innerlistitem">
                Будни: 06:00–00:00 <br /> Выходные: 08:00–22:00
              </li>
              <li className="klubniycart__innerlistitem">
                Посещение фитнес-зон
              </li>
              <li className="klubniycart__innerlistitem">
                Посещение групповых классов
              </li>
              <li className="klubniycart__innerlistitem">Посещение SPA-зон</li>
              <li className="klubniycart__innerlistitem">
                Шкафчик в раздевалке на время занятий
              </li>
              <li className="klubniycart__innerlistitem">
                Комплект из 2 полотенец
              </li>
              <li className="klubniycart__innerlistitem">
                Активация карты в течение 30 дней
              </li>
              <li className="klubniycart__innerlistitem">
                Приостановка действия клубного членства на 60 дней (30+30)
              </li>
              <li className="klubniycart__innerlistitem">
                10 гостевых визитов (1+1)
              </li>
              <li className="klubniycart__innerlistitem">
                Одна консультация нутрициолога
              </li>
              <li className="klubniycart__innerlistitem">
                365 дней аренды индивидуальной ячейки в раздевалке
              </li>

              <li className="klubniycart__innerlistitem__bottom">
                Статусный пакет: 2 полотенца, халат, белый браслет
              </li>
            </ul>
            <button
              onClick={() => handleOrder("space")}
              className="klubniycart__list__btn"
            >
              Забронировать
            </button>
          </li>
          <li
            data-aos="fade-left"
            data-aos-duration="1500"
            className="klubniycart__listitem"
          >
            <h3 className="klubniycart__list__title">FLEX</h3>
            <p className="klubniycar__list__doc">
              Оптимальная карта без ограничения посещений по времени
            </p>
            <ul className="klubniycart__innerlist">
              <li className="klubniycart__innerlistitem">
                Будни: 06:00–00:00 <br />
                Выходные: 08:00–22:00
              </li>
              <li className="klubniycart__innerlistitem">
                Посещение фитнес-зон
              </li>
              <li className="klubniycart__innerlistitem">
                Посещение групповых классов
              </li>
              <li className="klubniycart__innerlistitem">Посещение SPA-зон</li>
              <li className="klubniycart__innerlistitem">
                Шкафчик в раздевалке на время занятий
              </li>
              <li className="klubniycart__innerlistitem">
                Комплект из 2 полотенец
              </li>
              <li className="klubniycart__innerlistitem">
                Активация карты в течение 30 дней
              </li>
              <li className="klubniycart__innerlistitem">
                Приостановка действия клубного членства на 60 дней (30+30)
              </li>
              <li className="klubniycart__innerlistitem__bottom">
                3 гостевых визита
              </li>
            </ul>
            <button
              onClick={() => handleOrder("flex")}
              className="klubniycart__list__btn"
            >
              Забронировать
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};
