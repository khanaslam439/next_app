import storeLogo from '../../../Assets/Images/store/storeLogo.png'
import classes from '../../../styles/filterShopsProducts.module.css'

function Storetitle(props) {
    return (
        <div className={classes.storeName + ' d-flex align-items-center mb-4'}>
            <div>
                <img src={storeLogo} alt="store ad" className="img-fluid mt-3" />
            </div>
            <h2 className={props.lang === "ar" ? "mr-3 mb-0" : "ml-3 mb-0"}>محلات العويس</h2>
        </div>
    )
}

export default Storetitle
