import storeLogo from '../../../Assets/Images/store/storeLogo.png'
import classes from '../../../styles/filterShopsProducts.module.css'

function Storetitle(props) {
    return (
        <div>
            {
                props.allProducts.length > 0 && <div className={classes.storeName + ' d-flex align-items-center mb-4'}>
                    {console.log("props.allProducts: ", props.allProducts)}
                    <div>
                        <img src={storeLogo} alt="store ad" className="img-fluid mt-3" />
                    </div>
                    <h2 className={props.lang === "ar" ? "mr-3 mb-0" : "ml-3 mb-0"}>{props.allProducts[0].trader.name}</h2>
                </div>
            }
        </div>
    )
}

export default Storetitle
