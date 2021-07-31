import { createContext, useState, useEffect } from "react";
import sessionstorage from "sessionstorage";

const HeaderFilterContext = createContext();

export const HeaderFilterContextProvider = (props) => {
  const defaultValue = [
    { name: "city", id: -1 },
    { name: "region", id: -1 },
    { name: "market", id: -1 },
    { name: "activity", id: [] },
    { name: "market_Type", id: "WHOLESALE" },
  ];
  const headerData = sessionstorage.getItem("tajawal_headerFilter")
    ? JSON.parse(sessionstorage.getItem("tajawal_headerFilter"))
    : defaultValue;

  const [filterValue, setFilterValue] = useState(headerData);

  useEffect(() => {
    console.log("filterValue", filterValue);
  }, [filterValue]);

  const filterHandel = (name, id) => {
    const updatedData = filterValue.map((item) => {
      if (item.name === name) {
        item.id = id;

        return item;
      }
      return item;
    });
    console.log("updatedData===> ", filterValue, updatedData);
    setFilterValue(updatedData);
    sessionstorage.setItem("tajawal_headerFilter", JSON.stringify(updatedData));
  };

  const activiytHandel = (id) => {
    const updatedActiviy = filterValue.map((item) => {
      if (item.name === "activity") {
        const isFound = item.id.find((idx) => idx === id);
        if (!isFound) {
          item.id.push(id);
        }
        return item;
      }
      return item;
    });
    //
    console.log("updatedActiviy", updatedActiviy);
    setFilterValue(updatedActiviy);
    sessionstorage.setItem(
      "tajawal_headerFilter",
      JSON.stringify(updatedActiviy)
    );
  };

  const clearSpecificFilter = (index, clearValue) => {
    let values = filterValue.filter((item, Idx) => {
      if (index === Idx) item.id = clearValue;
      return item;
    });
    setFilterValue(values);
  };

  const clearFilter = () => {
    setFilterValue(defaultValue);
    sessionstorage.setItem(
      "tajawal_headerFilter",
      JSON.stringify(defaultValue)
    );
  };

  return (
    <HeaderFilterContext.Provider
      value={{
        filter: filterValue,
        headerFilterHandel: filterHandel,
        clearFilter: clearFilter,
        clearSpecificFilter: clearSpecificFilter,
        activiytHandel: activiytHandel,
      }}
    >
      {props.children}
    </HeaderFilterContext.Provider>
  );
};

export default HeaderFilterContext;
