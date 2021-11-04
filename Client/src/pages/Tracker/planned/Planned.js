import React, { Fragment, useEffect, useState } from 'react';
import './Planned.css'
import firebase from 'firebase/compat';
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
import moment from 'moment';


const Myday = () => {
    const [selectedDate, handleDateChange] = useState(new Date());
    const [count, setCount] = useState(1);
    const [uid, setUid] = useState();
    const [displayPlannedTask, setDisplayPlannnedTask] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/addmydayfromplannedauto', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json()).then(
                fetch('http://localhost:3000/deleteplannedtaskauto', {
                    method: 'DELETE',
                })
            );

        countFive();
    }, []);

    useEffect(() => {

        var link = "http://localhost:3000/showplannedtask/";
        link = link.concat(uid);
        console.log(uid);
        fetch(link)
            .then(res => res.json()
                .then(
                    (result) => {
                        setDisplayPlannnedTask(result.data.tasks);
                    }));
        /*var link = 'http://localhost:3000/deleteplannedtask/';
    link = link.concat(taskid);
    fetch(link, {
        method: 'DELETE',
    }).then(
        setCount(count + 1));*/


    }, [count]);

    const countFive = () => {
        for (var i = 0; i <= 5; i++) {
            setCount(count + 1);
        }
    }
    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            setUid(firebase.auth().currentUser.uid);
        }
    }, [uid]);

    const createTask = () => {
        if (document.getElementById("inputPlannedTask").className === "inputBoxShow") {
            document.getElementById("inputPlannedTask").className = "inputBoxHide";
        }
        else {
            document.getElementById("taskPlannedInput").value = "";
            document.getElementById("inputPlannedTask").className = "inputBoxShow";
            document.getElementById("taskPlannedInput").focus();
        }

    };
    const addTask = () => {
        document.getElementById("inputPlannedTask").className = "inputBoxHide";
        var task = document.getElementById("taskPlannedInput").value;
        var isCompleted = false;
        var isAddedToMyday = false;
        fetch('http://localhost:3000/addplannedtask', {
            method: 'POST',
            body: JSON.stringify({ uid, task, isCompleted, isAddedToMyday }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json().then(
                setCount(count + 1)
            ));
        console.log(moment(new Date()).format("yyyy-MM-DD"));
    }

    const editTask = (divid) => {
        setCount(count + 1);
        document.getElementsByClassName("test")[divid].style.border = "4px solid #00908e";
        document.getElementsByClassName("taskPlanned")[divid].contentEditable = true;
        document.getElementsByClassName("taskPlanned")[divid].focus();
        var range = document.createRange()
        var sel = window.getSelection()
        range.setStart(document.getElementsByClassName("taskPlanned")[divid], 1)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
    }

    const updateTask = (taskid, divid) => {
        removeFocus(divid);
        document.getElementsByClassName("test")[divid].style.border = "none"
        document.getElementsByClassName("test")[divid].contentEditable = false;
        var task = document.getElementsByClassName("taskPlanned")[divid].innerHTML;
        var link = 'http://localhost:3000/editplannedtask/';
        link = link.concat(taskid);
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        });
        setCount(count + 1);

    }
    const updateDate = (taskid, divid, date) => {
        console.log(moment(date).format("yyyy-MM-DD"));
        handleDateChange(date);
        var dateValue = moment(date).format("yyyy-MM-DD");
        var link = 'http://localhost:3000/editPlannedtaskdate/';
        link = link.concat(taskid);
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ dateValue })
        });
        setCount(count + 1);
    }

    const deleteTask = (taskid) => {
        var link = 'http://localhost:3000/deleteplannedtask/';
        link = link.concat(taskid);
        fetch(link, {
            method: 'DELETE',
        }).then(
            setCount(count + 1));
    }

    const addToMyday = (taskid, divid) => {
        var task = document.getElementsByClassName("taskPlanned")[divid].innerHTML;
        fetch('http://localhost:3000/addmydayfromplanned', {
            method: 'POST',
            body: JSON.stringify({ uid, task }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json().then(
                setCount(count + 1)
            ));
        var link = 'http://localhost:3000/deleteplannedtask/';
        link = link.concat(taskid);
        fetch(link, {
            method: 'DELETE',
        }).then(
            setCount(count + 1));

    }

    const setisCompleted = (taskid, divid) => {
        if (displayPlannedTask[divid].iscompleted == false) {
            document.getElementsByClassName("taskPlanned")[divid].style.setProperty("text-decoration", "line-through");
            var task = true;
            var link = 'http://localhost:3000/setplannedcompleted/';
            link = link.concat(taskid);
            console.log(link);
            fetch(link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            });
            setCount(count + 1);
        }
        else if (displayPlannedTask[divid].iscompleted == true) {
            document.getElementsByClassName("taskPlanned")[divid].style.setProperty("text-decoration", "none");
            var task = false;
            var link = 'http://localhost:3000/setplannedcompleted/';
            link = link.concat(taskid);
            console.log(link);
            fetch(link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task })
            });
            setCount(count + 1);
        }
    }

    const removeFocus = (divid) => {
        document.getElementsByClassName("test")[divid].style.border = "none"
        document.getElementsByClassName("taskPlanned")[divid].contentEditable = false;
    }
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
                {
                    displayPlannedTask.map((planned, index) =>
                        <div className="test">
                            <div>
                                <div class="taskCheckBox">
                                    <input className="form-check-input" type="checkbox" value="" onClick={() => setisCompleted(planned.id, index)} id="flexCheckDefault" checked={planned.iscompleted ? true : false} />
                                </div>
                                <h2 className="taskPlanned" contentEditable={false} onBlur={() => removeFocus(index)}
                                    onKeyPress={event => {
                                        if (event.key === "Enter") {
                                            updateTask(planned.id, index);
                                        }
                                    }} id={planned.iscompleted ? "taskPlannedCompleteID" : "taskPlannedID"}>{planned.task}</h2>
                            </div>
                            <div className="datePicker">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >

                                    <KeyboardDatePicker
                                        id="datePicker"
                                        clearable
                                        value={planned.day}
                                        placeholder="10/10/2018"
                                        onChange={date => updateDate(planned.id, index, date)}
                                        minDate={new Date()}
                                        format="dd-MM-yyyy"
                                    />
                                </MuiPickersUtilsProvider>
                                <div className="taskIcons">
                                    <div className="taskIcon" onClick={() => addToMyday(planned.id, index)}>
                                        <img className="addtomydayicon" src={myday} alt="" width="20" />
                                    </div>
                                    <div className="taskIcon" onClick={() => editTask(index)}>
                                        <img src={editIcon} width="20"></img>
                                    </div>
                                    <div className="taskIcon" onClick={() => deleteTask(planned.id)}>
                                        <img src={deleteIcon} width="20"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                <div className="inputBoxHide" id="inputPlannedTask" onKeyPress={event => {
                    if (event.key === "Enter") {
                        addTask();
                    }
                }}>
                    <input type="text" id="taskPlannedInput" name="fname" autoComplete="off"></input>
                </div>
                <div class="newBtn" onClick={createTask}>
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