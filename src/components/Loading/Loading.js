import Lottie from "react-lottie";
import animationData from "../../Assets/Lottie/data.json";
import styles from "../../styles/Loading.module.css";
const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={styles.loading__container}>
      <Lottie options={defaultOptions} height="50%" width="50%" />
    </div>
  );
};

export default Loading;
