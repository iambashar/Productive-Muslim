import React, { useContext, useEffect, useState } from 'react';
import emotionIcon from '../../../Images/emotionActive.svg'
import recomIcon from '../../../Images/recomInactive.svg'
import favIcon from '../../../Images/favInactive.svg'
import likedIcon from '../../../Images/liked.svg'
import './Emotion.css'
import { Dropdown } from 'react-bootstrap';


const Emotion = () => {
    const [displayDuaInfos, setDisplayDuaInfos] = useState([]);
    const [displayOptions, setDisplayOptions] = useState([]);

    const showRandomDua = async () => {
        await fetch("http://127.0.0.1:3000/duas")
            .then(res => res.json())
            .then(
                (result) => {
                    setDisplayDuaInfos(result.data.duas);
                }
            )
            await fetch("http://127.0.0.1:3000/emotions")
            .then(res => res.json())
            .then(
                (result) => {
                    setDisplayOptions(result.data.emotions);
                    console.log(result);
                }
            )
    };

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

    return (
        <div onLoad={showRandomDua}>
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
                    <a className="menuItem" href="../../pages/Dua/recommendation">
                        <div className="menuIcon">
                            <img src={recomIcon} width="25"></img>
                        </div>
                        <div className="menuText">Recommendations</div>
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
                <div >
                    {
                        displayDuaInfos.map(dua => <div className="emotionBox">
                            <h1>{dua.title}</h1>
                            <h2 className="arabic">{dua.arabic}</h2>
                            <h2 className="arabic">{dua.pronunciation}</h2>
                            <h2 className="english">{dua.translation}</h2>
                            <div className="likes">
                                <div className="menuIcon">
                                    <img src={likedIcon} width="20"></img>
                                </div>
                                1200
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