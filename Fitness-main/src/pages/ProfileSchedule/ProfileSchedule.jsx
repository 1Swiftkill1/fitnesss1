import React, { useEffect, useState, useTransition } from "react";
import ProfilNavbar from "../../components/Profilecomponents/ProfileNavbar/ProfileNavbar";
import { ProfileRaspisaninner } from "../../components/RaspisaniComponent/ProfileRaspisaniinner";
import "./style.css";
import http from "../../servers/axios";
const ProfileSchedule = () => {
  const [data, setData] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [group, setGroup] = useState([]);
  const getData = () => {
    http
      .get("/participant-training-list/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setPersonal(res?.data?.personal);
        setGroup(res?.data?.group);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="profileschedule">
      <div className="container">
        <h2 className="profileschedule__title">Расписание</h2>
        <div className="profileschedule__wrapper">
          <ProfilNavbar />
          <div className="profileschedule__main">
            <h3 className="profileschedule__inner__title">
              вАШИ АКТИВНЫЕ ЗАПИСИ
            </h3>
            <div className="profileschedule__maintablebox">
              <ul className="profileschedule__list">
                <li className="profileschedule__listitem">
                  <h3 className="profileschedule__list__title">гРУППОВЫЕ</h3>
                  <ul className="profileschedule__innerlist  profileschedule__innerlist__first">
                    {group
                      .slice(0, Math.ceil(group.length / 3))
                      ?.map((item, index) => (
                        <li key={index}>
                          <ProfileRaspisaninner item={item} />
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="profileschedule__listitem">
                  <h3 className="profileschedule__list__title">гРУППОВЫЕ</h3>
                  <ul className="profileschedule__innerlist">
                    {group
                      .slice(
                        Math.ceil(group.length / 3),
                        2 * Math.ceil(group.length / 3)
                      )
                      ?.map((item, index) => (
                        <li key={index}>
                          <ProfileRaspisaninner item={item} />
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="profileschedule__listitem">
                  <h3 className="profileschedule__list__title">гРУППОВЫЕ</h3>
                  <ul className="profileschedule__innerlist">
                    {group
                      .slice(2 * Math.ceil(group.length / 3), group?.length)
                      ?.map((item, index) => (
                        <li key={index}>
                          <ProfileRaspisaninner item={item} />
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="profileschedule__listitem">
                  <h3 className="profileschedule__list__title">лИЧНЫЕ</h3>
                  <ul className="profileschedule__innerlist  profileschedule__innerlist__first">
                    {personal
                      .slice(0, Math.ceil(personal.length / 3))
                      ?.map((item, index) => (
                        <li key={index}>
                          <ProfileRaspisaninner item={item} />
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="profileschedule__listitem">
                  <h3 className="profileschedule__list__title">лИЧНЫЕ</h3>
                  <ul className="profileschedule__innerlist">
                    {personal
                      .slice(
                        Math.ceil(personal.length / 3),
                        2 * Math.ceil(personal.length / 3)
                      )
                      ?.map((item, index) => (
                        <li key={index}>
                          <ProfileRaspisaninner item={item} />
                        </li>
                      ))}
                  </ul>
                </li>
                <li className="profileschedule__listitem">
                  <h3 className="profileschedule__list__title">лИЧНЫЕ</h3>
                  <ul className="profileschedule__innerlist">
                    {personal
                      .slice(
                        2 * Math.ceil(personal.length / 3),
                        personal.length
                      )
                      ?.map((item, index) => (
                        <li key={index}>
                          <ProfileRaspisaninner item={item} />
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSchedule;
