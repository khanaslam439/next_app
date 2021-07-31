import { useContext } from "react";
import LangContext from "../store/LangContext";
import GeneralPathContext from "../store/GeneralPath";

import MetaDecartor from "../components/MetaDecrator/MetaDecrator";
import strings from "../Assets/Local/Local";
import Home from "../components/Home/Home";
import { API_END_POINT } from "../components/appConfig/AppConfig";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const { lang } = useContext(LangContext);
  const { GeneralPath } = useContext(GeneralPathContext);
  strings.setLanguage(lang);

  return (
    <div>
      <MetaDecartor title={strings.title} />
      
      <Home />
    </div>
  );
}
