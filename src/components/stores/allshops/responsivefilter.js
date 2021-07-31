import { useContext, useState } from 'react'
import classes from '../../../styles/filterShopsProducts.module.css'
import LangContext from "../../../store/LangContext";
import { Button, Modal, Tabs, Tab } from 'react-bootstrap'
import strings from "../../../Assets/Local/Local";

function FilterResponsive(props) {

    const { lang } = useContext(LangContext);
    const [stateBlocks, setStateBlocks] = useState([])
    const [stateActivities, setStateActivities] = useState([]);
    const [stateCategories, setStateCategories] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFilterActivities = (e) => {
        let checked = e.target.id
        checked = checked.slice(6)
        let newArrayFilter = [...stateActivities, checked]
        if (stateActivities.includes(checked)) {
            newArrayFilter = newArrayFilter.filter(cat => cat !== checked);
        }
        setStateActivities(newArrayFilter)
    };

    const handleFilterCategories = (e) => {
        let checked = e.target.id
        checked = checked.slice(6)
        let newArrayFilter = [...stateCategories, checked]
        if (stateCategories.includes(checked)) {
            newArrayFilter = newArrayFilter.filter(cat => cat !== checked);
        }
        setStateCategories(newArrayFilter)
    };

    const handleFilterBlocks = (e) => {
        let checked = e.target.id
        checked = checked.slice(6)
        let newArrayFilter = [...stateBlocks, checked]
        if (stateBlocks.includes(checked)) {
            newArrayFilter = newArrayFilter.filter(cat => cat !== checked);
        }
        setStateBlocks(newArrayFilter)
    };

    function submitFilterActivities() {
        props.getFilteredActivities(stateActivities)
        setTimeout(() => {
            handleClose()
        }, 1000);
    }

    function submitFilterCategories() {
        props.getFilteredCategories(stateCategories)
        setTimeout(() => {
            handleClose()
        }, 1000);
    }

    function submitFilterBlocks() {
        props.getFilteredBlocks(stateBlocks)
        setTimeout(() => {
            handleClose()
        }, 1000);
    }

    strings.setLanguage(props.lang)
    return (
        <div className="d-lg-none d-block">

            <div className={classes.handleFilter} onClick={handleShow}>
                <i className="fas fa-filter"></i>
            </div>

            <Modal
                className="responsiveFilter"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className="border-0 pb-0">
                </Modal.Header>
                <Modal.Body>
                    <Tabs defaultActiveKey="blocks" id="uncontrolled-tab-example" className='mb-3 border-0'>
                        <Tab eventKey="blocks" title={strings.blocks} style={{ direction: props.lang === 'ar' ? "rtl" : "ltr" }} className={props.lang === 'ar' ? "text-right" : "text-left"}>
                            {props.blocksFilters.map(cat => {
                                return (
                                    <div key={cat.id} className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                        <input type="checkbox" id={`'blc'+${cat.id}`} onChange={handleFilterBlocks} />
                                        <label htmlFor={`'blc'+${cat.id}`}>{cat.name}</label>
                                    </div>
                                )
                            })}
                            <Button onClick={submitFilterBlocks} className={classes.filterApplyBTN}>{strings.applyBTN}</Button>
                        </Tab>
                        <Tab eventKey="activites" title={strings.activities} style={{ direction: props.lang === 'ar' ? "rtl" : "ltr" }} className={props.lang === 'ar' ? "text-right styleCheckBoxBG" : "text-left styleCheckBoxBG"}>
                            {props.activitiesFilters.map(cat => {
                                return (
                                    <div key={cat.id} className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                        <input type="checkbox" id={`'act'+${cat.id}`} onChange={handleFilterActivities} />
                                        <label htmlFor={`'act'+${cat.id}`}>{cat.name}</label>
                                    </div>
                                )
                            })}
                            <Button onClick={submitFilterActivities} className={classes.filterApplyBTN}>{strings.applyBTN}</Button>
                        </Tab>
                        <Tab eventKey="cats" title={strings.categories} style={{ direction: props.lang === 'ar' ? "rtl" : "ltr" }} className={props.lang === 'ar' ? "text-right" : "text-left"}>
                            {props.categoriesFilters.map(cat => {
                                return (
                                    <div key={cat.id} className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                        <input type="checkbox" id={`'cat'+${cat.id}`} onChange={handleFilterCategories} />
                                        <label htmlFor={`'cat'+${cat.id}`}>{cat.name}</label>
                                    </div>
                                )
                            })}
                            <Button onClick={submitFilterCategories} className={classes.filterApplyBTN}>{strings.applyBTN}</Button>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default FilterResponsive
