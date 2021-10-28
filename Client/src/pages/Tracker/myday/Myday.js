import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap'
import './Myday.css'
import firebase from 'firebase/compat';
import mydayIcon from '../../../Images/mydayActive.svg'
import planIcon from '../../../Images/planInactive.svg'
import listIcon from '../../../Images/listInactive.svg'
import addIcon from '../../../Images/addIcon.svg'
import newIcon from '../../../Images/newIcon.svg'
import editIcon from '../../../Images/editIcon.svg'
import deleteIcon from '../../../Images/deleteIcon.svg'
import recurringIcon from '../../../Images/recurring.svg'

const Myday = () => {
    const [uid, setUid] = useState();
    const [displayMydayTask, setDisplayMydayTask] = useState([]);

    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            setUid(firebase.auth().currentUser.uid);
        }
    }, [uid]);

    useEffect(() => {
        var link = "http://127.0.0.1:3000/showmyday/";
        link = link.concat(uid);
        fetch(link)
            .then(res => res.json())
            .then(
                (result) => {
                    setDisplayMydayTask(result.data.tasks);
                }
            )
    }
    )


    const createTask = () => {
        if (document.getElementById("inputMydayTask").className === "inputBoxShow") {
            document.getElementById("inputMydayTask").className = "inputBoxHide";
        }
        else {
            document.getElementById("taskInput").value = "";
            document.getElementById("inputMydayTask").className = "inputBoxShow";
        }

    };


    const addTask = () => {
        document.getElementById("inputMydayTask").className = "inputBoxHide";
        var task = document.getElementById("taskInput").value;
        var isRecurred = false;
        fetch('http://localhost:3000/addmyday', {
            method: 'POST',
            body: JSON.stringify({ uid, task, isRecurred }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json());

    }

    const deleteTask = (taskid) => {
        var link = 'http://localhost:3000/deletemydaytask/';
        link = link.concat(taskid);
        fetch(link, {
            method: 'DELETE',
        });
    }

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

                {
                    displayMydayTask.map(myday =>
                        <div className="taskBox">
                            <div class="taskCheckBox">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>
                            <h2 className="taskText">{myday.task}</h2>
                            <div className="taskIcons">
                                <div className="taskIcon">
                                    <img src={recurringIcon} width="20"></img>
                                </div>
                                <div className="taskIcon">
                                    <img src={editIcon} width="20"></img>
                                </div>
                                <div className="taskIcon" onClick={() => deleteTask(myday.id)}>
                                    <img src={deleteIcon} width="20"></img>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="inputBoxHide" id="inputMydayTask" onKeyPress={event => {
                    if (event.key === "Enter") {
                        addTask();
                    }
                }}>
                    <input type="text" id="taskInput" name="fname" autoComplete="off"></input>
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