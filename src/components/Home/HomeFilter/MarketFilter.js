import React, { useContext, useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Collapse, Checkbox, Radio } from "antd";
import LangContext from "../../../store/LangContext";
import GeneralPathContext from "../../../store/GeneralPath";
import HeaderFilterContext from "../../../store/HeaderFilterContext";
import TempShareDataContext from "../../../store/TempShareData";

import String from "../../../Assets/Local/Local";

import styles from "../../../styles/Home.filter.module.css";

const MarketFilter = () => {
  const { Panel } = Collapse;
  const { lang } = useContext(LangContext);
  const { GoTo } = useContext(GeneralPathContext);
  const { filter, headerFilterHandel } = useContext(HeaderFilterContext);
  const [activityFilterValue, setActivityFilterValue] = useState([]);
  const [RegionFilterValue, setRegionFilterValue] = useState(null);
  const { tempRegions, activities } = useContext(TempShareDataContext);

  useEffect(() => {
    // initalize values of region and activity
    let regionPrevValue = filter.filter((item, ind) => {
      return item.name === "region" && item.id !== -1;
    });
    let activityPrevValue = filter.filter((item, ind) => {
      return item.name === "activity" && item.id.length > 0;
    });

    if (regionPrevValue.length > 0) {
      setRegionFilterValue(regionPrevValue[0].id);
    }

    if (activityPrevValue.length > 0 && activityPrevValue[0].id.length > 0) {
      setActivityFilterValue(activityPrevValue[0].id);
    }
  }, [filter]);

  function onChangeActivity(activity) {
    console.log("onChangeActivity==> ", activity);

    setActivityFilterValue(activity);
  }

  function onChangeRegion(region) {
    console.log("onChangeRegion===? ", region.target.value);
    setRegionFilterValue(region.target.value);
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

      headerFilterHandel("activity", currentfilter[3].id);
    }

    if (RegionFilterValue !== null) {
      let currentfilter = filter.filter((item, index) => {
        if (item.name === "region") {
          item.id = RegionFilterValue;
          return item;
        }
        return item;
      });
      console.log("market filter send== > ", currentfilter);

      headerFilterHandel("region", currentfilter[1].id);
    }
  };

  return (
    <div className={lang === "ar" && styles.filterAr}>
      <Collapse
        defaultActiveKey={["1", "2"]}
        style={{ textAlign: lang === "ar" ? "right" : "left" }}
      >
        <Panel header={String.regioniltertitlecity} key="1" style={{maxHeight:'350px', overflow:'scroll',  scrollbarWidth: 'none' }}>
          <Radio.Group onChange={onChangeRegion} value={RegionFilterValue}>
            {tempRegions.map((region, index) => {
              return (
                <p
                  className={
                    lang === "en" ? styles.filterAttrEn : styles.filterAttrAr
                  }
                  key={index}
                >
                  <Radio value={region.id}> {region.name[lang]}</Radio>
                </p>
              );
            })}
          </Radio.Group>
        </Panel>
        <Panel header={String.activityfiltertitlecity} key="2"  style={{maxHeight:'350px', overflow:'scroll',  scrollbarWidth: 'none' }}>
          <Checkbox.Group
            onChange={onChangeActivity}
            value={activityFilterValue}
          >
            {activities.length > 0 &&
              activities.map((activity, index) => {
                {
                  console.log("activity in checkbox", activity);
                }
                return (
                  <p
                    className={
                      lang === "en" ? styles.filterAttrEn : styles.filterAttrAr
                    }
                    key={index}
                  >
                    {" "}
                    <Checkbox value={activity.id}>
                      {activity.name[lang]}
                    </Checkbox>
                  </p>
                );
              })}
          </Checkbox.Group>
        </Panel>
        <button onClick={onFilterSend} className={styles.searchBtn}>
          {String.Search}
        </button>
      </Collapse>
    </div>
  );
};

export default MarketFilter;
