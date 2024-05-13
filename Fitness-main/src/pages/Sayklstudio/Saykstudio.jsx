import React, { useEffect, useState } from "react";
import BarnerTrenajor from "../../components/TrenajorComponents/BarnerTrenajor/BarnerTrenajor";
import ImgTrenajor from "../../components/TrenajorComponents/ImgTrenajor/ImgTrenajor";
import Ownprogram from "../../components/TrenajorComponents/OwnProgram/Ownprogram";
import Trenor from "../../components/TrenajorComponents/Trenor/Trenor";
import Sayklstudioback from "../../assets/Images/png/sayklstudiobac.png";
import imgbassen from "../../assets/Images/png/imgsaykstudio.png";
import Modal from "../../components/Modal/Modal";
import Typeorder from "../../components/OrdersComponent/Typeorder";
import TrenajorPreyti from "../../components/OrdersComponent/TrenajorPreyti";
import Trenerimg from "../../assets/Images/png/saykltrener.png";
import Controlimg from "../../assets/Images/svg/controlsaykl.svg";
import Trenajoraboutimg from "../../assets/Images/png/sayklabout.png";
import ownimg1 from "../../assets/Images/png/sayklx1.png";
import ownimg2 from "../../assets/Images/png/sayklx2.png";
import http from "../../servers/axios";
const Saykstudio = () => {
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
    prev__text: "Групповые занятия",
    next__text: "Бассейн",
    prev__url: "allzananiya",
    next__url: "bassen",
    title: "Сайкл-студия",
    text: "Отдельная студия с американскими тренажерами ICG. Увлекательные велотренировки перед огромным экраном. Полезны для укрепления сердечно-сосудистой системы и сжигания лишнего жира.",
  };
  const trenor = {
    name: "Юлия Ерёмина",
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
      title: "Cycle Connect",
      text: "Высокоинтенсивная тренировка ICG Connect продолжительностью 55 минут. Контроль пульса с помощью датчиков MyZone и 50 вариантов интерактивных трасс делают программу максимально интересной.",
    },
    {
      image: ownimg2,
      title: "Cycle",
      text: "Интенсивная велотренировка. Укрепляет мышцы ног и ягодиц, тренирует сердечно-сосудистую систему и сжигает калории. Конструкция тренажёра позволяет снять осевую нагрузку на позвоночник, что делает программу максимально безопасной.",
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
        barnerback={Sayklstudioback}
      />
      <ImgTrenajor img={imgbassen} />
      <Trenor trenor={trenor} handleModal={openModal} />
      <Ownprogram data={ownprogram} />
    </div>
  );
};

export default Saykstudio;
