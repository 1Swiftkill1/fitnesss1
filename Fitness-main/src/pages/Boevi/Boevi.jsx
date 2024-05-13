import React, { useEffect, useState } from "react";
import BarnerTrenajor from "../../components/TrenajorComponents/BarnerTrenajor/BarnerTrenajor";
import ImgTrenajor from "../../components/TrenajorComponents/ImgTrenajor/ImgTrenajor";
import Ownprogram from "../../components/TrenajorComponents/OwnProgram/Ownprogram";
import Trenor from "../../components/TrenajorComponents/Trenor/Trenor";
import Boevikback from "../../assets/Images/png/boevikbac.png";
import imgboevi from "../../assets/Images/png/imgboevik.png";
import Modal from "../../components/Modal/Modal";
import Typeorder from "../../components/OrdersComponent/Typeorder";
import TrenajorPreyti from "../../components/OrdersComponent/TrenajorPreyti";
import Trenerimg from "../../assets/Images/png/trenorimg.png";
import Controlimg from "../../assets/Images/svg/boxcontrol.svg";
import Trenajoraboutimg from "../../assets/Images/png/aboutbox.png";
import ownimg1 from "../../assets/Images/png/boevix1.png";
import ownimg2 from "../../assets/Images/png/boevix2.png";
import http from "../../servers/axios";
const Boevi = () => {
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
    prev__text: "Детский клуб",
    next__text: "Тренажёрный зал",
    prev__url: "detskiyfitnes",
    next__url: "trejanor",
    title: "Боевые искусства",
    text: "Гармоничное воспитание юных резидентов клуба. Сочетаем занятия по физическому, интеллектуальному и творческому развитию.",
  };
  const trenor = {
    name: "Владимир Патчин",
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
      title: "Бокс",
      text: "Занятия включают упражнения для укрепления здоровья, основы ударной техники и навыки защиты. Бокс тренирует скорость, выносливость и реакцию.",
    },
    {
      image: ownimg2,
      title: "Mix Fight",
      text: "Mix Fight — это смешение различных стилей единоборств в одном уроке, включающих в себя технику бокса, боевого самбо, дзюдо, вольной борьбы, кикбоксинга, тайского бокса и рукопашного боя. Развивает взрывную силу, укрепляет плечевой пояс и мышцы кора.",
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
        barnerback={Boevikback}
      />
      <ImgTrenajor img={imgboevi} />
      <Trenor trenor={trenor} handleModal={openModal} />
      <Ownprogram data={ownprogram} />
    </div>
  );
};

export default Boevi;
