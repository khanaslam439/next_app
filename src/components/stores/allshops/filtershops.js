import { useContext, useState } from 'react'
import classes from '../../../styles/filterShopsProducts.module.css'
import { Accordion, Card, Button } from 'react-bootstrap'
import filterBTN from '../../../Assets/Images/filterBTN.png'
import LangContext from "../../../store/LangContext";
import strings from "../../../Assets/Local/Local";

function Filtershops(props) {
    const { lang } = useContext(LangContext);
    const [stateBlocks, setStateBlocks] = useState([])
    const [stateActivities, setStateActivities] = useState([]);
    const [stateCategories, setStateCategories] = useState([]);

    const handleFilterActivities = (e) => {
        let checked = e.target.id
        checked = checked.slice(6)
        let newArrayFilter = [...stateActivities, checked]
        if (stateActivities.includes(checked)) {
            newArrayFilter = newArrayFilter.filter(cat => cat !== checked);
        }
        setStateActivities(newArrayFilter)
        props.getFilteredActivities(newArrayFilter)
    };

    const handleFilterCategories = (e) => {
        let checked = e.target.id
        checked = checked.slice(6)
        let newArrayFilter = [...stateCategories, checked]
        if (stateCategories.includes(checked)) {
            newArrayFilter = newArrayFilter.filter(cat => cat !== checked);
        }
        setStateCategories(newArrayFilter)
        props.getFilteredCategories(newArrayFilter)
    };

    const handleFilterBlocks = (e) => {
        let checked = e.target.id
        checked = checked.slice(6)
        let newArrayFilter = [...stateBlocks, checked]
        if (stateBlocks.includes(checked)) {
            newArrayFilter = newArrayFilter.filter(cat => cat !== checked);
        }
        setStateBlocks(newArrayFilter)
        props.getFilteredBlocks(newArrayFilter)
    };

    return (
        <div className={classes.filterBody + ` ${props.lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <Accordion defaultActiveKey="0">
                <Card className={classes.filterCard}>
                    <Card.Header className={classes.filterCardHeader}>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className={classes.filterBTN}>
                            <span><img src={filterBTN} alt="filter BTN" className="img-fluid" /></span> <span className="mx-2">{strings.blocks}</span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className={classes.filterCardBody}>
                            {props.blocksFilters.map(cat => {
                                return (
                                    <div key={`'blc'+${cat.id}`} className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                        `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                        <input type="checkbox" id={`'blc'+${cat.id}`} onChange={handleFilterBlocks} />
                                        <label htmlFor={`'blc'+${cat.id}`} >{cat.name}</label>
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
                            <span><img src={filterBTN} alt="filter BTN" className="img-fluid" /></span> <span className="mx-2">{strings.activities}</span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className={classes.filterCardBody}>
                            {props.activitiesFilters.map(cat => {
                                return (
                                    <div key={`'act'+${cat.id}`} className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                        `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                        <input type="checkbox" id={`'act'+${cat.id}`} onChange={handleFilterActivities} />
                                        <label htmlFor={`'act'+${cat.id}`} >{cat.name}</label>
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
                            <span><img src={filterBTN} alt="filter BTN" className="img-fluid" /></span> <span className="mx-2">{strings.categories}</span>
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body className={classes.filterCardBody}>
                            {props.categoriesFilters.map(cat => {
                                return (
                                    <div key={`'cat'+${cat.id}`} className={lang === 'ar' ? `${classes.filterFormGroup + ' ' + classes.filterFormGroupAR}` :
                                        `${classes.filterFormGroup + ' ' + classes.filterFormGroupEN}`}>
                                        <input type="checkbox" id={`'cat'+${cat.id}`} onChange={handleFilterCategories} />
                                        <label htmlFor={`'cat'+${cat.id}`} >{cat.name}</label>
                                    </div>
                                )
                            })}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

        </div>
    )
}

export default Filtershops

