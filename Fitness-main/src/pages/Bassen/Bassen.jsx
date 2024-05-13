import React, { useEffect, useState } from "react";
import BarnerTrenajor from "../../components/TrenajorComponents/BarnerTrenajor/BarnerTrenajor";
import ImgTrenajor from "../../components/TrenajorComponents/ImgTrenajor/ImgTrenajor";
import Ownprogram from "../../components/TrenajorComponents/OwnProgram/Ownprogram";
import Trenor from "../../components/TrenajorComponents/Trenor/Trenor";
import Bassenbac from "../../assets/Images/png/bassenback.png";
import imgbassen from "../../assets/Images/png/imgbassen.png";
import Modal from "../../components/Modal/Modal";
import Typeorder from "../../components/OrdersComponent/Typeorder";
import TrenajorPreyti from "../../components/OrdersComponent/TrenajorPreyti";
import Trenerimg from "../../assets/Images/png/bassentrener.png";
import Controlimg from "../../assets/Images/svg/bassencotrol.svg";
import Trenajoraboutimg from "../../assets/Images/png/bassenabout.png";
import ownimg1 from "../../assets/Images/png/bassenx1.png";
import ownimg2 from "../../assets/Images/png/bassenx2.png";
import http from "../../servers/axios";
const Bassen = () => {
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
    prev__text: "Сайкл-студия",
    next__text: "Детский клуб",
    prev__url: "saykstudio",
    next__url: "detskiyfitnes",
    title: "Бассейн",
    text: "4 дорожки по 25 метров для индивидуальных и групповых занятий, после которых можно отдохнуть в сауне или хамаме.",
  };
  const trenor = {
    name: "максим фролов",
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
      title: "Aqua Combat",
      text: "Программа для подготовленных. Высокоинтенсивная тренировка в воде, направленная на развитие общей и силовой выносливости, включающая в себя элементы бокса и кикбоксинга.",
    },
    {
      image: ownimg2,
      title: "Aqua Круговая",
      text: "В основной части программы используется принцип круговой тренировки: в занятии чередуется аэробная и силовая работа. Возможно применение специального оборудования.",
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
        barnerback={Bassenbac}
      />
      <ImgTrenajor img={imgbassen} />
      <Trenor trenor={trenor} handleModal={openModal} />
      <Ownprogram data={ownprogram} />
    </div>
  );
};

export default Bassen;
