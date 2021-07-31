import { useContext } from "react";
import { useRouter } from "next/router";

import LangContext from "../../../../store/LangContext";
import AddAddress from "../../../../components/myaddresses/addaddress/addaddress";
import MetaDecartor from "../../../../components/MetaDecrator/MetaDecrator";
import strings from "../../../../Assets/Local/Local";

function index() {
  const { lang } = useContext(LangContext);
  const { query } = useRouter();

  strings.setLanguage(lang);

  return (
    <div className="special-padding-pages w-100">
      <MetaDecartor title={strings.title} />
      <AddAddress isPayment={query.payment ? true : false} />
    </div>
  );
}

export default index;
