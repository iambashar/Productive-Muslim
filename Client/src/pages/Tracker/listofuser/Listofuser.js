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


const Myday = () => {
    const [uid, setUid] = useState();
    const [modal, setModal] = useState(false);
    const [showList, setShowList] = useState(false);
    const [displayTaskList, setDisplayTaskList] = useState([]);
    const [count, setCount] = useState(1);
    const { selectedlistID } = useAuth();
    const [displayListContent, setDisplayListContent] = useState([]);

    useEffect(() => {
        countFive();
    }, [])

    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            setUid(firebase.auth().currentUser.uid);
        }
    }, [uid]);

    useEffect(() => {
        var link = "http://localhost:3000/showtasklist/";
        link = link.concat(uid);
        fetch(link)
            .then(res => res.json()
                .then(
                    (result) => {
                        setDisplayTaskList(result.data.tasks);
                    }));
        console.log(selectedlistID);
        link = "http://localhost:3000/showlistcontent/";
        link = link.concat(selectedlistID);
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
        fetch('http://localhost:3000/addtasktolist', {
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
            var link = 'http://localhost:3000/setcompletedcontent/';
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
            var link = 'http://localhost:3000/setcompletedcontent/';
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
                        <a href="#" className={showList ? "anlistItemShow" : "anlistItemHide"}>
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
                <div className="listDeleteIcon" >
                    <img src={deleteIcon} width="25"></img>
                </div>
                {
                    displayListContent.map((content, index) =>
                        <div className="taskBox">
                            <div class="taskCheckBox">
                                <img className="check-input" width="20" onClick={() => setisCompleted(content.id, index)} src ={content.iscompleted? check:circle}/>
                            </div>
                            <h2 className="taskText">{content.task}</h2>
                            <div className="taskIcons">
                                    <div className="taskIcon">
                                        <img className="addtomydayicon" src={myday} alt="" width="20" />
                                    </div>
                                    <div className="taskIcon">
                                        <img src={editIcon} width="20"></img>
                                    </div>
                                    <div className="taskIcon">
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