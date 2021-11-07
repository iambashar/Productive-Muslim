import React, { useEffect, useState } from 'react';
import emotionIcon from '../../../Images/emotionActive.svg'
import favIcon from '../../../Images/favInactive.svg'
import './Emotion.css'
import { Dropdown } from 'react-bootstrap';
import { useAuth } from "../../../components/Authentication/AuthContext";

const Emotion = () => {
    const [displayDuaInfos, setDisplayDuaInfos] = useState([]);
    const [displayOptions, setDisplayOptions] = useState([]);
    const [displayfavourite, setDisplayfarourite] = useState([]);
    const [uid, setUid] = useState()
    const { currentUser } = useAuth();
    var ts = false;

    useEffect(() => {
        fetch("http://127.0.0.1:3000/duas")
            .then(res => res.json())
            .then(
                (result) => {
                    setDisplayDuaInfos(shuffle(result.data.duas));
                    return fetch("http://127.0.0.1:3000/emotions").then(
                        console.log(result.data.duas));
                })
            .then(res => res.json())
            .then(
                (result) => {
                    setDisplayOptions(result.data.emotions);
                });
        fetch("http://127.0.0.1:3000/getfavduacount/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (results) => {
                    setDisplayfarourite(results.data.favouritecount);
                }
            );
        setUid(currentUser.uid);
    }, []);


    const showSearchedDua = async (selectedEmotion) => {
        var link = "http://127.0.0.1:3000/emotiondua/";
        link = link.concat(selectedEmotion.target.outerText).toLowerCase();
        document.getElementById("dropdown-basic").innerHTML = selectedEmotion.target.outerText;
        await fetch(link)
            .then(res => res.json())
            .then(
                (result) => {
                    setDisplayDuaInfos(result.data.duas);
                }
            )
    };

    function toggleUpVote(duaID, index, fc) {
        if (document.getElementsByTagName("i")[index].className == "far fa-thumbs-up fa-2x") {
            document.getElementsByTagName("i")[index].className = "fas fa-thumbs-up fa-2x";
            document.getElementsByTagName("i")[index].innerHTML = (parseInt(document.getElementsByTagName("i")[index].innerHTML) + 1);
            fetch('http://127.0.0.1:3000/addfavdua', {
                method: 'POST',
                body: JSON.stringify({ duaID, uid }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            fc++;
            fetch('/updatefavdua', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fc, duaID })
            });
        }
        else {
            console.log(fc)
            document.getElementsByTagName("i")[index].innerHTML = (parseInt(document.getElementsByTagName("i")[index].innerHTML) - 1);
            document.getElementsByTagName("i")[index].className = "far fa-thumbs-up fa-2x";
            fetch('http://127.0.0.1:3000/deletefavdua', {
                method: 'DELETE',
                body: JSON.stringify({ duaID, uid }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            fc--;
            fetch('/updatefavdua', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fc, duaID })
            });
        }
    };

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    return (
        <div>
            <div class="sideMenuDua">
                <div class="menuItem">
                    <a className="menuItem activeNav" href="#">
                        <div className="menuIcon" >
                            <img src={emotionIcon} width="25"></img>
                        </div>
                        <div className="menuText">Emotions</div>
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Dua/favourites">
                        <div className="menuIcon">
                            <img src={favIcon} width="25"></img>
                        </div>
                        <div className="menuText">Favourites</div>
                    </a>
                </div>

            </div>

            <div className="rightDiv">
                <div className="searchButtonDiv" >
                    <Dropdown>
                        <Dropdown.Toggle className="searchButton" variant="success" id="dropdown-basic">
                            Find out your relief here
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="searchMenu" >
                            {
                                displayOptions.map(emotion =>
                                    <Dropdown.Item onClick={showSearchedDua} id="searchItem">{emotion.emotion}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="duaContainer">
                    {
                        displayDuaInfos.map((dua, index) =>
                            <div className="emotionBox">
                                <h1>{dua.title}</h1>
                                <h2 className="arabic">{dua.arabic}</h2>
                                <h2 className="arabic">{dua.pronunciation}</h2>
                                <h2 className="english">{dua.translation}</h2>
                                <div className="likes">
                                    <div className="menuIcon">
                                        <i id="upVotebtn" className={ts = false, displayfavourite.map(mp => mp.duaid == dua.duaid ? ts = true : ts = ts), ts ? "fas fa-thumbs-up fa-2x" : "far fa-thumbs-up fa-2x"}
                                            onClick={() => toggleUpVote(dua.duaid, index, dua.favouritecount)}>{dua.favouritecount}</i>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Emotion;