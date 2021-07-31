import React, { createContext, useState, useEffect, useContext } from "react";
import HeaderFilterContext from "./HeaderFilterContext";
import TempShareDataContext from "./TempShareData";

const GeneralPathContext = createContext([]);

export const GeneralPathProvider = (props) => {
  const [GeneralPath, setGeneralPath] = useState([]);
  const { clearFilter, headerFilterHandel } = useContext(HeaderFilterContext);
  const { tempCities } = useContext(TempShareDataContext);

  const [DefaultPath, setDefaultPath] = useState([
    {
      name: { ar: "المملكة العربة السعودية", en: "el mamlka" },
      id: -2,
      key: "ROOT",
      dependancy: {},
    },
    {
      name: { ar: "الرئيسية", en: "Home" },
      id: -3,
      key: "HOME",
      dependancy: {},
    },
    {
      name: {},
      id: -1,
      key: "city",
      dependancy: {},
    },
    {
      name: {},
      id: -1,
      key: "region",
      dependancy: {},
    },
    {
      name: {},
      id: -1,
      key: "activity",
      dependancy: {},
    },
    {
      name: {},
      id: -1,
      key: "market",
      dependancy: {},
    },
    {
      name: {},
      id: -1,
      key: "store",
      dependancy: {},
    },
  ]);

  useEffect(() => {
    if (sessionStorage.getItem("GeneralPath") !== null) {
      let temp = JSON.parse(sessionStorage.getItem("GeneralPath"));
      setGeneralPath(temp);
      console.log("GeneralPath-inti-> ", temp);
    } else {
      setGeneralPath(DefaultPath);
      sessionStorage.setItem("GeneralPath", JSON.stringify(DefaultPath));
      console.log("GeneralPath-inti-> ", DefaultPath);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("GeneralPath", JSON.stringify(GeneralPath));

    console.log(
      "path is change---> ",
      GeneralPath,
      JSON.parse(sessionStorage.getItem("GeneralPath"))
    );
  }, [GeneralPath]);

  const handleGeneralPath = (item, key) => {
    const newPaths = GeneralPath.map((path, index) => {
      if (index === 2 && key === "city") {
        path.id = item.id;
        path.name = item.name;
        path.dependancy = {};
      } else if (index === 3 && key === "region") {
        path.id = item.id;
        path.name = item.name;
        path.dependancy = {
          cityId: item.city.id,
        };
      } else if (index === 4 && key == "activity") {
        path.id = item.id;
        path.name = item.name;
        path.dependancy = {};
      }
       else if (index === 5 && key === "market") {
        path.id = item.id; // filter in city by activity
        path.name = { ar: item.username.ar, en: item.username.en };
        path.dependancy = {
          cityId: item.region.city.id,
          regionId: item.region.id,
        };
      } else if (index === 6 && key === "store") {
        path.id = item.id; // filter in city by activity
        path.name = item.name;
        path.dependancy = {
          cityId: item.cityId,
          regionId: item.regionId,
          marketId: item.marketId,
        };
      }

      return path;
    });

    setGeneralPath(newPaths);
  };

  const GoTo = (ToIndex, item, filterType = "") => {
    //dependancy --> possible keys {CityId , RegionId }

    console.log("go to data==>  ", ToIndex, item);

    //go to root of app it means page of all cities
    if (ToIndex === 0 || ToIndex === 1) {
      let arr = GeneralPath.filter((item, index) => {
        // will make changes in objects from the city object
        if (index >= 2) {
          item.name = {};
          item.id = -1;
          item.dependancy = {};
        }

        return item;
      });
      console.log("GeneralPath-clear filter-> ", arr);
      clearFilter();
      setGeneralPath(arr);
    } else if (ToIndex === 2) {
      //go to specific city so it means page of regions
      let arr = GeneralPath.filter((currentItem, index) => {
        //make changes in city object
        if (index === ToIndex) {
          currentItem.name = item.name;
          currentItem.id = item.id;
          currentItem.dependancy = item.dependancy ? item.dependancy : {};
        }
        // will make changes in objects after the city object
        if (index > ToIndex) {
          currentItem.name = {};
          currentItem.id = -1;
          currentItem.dependancy = {};
        }

        return item;
      });

      console.log("new arr go to-> ", arr);
      setGeneralPath(arr);
    } else if (ToIndex === 3) {
      if (filterType === "activityFilter") {
        let tempArr = GeneralPath.filter((currentItem, currentInd) => {
          if (currentInd === 4) {
            currentItem.name = item.name;
            currentItem.id = item.id;
            currentItem.dependancy = {};
          }
          return currentItem;
        });

        console.log("new arr-activityFilter> ", tempArr);
        setGeneralPath(tempArr);
      } else {
        //go to specific region markets so it means page of markets
        let arr = GeneralPath.filter((currentItem, index) => {
          // will make changes in objects before the region object (city object)
          if (index === 2) {
            let city_id = item.city.id
              ? item.city.id
              : item.dependancy &&
                item.dependancy.cityId &&
                item.dependancy.cityId;

            let filterCity = tempCities.filter((city) => {
              return city.id === city_id && city;
            });
            console.log("filter city===> ", tempCities, filterCity);
            currentItem.name = filterCity.length > 0 && filterCity[0].name;
            currentItem.id = filterCity[0].id;
            currentItem.dependancy = {};
          }
          //make changes in region object
          else if (index === ToIndex) {
            currentItem.name = item.name;
            currentItem.id = item.id;
            currentItem.dependancy = item.city.id
              ? { cityId: item.city.id }
              : item.dependancy
              ? item.dependancy
              : {};
          }

          // will make changes in market object
          else if (index === 5) {
            currentItem.name = {};
            currentItem.id = -1;
            currentItem.dependancy = {};
          }

          return item;
        });
        console.log("new arr-> ", arr);
        setGeneralPath(arr);
      }
    }
  };

  const GoTo_backward = (ToIndex, item, filterType = "") => {
    //dependancy --> possible keys {CityId , RegionId }

    console.log("go backward to data==>  ", ToIndex, item);

    //go to root of app it means page of all cities
    if (ToIndex === 0 || ToIndex === 1) {
      let arr = GeneralPath.filter((item, index) => {
        // will make changes in objects from the city object
        if (index >= 2) {
          item.name = {};
          item.id = -1;
          item.dependancy = {};
        }

        return item;
      });
      console.log("GeneralPath-clear filter-> ", arr);
      clearFilter();
      setGeneralPath(arr);
    } else if (ToIndex === 2) {
      //go to specific city so it means page of regions
      let arr = GeneralPath.filter((currentItem, index) => {
        //make changes in city object
        if (index === ToIndex) {
          currentItem.name = item.name;
          currentItem.id = item.id;
          currentItem.dependancy = item.dependancy ? item.dependancy : {};
        }
        // will make changes in objects after the city object
        if (index > ToIndex) {
          currentItem.name = {};
          currentItem.id = -1;
          currentItem.dependancy = {};
        }

        return item;
      });

      console.log("new arr-> ", arr);
      setGeneralPath(arr);
      headerFilterHandel("region", -1);
      headerFilterHandel("activity", []);
      headerFilterHandel("market", -1);
    } else if (ToIndex === 3) {
      //go to specific region markets so it means page of markets
      let arr = GeneralPath.filter((currentItem, index) => {
        // will make changes in objects before the region object (city object)
        if (index === 2) {
          let city_id = item.cityId
            ? item.cityId
            : item.dependancy &&
              item.dependancy.cityId &&
              item.dependancy.cityId;

          let filterCity = tempCities.filter((city) => {
            return city.id === city_id && city;
          });
          console.log("filter city===> ", filterCity);
          currentItem.name = filterCity.length > 0 && filterCity[0].name;
          currentItem.id = filterCity[0].id;
          currentItem.dependancy = {};
        }
        //make changes in region object
        else if (index === ToIndex) {
          currentItem.name = item.name;
          currentItem.id = item.id;
          currentItem.dependancy = item.cityId
            ? { cityId: item.cityId }
            : item.dependancy
            ? item.dependancy
            : {};
        }
        // if there is a value in activity will convert it to (All case)
        // wich means get all activities in this region
        else if (index === 4) {
          headerFilterHandel("activity", [0]);
          currentItem.name = { ar: "كل الانشطة", en: "All Activities" };
          currentItem.id = 0;
          currentItem.dependancy = {};
        }
        // will make changes in market object
        else if (index === 5) {
          currentItem.name = {};
          currentItem.id = -1;
          currentItem.dependancy = {};
        }

        return item;
      });
      console.log("new arr-> ", arr);
      setGeneralPath(arr);
    } else if (ToIndex === 4) {
      let arr = GeneralPath.filter((currentItem, index) => {
        //make changes in activity object
        if (index === ToIndex) {
          currentItem.name = item.name;
          currentItem.id = item.id;
          currentItem.dependancy = item.dependancy ? item.dependancy : {};
        }
        // will make changes in objects after the activity object
        if (index > ToIndex) {
          currentItem.name = {};
          currentItem.id = -1;
          currentItem.dependancy = {};
        }

        return item;
      });
      headerFilterHandel("market", -1);
    }
  };

  return (
    <GeneralPathContext.Provider
      value={{
        GeneralPath: GeneralPath,
        handleGeneralPath: handleGeneralPath,
        GoTo: GoTo,
        GoTo_backward: GoTo_backward,
      }}
    >
      {props.children}
    </GeneralPathContext.Provider>
  );
};

export default GeneralPathContext;
