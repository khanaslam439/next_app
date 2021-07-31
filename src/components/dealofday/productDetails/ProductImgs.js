import { useState, useEffect } from 'react'
import classes from '../../../styles/productDetails.module.css'
import { API_END_POINT } from "../../../components/appConfig/AppConfig";

function ProductImgs(props) {
  const [imgSrc, setImgSrc] = useState("")

  const handleImgIndex = (imgSrc) => {
    setImgSrc(imgSrc.img)
  }

  useEffect(() => {
    { props.productData && setImgSrc(props.productData.slider[0]) }
  }, [])

  return (
    <div className={classes.prodImgs + ' d-lg-flex d-none'}>
      <div className={classes.prodSmallImg}>

        {props.productData && props.productData.slider.map((img, index) => {
          return (
            <div key={index}
              className="d-flex justify-content-center align-items-center"
              onClick={() => handleImgIndex({ img })}
            >
              <img src={`${API_END_POINT}/${img}`} alt="product img" className="img-fluid" />
            </div>
          )
        })}

      </div>
      <div
        className={
          classes.prodFullImg +
          ' d-flex justify-content-center align-items-center'
        }
      >

        <img src={props.productData && `${API_END_POINT}/${imgSrc}`} alt="product img" className="img-fluid" />
      </div>
    </div>
  )
}

export default ProductImgs
