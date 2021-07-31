import storeAd from '../../../Assets/Images/store/storeAd.png'

function Productsads(props) {
    return (
        <div>
            <div className={props.lang === 'ar' ? 'text-right d-lg-block d-none' : 'text-left d-lg-block d-none'}>
                <img src={storeAd} alt="store ad" className="w-100 mt-3" />
            </div>
            <div className={props.lang === 'ar' ? 'text-right d-lg-block d-none' : 'text-left d-lg-block d-none'}>
                <img src={storeAd} alt="store ad" className="w-100 mt-3" />
            </div>
            <div className={props.lang === 'ar' ? 'text-right d-lg-block d-none' : 'text-left d-lg-block d-none'}>
                <img src={storeAd} alt="store ad" className="w-100 mt-3" />
            </div>
        </div>
    )
}

export default Productsads
