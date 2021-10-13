import React, { useContext, useEffect, useState } from 'react';
import emotionIcon from '../../../Images/emotionActive.svg'
import recomIcon from '../../../Images/recomInactive.svg'
import favIcon from '../../../Images/favInactive.svg'
import likedIcon from '../../../Images/liked.svg'
import './Emotion.css'
import { Dropdown } from 'react-bootstrap';


const Emotion = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayDuaInfos, setItems] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:3000/duas")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data.duas);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    return (
        <div>
            <div class="sideMenuDua">

                <div class="menuItem">
                    <a className="menuItem activeNav" href="#">
                        <div className="menuIcon" >
                            <img src={emotionIcon} width="20"></img>
                        </div>
                        Emotions
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Dua/recommendation">
                        <div className="menuIcon">
                            <img src={recomIcon} width="20"></img>
                        </div>
                        Recommendations
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Dua/favourites">
                        <div className="menuIcon">
                            <img src={favIcon} width="20"></img>
                        </div>
                        Favourites
                    </a>
                </div>

            </div>

            <div className="rightDiv">
                <div className="searchButtonDiv" >
                    <Dropdown>
                        <Dropdown.Toggle className="searchButton" id="dropdown-basic">
                            Find out your relief here
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    {
                        displayDuaInfos.map(dua => <div className="emotionBox">
                            <h1>{dua.title}</h1>
                            <h2>{dua.arabic}</h2>
                            <h2>{dua.pronunciation}</h2>
                            <h2>{dua.translation}</h2>
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