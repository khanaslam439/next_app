import storeAd from '../../Assets/Images/store/storeAd.png'

function StoreAds(props){
  
  return (
    <div className={props.lang === 'ar' ? 'text-left' : 'text-right'}>
      <div>
        <img src={storeAd} alt="store ad" className="img-fluid mb-3" />
      </div>
      <div>
        <img src={storeAd} alt="store ad" className="img-fluid mb-3" />
      </div>
    </div>
  )
}

export default StoreAds
