import { useState, useEffect, useContext } from "react";
import { RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import strings from "../../Assets/Local/Local";
import LangContext from "../../store/LangContext";
import styles from "../../styles/payment.module.css";
// product
const OrangeRadio = withStyles({
  root: {
    "&$checked": {
      color: orange[900],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const ProductList = ({
  shippingCompany,
  initialValue,
  product,
  HandleShipping,
}) => {
  const [deliveryMethods, setDeliveryMethods] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliverydata, setDeliverydata] = useState();
  const [intialval, setInitialValue] = useState(initialValue);

  const { lang } = useContext(LangContext);
  const handelDeliveryMethod = (companyid, traderid) => {
    let flag = intialval.find((item) => item.traderId === traderid);
    if (flag) {
      let index = intialval.findIndex((el) => el.traderId === traderid);
      intialval[index].companyId = companyid + "";
    } else {
      intialval.push({ traderId: traderid, companyId: companyid + "" });
    }
    setInitialValue(intialval);
  };
  useEffect(() => {
    let flag = intialval.find((item) => item.traderId === product[0].trader.id);
    if (flag) {
      console.log("deliveryMethods====> in if else", flag.companyId);

      setDeliveryMethods(flag.companyId);
    } else {
      if (shippingCompany.length) {
        setDeliveryMethods(shippingCompany[0].id);
        intialval.push({
          traderId: product[0].trader.id,
          companyId: shippingCompany[0].id + "",
          price: shippingCompany[0].price,
        });
      }
    }
    setInitialValue(intialval);
  }, [shippingCompany]);

  useEffect(() => {
    console.log("deliveryMethods====>", deliveryMethods);
    if (deliveryMethods) {
      if (shippingCompany.length) {
        const company = shippingCompany.find(
          (item) => item.id === +deliveryMethods
        );

        let index = intialval.findIndex(
          (el) => el.traderId === product[0].trader.id
        );
        intialval[index].price = company.price;
        HandleShipping(intialval);
        setDeliveryPrice(company.price);
      }
    }
  }, [deliveryMethods, shippingCompany]);

  strings.setLanguage(lang);
  return (
    <div className={styles.delivery_methods}>
      <div className={styles.market_name}>
        <h6>
          <span>{strings.store}</span> : {product[0].trader.name}
        </h6>
        <p>
          {strings.priceDelivery}:{deliveryPrice} {strings.currency}
        </p>
      </div>
      <div className={styles.payment_method_container}>
        <RadioGroup
          aria-label="delivey-methods"
          name="delivey-methods"
          value={`${deliveryMethods}`}
          onChange={(e) => {
            setDeliveryMethods(e.target.value + "");
            handelDeliveryMethod(e.target.value, product[0].trader.id);
            // localStorage.setItem(
            //   "tajwal_delivery_method",
            //   JSON.stringify(e.target.value + "")
            // );
            console.log("DeliveryMethod", e.target.value);
          }}
        >
          {shippingCompany.map((company) => (
            <FormControlLabel
              value={company.id + ""}
              control={<OrangeRadio />}
              label={<p>{company.name}</p>}
              key={company.id}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default ProductList;
