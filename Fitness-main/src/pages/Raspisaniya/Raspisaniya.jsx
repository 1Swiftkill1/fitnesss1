import React, { useEffect, useState } from "react";
import "./schedule.css";
import tableprev from "../../assets/Images/svg/tableprev.svg";
import tablenext from "../../assets/Images/svg/tablenext.svg";
import { Raspisaniinner } from "../../components/RaspisaniComponent/Raspisaniinner";
import Modal from "../../components/Modal/Modal";
import TrenajorModal from "../../components/OrdersComponent/TrenajorModal";
import Udavleniya from "../../components/OrdersComponent/Udavleniya";
import TrenajorPreyti from "../../components/OrdersComponent/TrenajorPreyti";
import http from "../../servers/axios";
const Raspisaniya = () => {
  const [udavleniya, setUdavleniya] = useState(false);
  const [trenajormodal, setTrenajorModal] = useState(false);
  const [preyti, setPreyti] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [service, setService] = useState("");
  const [udavdata, setUdavdata] = useState({});
  const [data, setData] = useState([]);
  const [week, setWeek] = useState([]);
  const [count, setCount] = useState(0);
  const handleOpen = () => {
    setUdavleniya(true);
  };
  const handleClose = () => {
    setUdavleniya(false);
  };

  const orederTable = () => {
    handleOpen();
  };
  const closeTrenajorModal = () => {
    setTrenajorModal(false);
  };
  const openTrenajorModal = () => {
    setTrenajorModal(true);
  };
  const openPreyti = () => {
    setPreyti(true);
  };
  const closePreyti = () => {
    setPreyti(false);
  };

  const getData = () => {
    http
      .get(`/schedule-list/?date_count=${count}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setWeek(res.data?.data[0]?.days);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, [count]);
  return (
    <section className="schedule">
      <Modal isOpen={udavleniya} onClose={handleClose}>
        <Udavleniya
          setService={setService}
          setSchedule={setSchedule}
          item={udavdata}
          openTrenajorModal={openTrenajorModal}
          onClose={handleClose}
        />
      </Modal>
      <Modal isOpen={trenajormodal} onClose={closeTrenajorModal}>
        <TrenajorModal
          service={service}
          id={schedule}
          openPreyti={openPreyti}
          onClose={closeTrenajorModal}
        />
      </Modal>
      <Modal isOpen={preyti} onClose={closePreyti}>
        <TrenajorPreyti onClose={closePreyti} />
      </Modal>
      <div className="container">
        <h2 className="schedule__title">Расписание</h2>
        <div className="schedule__wrapper">
          <div className="schedule__header">
            <button
              onClick={() => setCount((prev) => prev - 1)}
              className="schedule__header__prev"
            >
              <img className="schedule__controlimg" src={tableprev} alt="" />
            </button>
            <h4 className="schedule__month">{data?.month}</h4>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="schedule__header__next"
            >
              <img className="schedule__controlimg" src={tablenext} alt="" />
            </button>
          </div>
          <div className="schedule__table__wrapper">
            <table className="schedule__table">
              <thead>
                <tr className="head__tr">
                  <th className="schedule__first_th"></th>
                  {week?.map((item, index) => (
                    <th key={index}>
                      <h4 className="schedule__date">
                        {item.date}.{item.month} <br /> {item?.day}
                      </h4>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((item, index) => (
                  <tr key={index}>
                    <td className="schedule__first_td">{item?.time} </td>
                    {item?.days?.map((item, index) => (
                      <>
                        <td key={index}>
                          {!item?.is_free && (
                            <Raspisaniinner
                              handleClick={handleOpen}
                              setUdav={setUdavdata}
                              item={item?.schedule}
                            />
                          )}
                        </td>
                      </>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Raspisaniya;
