import Lottie from "react-lottie";
import animationEmptyMarket from "../../Assets/Lottie/emptymarkets.json";
const ItemsNotFound = ({ elementClass, title }) => {
  const defaultOptionsLoading = {
    loop: true,
    autoplay: true,
    animationData: animationEmptyMarket,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={elementClass}>
      <Lottie options={defaultOptionsLoading} height={300} width={300} />
      <h5 style={{ textAlign: "center", fontSize: "24px" }}>{title}</h5>
    </div>
  );
};

export default ItemsNotFound;
