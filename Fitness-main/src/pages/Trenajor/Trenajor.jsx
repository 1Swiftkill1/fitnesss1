import React, { useEffect, useState } from "react";
import BarnerTrenajor from "../../components/TrenajorComponents/BarnerTrenajor/BarnerTrenajor";
import ImgTrenajor from "../../components/TrenajorComponents/ImgTrenajor/ImgTrenajor";
import Ownprogram from "../../components/TrenajorComponents/OwnProgram/Ownprogram";
import Trenor from "../../components/TrenajorComponents/Trenor/Trenor";
import Trenajorback from "../../assets/Images/png/trenajorbac.png";
import imgbassen from "../../assets/Images/png/imgtrenajor.png";
import Modal from "../../components/Modal/Modal";
import Typeorder from "../../components/OrdersComponent/Typeorder";
import TrenajorPreyti from "../../components/OrdersComponent/TrenajorPreyti";
import Trenerimg from "../../assets/Images/png/trenorimg.png";
import Controlimg from "../../assets/Images/svg/gantel.svg";
import Trenajoraboutimg from "../../assets/Images/png/trenajorbout.png";
import Ownprogramimg from "../../assets/Images/png/ownersimg.png";
import Ownprogramimg2 from "../../assets/Images/png/trenajorx2.png";
import Ownprogramimg3 from "../../assets/Images/png/trenajorx3.png";
import http from "../../servers/axios";
const Trenajor = () => {
  const [modal, setModal] = useState(false);
  const [preyti, setPreyti] = useState(false);
  const [types, setTypes] = useState([]);
  const openPreyti = () => {
    setPreyti(true);
  };
  const closePreyti = () => {
    setPreyti(false);
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const pagechange = {
    prev__text: "Боевые искусства",
    next__text: "Йога",
    prev__url: "boevi",
    next__url: "yoga",
    title: "Тренажёрный зал",
    text: "650 м2 пространства для тренировок, лучшие тренажёры Life Fitness, MATRIX и Hammer Strength, зона функционального тренинга для всех типов нагрузок.",
  };
  const trenor = {
    name: "денис стольников",
    position: "Руководитель фитнес-зоны",
    about:
      "Тренер разработает индивидуальную программу и научит правильно выполнять упражнения",
    Image: Trenerimg,
    controlimg: Controlimg,
    aboutimg: Trenajoraboutimg,
  };

  const ownprogram = [
    {
      image: Ownprogramimg,
      title: "HIIT",
      text: "Интервальная кардио-тренировка с использованием датчиков пульса MyZone. Включает в себя работу с гантелями, штангами и гирями. Высокая интенсивность достигается за счет работы на пределе возможностей с минимальным перерывом отдыха — 5-10 секунд.",
    },
    {
      image: Ownprogramimg2,
      title: "TRX",
      text: "Тренировка с использованием петель TRX, BOSU и оборудования для функционального тренинг. Развивает взрывную силу и выносливость мышц.",
    },
    {
      image: Ownprogramimg3,
      title: "Hammer Strength",
      text: "Культовые тренажёры Hammer Strength учитывают нелинейное движения рук и ног. Идеальная биомеханика делает тренировки безопасными и эффективными.",
    },
  ];
  const getSelect = () => {
    http
      .get("/service-list/")
      .then((res) => {
        console.log(res.data);
        setTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSelect();
  }, []);
  return (
    <div>
      <Modal isOpen={modal} onClose={closeModal}>
        <Typeorder types={types} onClose={closeModal} openPreyti={openPreyti} />
      </Modal>
      <Modal isOpen={preyti} onClose={closePreyti}>
        <TrenajorPreyti onClose={closePreyti} />
      </Modal>
      <BarnerTrenajor
        openModal={openModal}
        title={pagechange.title}
        text={pagechange.text}
        pagechange={pagechange}
        barnerback={Trenajorback}
      />
      <ImgTrenajor img={imgbassen} />
      <Trenor trenor={trenor} handleModal={openModal} />
      <Ownprogram data={ownprogram} />
    </div>
  );
};

export default Trenajor;
