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
import leftArrow from '../../../Images/leftArrow.svg'
import downArrow from '../../../Images/downArrow.svg'
import check from '../../../Images/check.svg'
import circle from '../../../Images/circle.svg'


const Myday = () => {
    const [uid, setUid] = useState();
    const [displayMydayTask, setDisplayMydayTask] = useState([]);
    const [count, setCount] = useState(1);
    const [modal, setModal] = useState(false);
    const [showList, setShowList] = useState(false);
    const [displayTaskList, setDisplayTaskList] = useState([]);

    useEffect(() => {
        countFive();
    }, [])

    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            setUid(firebase.auth().currentUser.uid);
        }
    }, [uid]);

    useEffect(() => {
        var task = false;
        var link2 = "http://localhost:3000/setrecurredcompleted";
        fetch(link2, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        }).then(console.log("update"));
        var link = "http://localhost:3000/showmyday/";
        link = link.concat(uid);
        console.log(uid);
        fetch(link)
            .then(res => res.json()
                .then(
                    (result) => {
                        setDisplayMydayTask(result.data.tasks);
                    }));
        var link3 = 'http://localhost:3000/deletenotrecurredtask';
        fetch(link3, {
            method: 'DELETE',
        });
        link = "http://localhost:3000/showtasklist/";
        link = link.concat(uid);
        fetch(link)
            .then(res => res.json()
                .then(
                    (result) => {
                        setDisplayTaskList(result.data.tasks);
                        console.log(displayTaskList);
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
        document.getElementById("inputMydayTask").className = "inputBoxHide";
        var task = document.getElementById("taskInput").value;
        var isRecurred = false;
        var isCompleted = false;
        fetch('http://localhost:3000/addmyday', {
            method: 'POST',
            body: JSON.stringify({ uid, task, isRecurred, isCompleted }),
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
        document.getElementsByClassName("taskBox")[divid].style.border = "1px solid #e0d2b4";
        document.getElementsByClassName("taskText")[divid].contentEditable = true;
        document.getElementsByClassName("taskText")[divid].focus();
        var range = document.createRange()
        var sel = window.getSelection()
        range.setStart(document.getElementsByClassName("taskText")[divid], 1)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)

    }

    const updateTask = (taskid, divid) => {
        document.getElementsByClassName("taskBox")[divid].style.border = "none"
        document.getElementsByClassName("taskText")[divid].contentEditable = false;
        var task = document.getElementsByClassName("taskText")[divid].innerHTML;
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
        document.getElementsByClassName("taskText")[divid].contentEditable = false;
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
                body: JSON.stringify({ task })
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
                body: JSON.stringify({ task })
            });
            setCount(count + 1);

        }

    }

    const setisCompleted = (taskid, divid) => {

        if (displayMydayTask[divid].iscompleted == false) {
            document.getElementsByClassName("taskText")[divid].style.setProperty("text-decoration", "line-through");
            document.getElementsByClassName("taskText")[divid].style.setProperty("color", "#e0d2b459");
            document.getElementsByClassName("check-input")[divid].src= check;
            var task = true;
            var link = 'http://localhost:3000/setcompleted/';
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
        else{
            document.getElementsByClassName("taskText")[divid].style.setProperty("text-decoration", "none");
            document.getElementsByClassName("taskText")[divid].style.setProperty("color", "#e0d2b4");
            document.getElementsByClassName("check-input")[divid].src= circle;
            var task = false;
            var link = 'http://localhost:3000/setcompleted/';
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

    const togglePopUp = () => {
        if (modal) {
            setModal(false);
            document.getElementsByClassName("newListInput")[0].value = "";
        }
        else {
            setModal(true);
        }

    }

    const toggleShowList = () => {
        if (showList) {
            setShowList(false);
        }
        else {
            setShowList(true);
        }
    }

    const createNewTaskList = () => {
        var listname = document.getElementsByClassName("newListInput")[0].value;
        fetch('http://localhost:3000/createnewlist', {
            method: 'POST',
            body: JSON.stringify({ uid, listname }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json().then(
                setCount(count + 1)
            ));
        togglePopUp();
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
                <div class="menuItem" >    
                        <div className="menuIcon listNav" >
                            <img src={listIcon} width="25"></img>
                        </div>
                        <div className="menuText" onClick={toggleShowList}>Lists</div>   
                        <div className="menuIcon listNav" onClick={toggleShowList}>
                            <img src={showList ? downArrow : leftArrow} width="20"></img>
                        </div>   
                </div>
                {
                    displayTaskList.map((list, index) =>
                    <a href="../../pages/Tracker/listofuser" className={showList ? "anlistItemShow" : "anlistItemHide"}>
                        <div class="listItem">
                            <div>{list.listname}</div>
                        </div>
                        </a>
                    )
                }
                <div class="menuItem addBtn" onClick={togglePopUp}>
                    <div className="menuIcon">
                        <img src={addIcon} width="25"></img>
                    </div>
                    <div className="menuText">Add</div>

                </div>


            </div>
            <div className="rightDiv">
                <div className={modal ? "popUpShow" : "popUpHide"} id="popUp">
                    <p className="popUpTitle">New List</p>
                    <input type="text" className="newListInput" placeholder="Name of the list" />
                    <button id="cancelbtn" className="popUpbtn" onClick={togglePopUp}>Cancel</button>
                    <button id="createbtn" className="popUpbtn" onClick={createNewTaskList}>Create</button>
                </div>

                {

                    displayMydayTask.map((myday, index) =>
                        <div className="taskBox">
                            <div class="taskCheckBox">
                                <img className="check-input" onClick={() => setisCompleted(myday.id, index)} src ={myday.iscompleted? check:circle} width="20"/>
                                {/* <FontAwesomeIcon className="check-input" onClick={() => setisCompleted(myday.id, index)} icon={myday.iscompleted? faCheckCircle:faCircle}/> */}
                                {/* <i className="check-input" onClick={() => setisCompleted(myday.id, index)}>{myday.iscompleted? check:circle}</i> */}
                                {/* <input className="form-check-input" type="checkbox" value="" onClick={() => setisCompleted(myday.id, index)} checked={myday.iscompleted ? true : false} /> */}
                            </div>
                            <h2 className="taskText" contentEditable={false} onBlur={() => removeFocus(index)}
                                onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        updateTask(myday.id, index);
                                    }
                                }} id={myday.iscompleted ? "taskTextCompleteID" : "taskTextID"}>{myday.task}</h2>

                            <div className="taskIcons">
                                <div className="taskIcon" onClick={() => setRecurred(myday.id, index)}>
                                    <img className="recurredicon" src={myday.isrecurred ? recurringIconChecked : recurringIcon} alt="" width="20" />
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