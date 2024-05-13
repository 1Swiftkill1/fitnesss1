import React, { useEffect, useState } from "react";
import BarnerTrenajor from "../../components/TrenajorComponents/BarnerTrenajor/BarnerTrenajor";
import ImgTrenajor from "../../components/TrenajorComponents/ImgTrenajor/ImgTrenajor";
import Ownprogram from "../../components/TrenajorComponents/OwnProgram/Ownprogram";
import Trenor from "../../components/TrenajorComponents/Trenor/Trenor";
import yogaback from "../../assets/Images/png/yogabac.png";
import imgbassen from "../../assets/Images/png/imgyoga.png";
import Modal from "../../components/Modal/Modal";
import Typeorder from "../../components/OrdersComponent/Typeorder";
import TrenajorPreyti from "../../components/OrdersComponent/TrenajorPreyti";
import Trenerimg from "../../assets/Images/png/yogatrener.png";
import Controlimg from "../../assets/Images/svg/yogacontrol.svg";
import Trenajoraboutimg from "../../assets/Images/png/yogaaboutimg.png";
import ownimg1 from "../../assets/Images/png/yogax1.png";
import ownimg2 from "../../assets/Images/png/yogax2.png";
import http from "../../servers/axios";
const Yoga = () => {
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
    prev__text: "Тренажёрнный зал",
    next__text: "Групповые программы",
    prev__url: "trejanor",
    next__url: "allzananiya",
    title: "Студия йоги",
    text: "Коврики, специальные лампы и гамаки. Четыре стиля йоги для начинающих и профессионалов. Помогут узнать своё тело, развить гибкость и укрепить здоровье.",
  };
  const trenor = {
    name: "Ирина Пташенская",
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
      title: "Кундалини-йога",
      text: "Практика омоложения и общего оздоровления даёт заряд бодрости, жизненной энергии и прекрасного настроения на первом же занятии. Позволяет лучше осознавать свои чувства и мысли, быть честным с собой. Изначально кундалини-йога предназначалась для духовного совершенствования, но сегодня её успешно практикуют для достижения конкретных целей в здоровье, общении, бизнесе.",
    },
    {
      image: ownimg2,
      title: "хатха йога",
      text: "Практика для начинающих и профессионалов.Популярное направление классической йоги, которое научит пользоваться своим телом. Комплексы асан часто используют для улучшения здоровья, борьбы с заболеваниями. Существуют специальные упражнения, направленные на выпрямление позвоночника, укрепление мышц живота и спины, раскрытие суставов. Занятия включают и время для релаксации, потому что наука расслабления тела и ума является неотъемлемой частью практики. ",
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
        barnerback={yogaback}
      />
      <ImgTrenajor img={imgbassen} />
      <Trenor trenor={trenor} handleModal={openModal} />
      <Ownprogram data={ownprogram} />
    </div>
  );
};

export default Yoga;
