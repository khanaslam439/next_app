import { useContext, useState } from 'react'
import classes from '../../../styles/filterShopsProducts.module.css'
import LangContext from "../../../store/LangContext";
import { Button, Modal, Tabs, Tab } from 'react-bootstrap'
import strings from "../../../Assets/Local/Local";

function FilterResponsive(props) {

    const { lang } = useContext(LangContext);
    const [stateCategories, setStateCategories] = useState([])
    const [stateOrdering, setStateOrdering] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFilterCategories = (e) => {
        let newArrayFilter = [...stateCategories, e.target.id]
        if (stateCategories.includes(e.target.id)) {
            newArrayFilter = newArrayFilter.filter(cat => cat !== e.target.id);
        }
        setStateCategories(newArrayFilter)
    };

    function submitFilterCategories() {
        props.getFilteredCategories(newArrayFilter)
        setTimeout(() => {
            handleClose()
        }, 1000);
    }

    const handleFilterOrdering = (e) => {
        let newArrayFilter = e.target.id
        setStateOrdering(newArrayFilter)
    };

    function submitFilterOrdering() {
        props.getFilteredOrdering(stateOrdering)
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
                    <Tabs defaultActiveKey="cats" id="uncontrolled-tab-example" className='mb-3 border-0'>
                        <Tab eventKey="cats" title={strings.categories} style={{ direction: props.lang === 'ar' ? "rtl" : "ltr" }} className={props.lang === 'ar' ? "text-right" : "text-left"}>
                            {props.categoriesFilters.map(cat => {
                                return (
                                    <div key={cat.id} className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                        <input type="checkbox" id={cat.id} onChange={handleFilterCategories} />
                                        <label htmlFor={cat.id}>{cat.name}</label>
                                    </div>
                                )
                            })}
                            <Button onClick={submitFilterCategories} className={classes.filterApplyBTN}>{strings.applyBTN}</Button>
                        </Tab>
                        <Tab eventKey="activites" title={strings.orderBy} style={{ direction: props.lang === 'ar' ? "rtl" : "ltr" }} className={props.lang === 'ar' ? "text-right styleCheckBoxBG" : "text-left styleCheckBoxBG"}>
                            <div className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                <input type="radio" name="orderFilter" id="allO" onChange={handleFilterOrdering} />
                                <label htmlFor="allO" >{strings.all}</label>
                            </div>
                            <div className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                <input type="radio" name="orderFilter" id="lessPrice" onChange={handleFilterOrdering} />
                                <label htmlFor="lessPrice" >{strings.lessPrice}</label>
                            </div>
                            <div className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                <input type="radio" name="orderFilter" id="highPrice" onChange={handleFilterOrdering} />
                                <label htmlFor="highPrice" >{strings.highPrice}</label>
                            </div>
                            <div className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                <input type="radio" name="orderFilter" id="highRate" onChange={handleFilterOrdering} />
                                <label htmlFor="highRate" >{strings.highRate}</label>
                            </div>
                            <div className={lang === 'ar' ? `${classes.filterFormGroupAR + ' inputCheckbox'}` : `${classes.filterFormGroupEN + ' inputCheckbox'}`}>
                                <input type="radio" name="orderFilter" id="addedNewly" onChange={handleFilterOrdering} />
                                <label htmlFor="addedNewly" >{strings.addedNewly}</label>
                            </div>
                            <Button onClick={submitFilterOrdering} className={classes.filterApplyBTN}>{strings.applyBTN}</Button>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default FilterResponsive
