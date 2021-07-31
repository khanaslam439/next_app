import React, { useContext, useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Collapse, Checkbox } from "antd";
import LangContext from "../../../store/LangContext";
import GeneralPathContext from "../../../store/GeneralPath";
import HeaderFilterContext from "../../../store/HeaderFilterContext";
import TempShareDataContext from "../../../store/TempShareData";
import String from "../../../Assets/Local/Local";

import styles from "../../../styles/Home.filter.module.css";

const CityFilter = () => {
  const { Panel } = Collapse;
  const { lang } = useContext(LangContext);
  const { GoTo } = useContext(GeneralPathContext);
  const { filter, headerFilterHandel } = useContext(HeaderFilterContext);
  const [activityFilterValue, setActivityFilterValue] = useState([]);
  const { activities } = useContext(TempShareDataContext);
  const [Selected, setSelected] = useState([]);

  useEffect(() => {
    // initalize value and activity

    let activityPrevValue = filter.filter((item, ind) => {
      return item.name === "activity" && item.id.length > 0;
    });

    if (activityPrevValue.length > 0 && activityPrevValue[0].id.length > 0) {
      setActivityFilterValue(activityPrevValue[0].id[0]);
    }
  }, [filter]);

  function onChange(activity) {
    setActivityFilterValue(activity);
  }

  const onFilterSend = () => {
    if (activityFilterValue.length > 0) {
      let currentfilter = filter.filter((item, index) => {
        if (item.name === "activity") {
          item.id = activityFilterValue;

          return item;
        }
        return item;
      });
      console.log("currentfilter in city --> ", currentfilter);
      headerFilterHandel("activity", currentfilter[3].id);
    }
  };

  return (
    <div className={lang === "ar" && styles.filterAr}>
      <Collapse
        defaultActiveKey={["1"]}
        style={{ textAlign: lang === "ar" ? "right" : "left" }}
      >
        <Panel header={String.activityfiltertitlecity} key="1"  style={{maxHeight:'350px', overflow:'scroll',  scrollbarWidth: 'none' }}>
          <Checkbox.Group onChange={onChange} value={activityFilterValue}>
            {activities.map((activity, index) => {
              return (
                <p
                  className={
                    lang === "en" ? styles.filterAttrEn : styles.filterAttrAr
                  }
                  key={index}
                >
                  {" "}
                  <Checkbox value={activity.id}>{activity.name[lang]}</Checkbox>
                </p>
              );
            })}
          </Checkbox.Group>
          <button onClick={onFilterSend} className={styles.searchBtn}>
            {String.Search}
          </button>
        </Panel>
      </Collapse>
    </div>
  );
};

export default CityFilter;
