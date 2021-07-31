import React, { createContext, useState } from "react";

const TempShareDataContext = createContext({
  tempCities: [],
  tempRegions: [],
  tempMarkets: [],
  activities: [],
  subCategory: [],
  handelCities: () => {},
  handelRegions: () => {},
  handelActivity: () => {},
  handelMarkets: () => {},
  handelSubCategory: () => {},
  regionsFilterHandel: (cityName) => {},
  subCategoryFilter: (subCategroyName, lang) => {},
  findSubCategory: (subCategroyName, lang) => {},
  marketsFilterHandel: (regionId) => {},
});

export const TempShareData = ({ children }) => {
  const [citiesContainer, setCities] = useState();

  const [regionsContainer, setRegions] = useState();

  const [marketsContainer, setMarkets] = useState();
  const [acitvityContainer, setAcitvityContainer] = useState();
  const [subCategoryContianer, setSubCategoryContianer] = useState();

  const regionsFilterHandel = (cityName, lang) => {
    const regionsFilter = regionsContainer.filter(
      (item) => item.city.name[lang] === cityName
    );
    return regionsFilter;
  };

  const handelCities = (newCities) => {
    setCities(newCities);
  };
  const handelRegions = (newRegions) => {
    const sortedRegions = newRegions.sort(
      (item1, item2) => item1.order - item2.order
    );
    console.log("regions=>>", newRegions);
    console.log("regionssorted=>>", sortedRegions);
    setRegions(sortedRegions);
  };
  const handelActivity = (newActivities) => {
    setAcitvityContainer(newActivities);
  };
  const handelMarkets = (newMarkets) => {
    setMarkets(newMarkets);
  };
  const handelSubCategory = (newSubCategories) => {
    setSubCategoryContianer(newSubCategories);
  };

  const marketsFilterHandel = (regionId) => {
    return marketsContainer.filter(({ region }) => region.id === regionId);
  };
  const subCategoryFilter = (subCategroyName, lang) => {
    if (subCategoryContianer) {
      return subCategoryContianer.filter(
        ({ parent }) => parent.name[lang] === subCategroyName
      );
    }
    return [];
  };
  const findSubCategory = (subCategroyName, lang) => {
    if (subCategoryContianer) {
      return subCategoryContianer.find(
        ({ parent }) => parent.name[lang] === subCategroyName
      );
    }
    return 0;
  };
  return (
    <TempShareDataContext.Provider
      value={{
        tempCities: citiesContainer,
        tempRegions: regionsContainer,
        tempMarkets: marketsContainer,
        activities: acitvityContainer,
        subCategory: subCategoryContianer,
        handelCities,
        handelRegions,
        handelActivity,
        handelMarkets,
        handelSubCategory,

        regionsFilterHandel,
        subCategoryFilter,
        findSubCategory,
        marketsFilterHandel,
      }}
    >
      {children}
    </TempShareDataContext.Provider>
  );
};
export default TempShareDataContext;
