import React, { Fragment, useEffect, useState } from 'react';
import mydayIcon from '../../../Images/mydayInactive.svg'
import planIcon from '../../../Images/planInactive.svg'
import listIcon from '../../../Images/listActive.svg'
import addIcon from '../../../Images/addIcon.svg'
import leftArrow from '../../../Images/leftArrow.svg'
import downArrow from '../../../Images/downArrow.svg'
import firebase from 'firebase/compat';
import newIcon from '../../../Images/newIcon.svg'
import editIcon from '../../../Images/editIcon.svg'
import deleteIcon from '../../../Images/deleteIcon.svg'
import check from '../../../Images/check.svg'
import circle from '../../../Images/circle.svg'
import myday from '../../../Images/mydayActive.svg'
import { useAuth } from '../../../components/Authentication/AuthContext';
import { useHistory } from "react-router-dom";
import { Button } from 'react-bootstrap';

const Myday = () => {
    const [uid, setUid] = useState();
    const [modal, setModal] = useState(false);
    const [showList, setShowList] = useState(false);
    const [displayTaskList, setDisplayTaskList] = useState([]);
    const [count, setCount] = useState(1);
    const [displayListContent, setDisplayListContent] = useState([]);
    const {setListID, selectedlistID} = useAuth();
    const history = useHistory();

    useEffect(() => {
        countFive();
    }, [])

    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            setUid(firebase.auth().currentUser.uid);
        }
    }, [uid]);

    useEffect(() => {
        var link = "/showtasklist/";
        link = link.concat(uid);
        fetch(link)
            .then(res => res.json()
                .then(
                    (result) => {
                        setDisplayTaskList(result.data.tasks);
                    }));
        link = "/showlistcontent/";
        var id = selectedlistID;
        link = link.concat(id);
        fetch(link)
            .then(res => res.json()
                .then(
                    (result) => {
                        setDisplayListContent(result.data.tasks);
                    }));

    }, [count]);

    const countFive = () => {
        for (var i = 0; i <= 5; i++) {
            setCount(count + 1);
        }
    }

    const addTask = () => {
        document.getElementById("inputMydayTask").className = "inputBoxHide";
        var task = document.getElementById("taskInput").value;
        var listID = selectedlistID;
        var isCompleted = false;
        fetch('/addtasktolist', {
            method: 'POST',
            body: JSON.stringify({ listID, task, isCompleted }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json().then(
                setCount(count + 1)
            ));


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
        fetch('/createnewlist', {
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

    const setisCompleted = (taskid, divid) => {

        if (displayListContent[divid].iscompleted == false) {
            document.getElementsByClassName("taskText")[divid].style.setProperty("text-decoration", "line-through");
            document.getElementsByClassName("taskText")[divid].style.setProperty("color", "#e0d2b459");
            document.getElementsByClassName("check-input")[divid].src = check;
            var task = true;
            var link = '/setcompletedcontent/';
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
        else {
            document.getElementsByClassName("taskText")[divid].style.setProperty("text-decoration", "none");
            document.getElementsByClassName("taskText")[divid].style.setProperty("color", "#e0d2b4");
            document.getElementsByClassName("check-input")[divid].src = circle;
            var task = false;
            var link = '/setcompletedcontent/';
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
    }

    const addToMyday = (taskid, divid) => {
        var task = document.getElementsByClassName("taskText")[divid].innerHTML;
        fetch('/addmydayfromlist', {
            method: 'POST',
            body: JSON.stringify({ uid, task }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json().then(
                setCount(count + 1)
            ));
        var link = '/deletelistcontent/';
        link = link.concat(taskid);
        fetch(link, {
            method: 'DELETE',
        }).then(
            setCount(count + 1));

    }
    const deleteTask = (taskid) => {
        var link = '/deletelistcontent/';
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
        var link = '/editlistcontent/';
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

    const deleteTaskList = () => {
        var link = '/deletelistcontentagainstlist/';
        link = link.concat(selectedlistID);
        fetch(link, {
            method: 'DELETE',
        })
        link = '/deletelist/';
        link = link.concat(selectedlistID);
        fetch(link, {
            method: 'DELETE',
        }).then(
            setCount(count + 1));
        history.push('/pages/Tracker/myday')
    }

    async function passListID(ID) {
        await setListID(ID);
        setCount(count + 1);
        
    }

    const removeFocus = (divid) => {
        document.getElementsByClassName("taskBox")[divid].style.border = "none"
        document.getElementsByClassName("taskText")[divid].contentEditable = false;
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
                    <a className="menuItem" href="../../pages/Tracker/planned">
                        <div className="menuIcon">
                            <img src={planIcon} width="25"></img>
                        </div>
                        <div className="menuText">Planned</div>
                    </a>
                </div>
                <div class="menuItem activeNav" >
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
                        <a onClick={() => passListID(list.id)} className={showList ? "anlistItemShow" : "anlistItemHide"}>
                            <div className={list.id == selectedlistID ? "listItemActive" : "listItem"}>
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
                
                <div className="listDeleteIcon" >
                    <button id="deletelistbtn" onClick={deleteTaskList}>Delete List</button>
                </div>
                {
                    displayListContent.map((content, index) =>
                        <div className="taskBox">
                            <div class="taskCheckBox">
                                <img className="check-input" width="20" onClick={() => setisCompleted(content.id, index)} src ={content.iscompleted? check:circle}/>
                            </div>
                            <h2 className="taskText"  contentEditable={false} onBlur={() => removeFocus(index)} onKeyPress={event => {
                                    if (event.key === "Enter") {
                                        updateTask(content.id, index);
                                    }
                                }} id={content.iscompleted ? "taskTextCompleteID" : "taskTextID"}>{content.task}</h2>
                            <div className="taskIcons">
                                    <div className="taskIcon">
                                        <img className="addtomydayicon" src={myday} alt="" width="20"  onClick={() => addToMyday(content.id, index)}/>
                                    </div>
                                    <div className="taskIcon">
                                        <img src={editIcon} width="20" onClick={() => editTask(index)}></img>
                                    </div>
                                    <div className="taskIcon" onClick={() => deleteTask(content.id)}>
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