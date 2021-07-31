import Slider from "react-slick";
import { API_END_POINT } from "../../components/appConfig/AppConfig";

function StoreSlider({ storeData: { slider }, lang }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    appendDots: (dots) => (
      <div>
        <ul className="mb-0"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => <div>{i + 1}</div>,
  };

  return (
    <div
      className={
        lang === "ar"
          ? "storeSlider storeSliderAR"
          : "storeSlider storeSliderEN"
      }
    >
      <Slider {...settings}>
        {slider.map((img, index) => {
          return (
            <div key={index}>
              <img
                src={`${API_END_POINT}/${img}`}
                alt="img"
                className="w-100 h-100"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default StoreSlider;
