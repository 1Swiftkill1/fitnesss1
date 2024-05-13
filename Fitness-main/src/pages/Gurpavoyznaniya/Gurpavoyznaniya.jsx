import React, { useEffect, useState } from "react";
import BarnerTrenajor from "../../components/TrenajorComponents/BarnerTrenajor/BarnerTrenajor";
import ImgTrenajor from "../../components/TrenajorComponents/ImgTrenajor/ImgTrenajor";
import Ownprogram from "../../components/TrenajorComponents/OwnProgram/Ownprogram";
import Trenor from "../../components/TrenajorComponents/Trenor/Trenor";
import gurpavoyback from "../../assets/Images/png/allzananiyabac.png";
import imgbassen from "../../assets/Images/png/imgallznaniya.png";
import Modal from "../../components/Modal/Modal";
import Typeorder from "../../components/OrdersComponent/Typeorder";
import TrenajorPreyti from "../../components/OrdersComponent/TrenajorPreyti";
import Trenerimg from "../../assets/Images/png/gurpavoytrener.png";
import Controlimg from "../../assets/Images/svg/controltrener.svg";
import Trenajoraboutimg from "../../assets/Images/png/gurpavoyabout.png";
import ownimg1 from "../../assets/Images/png/allx1.png";
import ownimg2 from "../../assets/Images/png/allx2.png";
import ownimg3 from "../../assets/Images/png/allx3.png";
import ownimg4 from "../../assets/Images/png/allx4.png";
import http from "../../servers/axios";
const Gurpavoyznaniya = () => {
  const [modal, setModal] = useState(false);
  const [preyti, setPreyti] = useState(false);
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
    prev__text: "Йога",
    next__text: "Сайкл-студия",
    prev__url: "yoga",
    next__url: "saykstudio",
    title: "Групповые занятия",
    text: "Два больших зала для групповых тренировок. Профессиональные инструкторы. Направления для любого возраста и физической подготовки.",
  };
  const trenor = {
    name: "Ирина пестова",
    position: "Руководитель фитнес-зоны",
    about:
      "Тренер разработает индивидуальную программу и научит правильно выполнять упражнения",
    Image: Trenerimg,
    controlimg: Controlimg,
    aboutimg: Trenajoraboutimg,
  };
  const ownprogram = [
    {
      image: ownimg1,
      title: "BodyCombat",
      text: "Программа разработана на основе карате, кикбоксинга, бокса и тхэквондо. Занятия укрепляют все мышечные группы, интенсивно тренируют сердечно-сосудистую систему. Улучшается координация, осанка, скоростно-силовые показатели и гибкость.",
    },
    {
      image: ownimg2,
      title: "BodyPump",
      text: "Программа с использованием штанги с регулируемым весом. Проходит под зажигательную музыку. Укрепляет связки и суставы, улучшает силовую выносливость. Вы станете сильнее и рельефней без чрезмерного увеличения мышц в объеме.",
    },
    {
      image: ownimg3,
      title: "Pilates",
      text: "Спокойная тренировка, направленная на гармоничную работу мышц всего тела. Улучшает гибкость и подвижность суставов. Укрепляет мышечный корсет и формирует правильную осанку.",
    },
    {
      image: ownimg4,
      title: "Stretch",
      text: "Программа улучшает гибкость и подвижность суставов, снимает напряжение и усталость мышц.",
    },
  ];
  const [types, setTypes] = useState([]);
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
        barnerback={gurpavoyback}
      />
      <ImgTrenajor img={imgbassen} />
      <Trenor trenor={trenor} handleModal={openModal} />
      <Ownprogram data={ownprogram} />
    </div>
  );
};

export default Gurpavoyznaniya;
