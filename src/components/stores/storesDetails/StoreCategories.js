import titleImg from "../../../Assets/Images/store/titleImg.png";
import classes from "../../../styles/storesDetails.module.css";
import Link from "next/link";
import strings from "../../../Assets/Local/Local";
import { useRouter } from "next/router";

function StoreCategories(props) {
  const { query } = useRouter();
  strings.setLanguage(props.lang);

  let allowProperties = props.storeData.subscription.allowProperties;

  return (
    <div className={classes.storeCategories + " mt-5"}>
      <h4
        className={
          `${
            props.lang === "ar"
              ? classes.storeDivTitleAR
              : classes.storeDivTitleEN
          }` + " mb-3 position-relative d-flex align-items-center"
        }
      >
        <img src={titleImg} alt="title img" className="position-absolute" />
        <span>{strings.categories}</span>
      </h4>
      {props.storeData.subCategories.map((cat) => {
        return <span className={classes.spanCat}>{cat.name[props.lang]}</span>;
      })}
      {allowProperties.includes("ALL") && (
        <div
          className={classes.showAllProducts + " text-center rounded-lg mt-4"}
        >
          <Link
            href={{ pathname: `/Tajawal/products`, query: { id: query.id } }}
          >
            {strings.showAllProducts}
          </Link>
        </div>
      )}
    </div>
  );
}

export default StoreCategories;
