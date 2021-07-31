import { createContext, useState, useEffect } from "react";
import cookie from "react-cookies";

const LangContext = createContext({
  lang:
    cookie.load("tajwalWebLang") !== undefined
      ? cookie.load("tajwalWebLang")
      : "ar",
  handelLang: (newLang) => {},
});

export const LangContextProvider = (props) => {
  const [lang, setLang] = useState(
    cookie.load("tajwalWebLang") !== undefined
      ? cookie.load("tajwalWebLang")
      : "ar"
  );

  const handelLang = (newLang) => {
    console.log("handelLang---> ", newLang);
    setLang(newLang);
    cookie.save("tajwalWebLang", newLang, { path: "/" });
  };

  useEffect(() => {
    console.log("lang in useEffect=>", lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang: lang, handelLang: handelLang }}>
      {props.children}
    </LangContext.Provider>
  );
};
export default LangContext;
