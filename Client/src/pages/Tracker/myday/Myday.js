import React from 'react';
import { Form } from 'react-bootstrap'
import './Myday.css'
import mydayIcon from '../../../Images/mydayActive.svg'
import planIcon from '../../../Images/planInactive.svg'
import listIcon from '../../../Images/listInactive.svg'
import addIcon from '../../../Images/addIcon.svg'

const Myday = () => {
    return (
        <div>
            <div class="sideMenuDua">

                <div class="menuItem">
                    <a className="menuItem activeNav" href="#">
                        <div className="menuIcon" >
                            <img src={mydayIcon} width="25"></img>
                        </div>
                        <div className="menuText">My Day</div>
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Tracker/planned">
                        <div className="menuIcon">
                            <img src={planIcon} width="25"></img>
                        </div>
                        <div className="menuText">Planned</div>
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Tracker/listofuser">
                        <div className="menuIcon">
                            <img src={listIcon} width="25"></img>
                        </div>
                        <div className="menuText">Lists</div>
                    </a>
                </div>
                <div class="menuItem addBtn">
                        <div className="menuIcon">
                            <img src={addIcon} width="25"></img>
                        </div>
                        <div className="menuText">Add</div>
                    
                </div>


            </div>
            <div className="rightDiv">
                <div className="taskBox">
                    <div class="taskCheckBox">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    </div>
                    <h2 className="taskText">Reading 10 pages of Quran</h2>
                </div>

                <div className="taskBox">
                    <div class="taskCheckBox">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    </div>
                    <h2 className="taskText">Listening Khutbah</h2>
                </div>

                <div className="taskBox">
                    <div class="taskCheckBox">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    </div>
                    <h2 className="taskText">Practicing Calligraphy</h2>
                </div>

            </div>
        </div>
    );
};

export default Myday;