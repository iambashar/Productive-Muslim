import React, { Fragment, useEffect, useState } from 'react';
import mydayIcon from '../../../Images/mydayInactive.svg'
import planIcon from '../../../Images/planInactive.svg'
import listIcon from '../../../Images/listActive.svg'
import addIcon from '../../../Images/addIcon.svg'
import leftArrow from '../../../Images/leftArrow.svg'
import downArrow from '../../../Images/downArrow.svg'
import firebase from 'firebase/compat';

const Myday = () => {
    const [uid, setUid] = useState();
    const [modal, setModal] = useState(false);
    const [showList, setShowList] = useState(false);
    const [displayTaskList, setDisplayTaskList] = useState([]);
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
        var link = "http://localhost:3000/showtasklist/";
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