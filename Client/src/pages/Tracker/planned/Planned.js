import React, { Fragment, useState } from 'react';
import './Planned.css'
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import { KeyboardDatePicker } from "@material-ui/pickers";

import mydayIcon from '../../../Images/mydayInactive.svg'
import planIcon from '../../../Images/planActive.svg'
import listIcon from '../../../Images/listInactive.svg'
import addIcon from '../../../Images/addIcon.svg'
import myday from '../../../Images/mydayplanned.svg'
import editIcon from '../../../Images/editplanned.svg'
import deleteIcon from '../../../Images/deleteplanned.svg'
import newIcon from '../../../Images/newIcon.svg'


const Myday = () => {
    const [selectedDate, handleDateChange] = useState(new Date());
    return (
        <div>
            <div class="sideMenuDua">

                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Tracker/myday">
                        <div className="menuIcon" >
                            <img src={mydayIcon} width="25"></img>
                        </div>
                        <div className="menuText">My Day</div>
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem activeNav" href="#">
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
                <div className="test">
                    <div>
                    <div class="taskCheckBox">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    </div>
                    <h2 className="taskPlanned">Reading 10 pages of Quran</h2>
                    </div>
                    <div className="datePicker">
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <KeyboardDatePicker
                            clearable
                            value={selectedDate}
                            placeholder="10/10/2018"
                            onChange={date => handleDateChange(date)}
                            minDate={new Date()}
                            format="MM/dd/yyyy"
                        />
                        </MuiPickersUtilsProvider>
                        <div className="taskIcons">
                                <div className="taskIcon" >
                                    <img className="addtomydayicon" src={myday} alt="" width="20" />
                                </div>
                                <div className="taskIcon">
                                    <img src={editIcon} width="20"></img>
                                </div>
                                <div className="taskIcon" >
                                    <img src={deleteIcon} width="20"></img>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="newBtn">
                    <div className="newIcon">
                        <img src={newIcon} width="20"></img>
                    </div>
                    <div className="menuText">New</div>
                </div>



            </div>
        </div>
    );
};

export default Myday;