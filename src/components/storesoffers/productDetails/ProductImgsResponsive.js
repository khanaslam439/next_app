import Slider from "react-slick";
import { API_END_POINT } from "../../../components/appConfig/AppConfig";

function ProductImgsResponsive(props) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
    };

    return (
        <div className='prodImgsResponsive d-lg-none d-block'>
            <Slider {...settings}>
                {props.productData && props.productData.slider.map((img, index) => {
                    return (
                        <div className="prodImgsResponsiveImages" key={index}>
                            <img src={`${API_END_POINT}${img}`} alt="product img" className="w-100 h-100" />
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}

export default ProductImgsResponsive
