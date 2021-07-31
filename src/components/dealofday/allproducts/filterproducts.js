import { useContext, useState } from 'react'
import classes from '../../../styles/filterShopsProducts.module.css'
import { Accordion, Card, Button } from 'react-bootstrap'
import filterBTN from '../../../Assets/Images/filterBTN.png'
import LangContext from "../../../store/LangContext";
import strings from "../../../Assets/Local/Local";

function Filterproducts(props) {

    const { lang } = useContext(LangContext);
    const [stateCategories, setStateCategories] = useState([])

    const handleFilterCategories = (e) => {
        let newArrayFilter = [...stateCategories, e.target.id]
        if (stateCategories.includes(e.target.id)) {
            newArrayFilter = newArrayFilter.filter(cat => cat !== e.target.id);
        }
        setStateCategories(newArrayFilter)
        props.getFilteredCategories(newArrayFilter)
    };

    const handleFilterOrdering = (e) => {
        let newArrayFilter = e.target.id
        props.getFilteredOrdering(newArrayFilter)
    };

    strings.setLanguage(props.lang)

    return (
        <div className={classes.filterBody + ` ${props.lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <Accordion defaultActiveKey="0">
                <Card className={classes.filterCard}>
                    <Card.Header className={classes.filterCardHeader}>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className={classes.filterBTN}>
                            <span><img src={filterBTN} alt="filter BTN" className="img-fluid" /></span> <span className="mx-2">{strings.categories}</span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className={classes.filterCardBody}>
                            <div className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                <input type="checkbox" id="allC" onChange={handleFilterCategories} />
                                <label htmlFor="allC" >{strings.all}</label>
                            </div>
                            {props.categoriesFilters.map(cat => {
                                return (
                                    <div key={cat.id} className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                        `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                        <input type="checkbox" id={cat.id} onChange={handleFilterCategories} />
                                        <label htmlFor={cat.id} >{cat.name}</label>
                                    </div>
                                )
                            })}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <Accordion defaultActiveKey="0">
                <Card className={classes.filterCard}>
                    <Card.Header className={classes.filterCardHeader}>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className={classes.filterBTN}>
                            <span><img src={filterBTN} alt="filter BTN" className="img-fluid" /></span> <span className="mx-2">{strings.orderBy}</span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className={classes.filterCardBody}>
                            <div className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                <input type="radio" name="orderFilter" id="allO" onChange={handleFilterOrdering} />
                                <label htmlFor="allO" >{strings.all}</label>
                            </div>
                            <div className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                <input type="radio" name="orderFilter" id="lessPrice" onChange={handleFilterOrdering} />
                                <label htmlFor="lessPrice" >{strings.lessPrice}</label>
                            </div>
                            <div className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                <input type="radio" name="orderFilter" id="highPrice" onChange={handleFilterOrdering} />
                                <label htmlFor="highPrice" >{strings.highPrice}</label>
                            </div>
                            <div className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                <input type="radio" name="orderFilter" id="highRate" onChange={handleFilterOrdering} />
                                <label htmlFor="highRate" >{strings.highRate}</label>
                            </div>
                            <div className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                <input type="radio" name="orderFilter" id="addedNewly" onChange={handleFilterOrdering} />
                                <label htmlFor="addedNewly" >{strings.addedNewly}</label>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}

export default Filterproducts
