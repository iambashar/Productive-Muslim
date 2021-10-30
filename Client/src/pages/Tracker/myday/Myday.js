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
import recurringIconChecked from '../../../Images/recurringChecked.svg'

const Myday = () => {
    const [uid, setUid] = useState();
    const [displayMydayTask, setDisplayMydayTask] = useState([]);
    const [count, setCount] = useState(1);

    useEffect(() => {
        countFive();
    }, [])

    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            setUid(firebase.auth().currentUser.uid);
        }
    }, [uid]);

    useEffect(() => {
        var link = "http://localhost:3000/showmyday/";
        link = link.concat(uid);
        fetch(link)
            .then(res => res.json()
                .then(
                    (result) => {
                        setDisplayMydayTask(result.data.tasks);
                    }));
                    
    }, [count]);

    const countFive = () => {
        for (var i = 0; i <= 5; i++) {
            setCount(count + 1);
        }
    }




    const createTask = () => {
        if (document.getElementById("inputMydayTask").className === "inputBoxShow") {
            document.getElementById("inputMydayTask").className = "inputBoxHide";
        }
        else {
            document.getElementById("taskInput").value = "";
            document.getElementById("inputMydayTask").className = "inputBoxShow";
            document.getElementById("taskInput").focus();
        }

    };


    const addTask = () => {
        console.log(displayMydayTask[0].task);

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
            .then(res => res.json().then(
                setCount(count + 1)
            ));


    }

    const deleteTask = (taskid) => {
        var link = 'http://localhost:3000/deletemydaytask/';
        link = link.concat(taskid);
        fetch(link, {
            method: 'DELETE',
        }).then(
            setCount(count + 1));
    }

    const editTask = (divid) => {
        setCount(count + 1);
        document.getElementsByClassName("taskText")[divid].readOnly = false;
        document.getElementsByClassName("taskBox")[divid].style.border = "1px solid #e0d2b4";
        document.getElementsByClassName("taskText")[divid].focus();
    }

    const updateTask = (taskid, divid) => {
        document.getElementsByClassName("taskBox")[divid].style.border = "none"
        document.getElementsByClassName("taskText")[divid].disabled = true;
        var task = document.getElementsByClassName("taskText")[divid].value;
        var link = 'http://localhost:3000/editmydaytask/';
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

    const removeFocus = (divid) => {
        document.getElementsByClassName("taskBox")[divid].style.border = "none"
        document.getElementsByClassName("taskText")[divid].disabled = true;
    }

    const setRecurred = (taskid, divid) => {
        if (displayMydayTask[divid].isrecurred == false) {
            document.getElementsByClassName("recurredicon")[divid].src = recurringIconChecked;
            var task = true;
            var link = 'http://localhost:3000/setrecurred/';
            link = link.concat(taskid);
            console.log(link);
            fetch(link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task})
            });
            setCount(count + 1);

        }
        else if (displayMydayTask[divid].isrecurred == true) {
            document.getElementsByClassName("recurredicon")[divid].src = recurringIcon;
            var task = false;
            var link = 'http://localhost:3000/setrecurred/';
            link = link.concat(taskid);
            console.log(link);
            fetch(link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task})
            });
            setCount(count + 1);

        }

    }

    async function setRecurredIcon(divid) {
        await sleep(2000);
        console.log(divid);
       
        if (displayMydayTask[divid].isrecurred == true) {
            document.getElementsByClassName("recurredicon")[divid].src = await recurringIconChecked;

        }
        else if (displayMydayTask[divid].isrecurred == false) {
            document.getElementsByClassName("recurredicon")[divid].src = await recurringIcon;
        }
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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

                    displayMydayTask.map((myday, index) =>
                        <div className="taskBox">
                            <div class="taskCheckBox">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </div>

                            <input type="text" autoComplete="off" className="taskText" readOnly={true} defaultValue={myday.task} onBlur={() => removeFocus(index)}
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        updateTask(myday.id, index);
                                    }
                                }}></input>
                            <div className="taskIcons">
                                <div className="taskIcon" onClick={() => setRecurred(myday.id, index)}>
                                    <img className="recurredicon" src={recurringIcon} width="20"></img>
                                    <div>{/*setRecurredIcon(index)*/}</div>
                                </div>
                                <div className="taskIcon" onClick={() => editTask(index)}>
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