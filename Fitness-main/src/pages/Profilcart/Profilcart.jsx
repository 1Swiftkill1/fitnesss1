import React, { useContext, useEffect, useState } from "react";
import "./profilcart.css";
import Profilnavbar from "../../components/Profilecomponents/ProfileNavbar/ProfileNavbar";
import http from "../../servers/axios";
import { Context } from "../../context/Context";

const Profilcart = () => {
  const { setFirstname } = useContext(Context);
  const email = localStorage.getItem("email");
  const code = localStorage.getItem("code");
  const [status, setStatus] = useState(false);
  const [data, setData] = useState({});
  const [abonoment, setAbonoment] = useState([]);
  const getStatus = () => {
    http
      .get(`/profile/${email}/`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setStatus(res?.data?.active_user);
        setAbonoment(res?.data?.abonoment);
        setFirstname(res?.data?.first_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getStatus();
  }, []);
  return (
    <section className="profilcart">
      <div className="container">
        <h2 className="profilcart__title">Клубные карты</h2>
        <div className="profilcart__wrapper">
          <Profilnavbar />

          <div className="profilcart__box">
            <h3 className="profilcart__box-title">ваши карты</h3>
            {abonoment[0]?.type && (
              <div className="profilcart__statusbox">
                <h4 className="profilcart__statusbox__title">{}</h4>
                {status ? (
                  <h5 className="profilcart__statusbox__status">
                    <span className="profilcart__status__cricle-active"></span>
                    Статус: активна
                  </h5>
                ) : (
                  <h5 className="profilcart__statusbox__status">
                    <span className="profilcart__status__cricle"></span>
                    Статус:{" "}
                    <span className="profilcart__status__text">неактивна </span>
                  </h5>
                )}
                {status ? (
                  <p className="profilcart__statusbox__doc">
                    Ваша карта успешно активирована!
                  </p>
                ) : (
                  <p className="profilcart__statusbox__doc">
                    Для активации, покажите выданный вам код, администрации на
                    ресепшен
                  </p>
                )}
                {!status && (
                  <button className="porfilcart__statusbox__btn">{code}</button>
                )}
                <h6 className="profilcart__statusbox__active">
                  Дата активации
                </h6>
                <h6 className="profilcart__statusbox__active-number">
                  {status ? `${data.data_activate}` : " XX.XX.XXXX"}
                </h6>
                <h6 className="profilcart__statusbox__active">
                  Дата окончания
                </h6>
                <h6 className="profilcart__statusbox__active-number">
                  {status ? `${data?.data_expired}` : " XX.XX.XXXX"}
                </h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profilcart;
