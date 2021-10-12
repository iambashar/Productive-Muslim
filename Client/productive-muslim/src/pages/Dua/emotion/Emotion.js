import React, { useEffect, useState } from 'react';
import emotionIcon from '../../../Images/emotionActive.svg'
import recomIcon from '../../../Images/recomInactive.svg'
import favIcon from '../../../Images/favInactive.svg'
import './Emotion.css'
import { Dropdown, Stack } from 'react-bootstrap';
import duas from '../../../apis/duas'


const Emotion = () => {
    useEffect(() => {
            const resp = duas.get(``);
            console.log(resp);
        
    })


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

            <div class="rightDiv">
                <Dropdown>
                    <Dropdown.Toggle className="searchButton" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div>
                    {
                        
                        <Stack gap={2} className="col-md-2 mx-auto emotionBox">
                            <h1>resp.title</h1>
                            <h2>dua.arabic</h2>
                            <h2>dua.pronunciation</h2>
                            <h2>dua.translation</h2>
                            <div>
                                <div className="menuIcon">
                                    <img src={emotionIcon} width="20"></img>
                                </div>
                                <p>dua.favouritecount</p>
                            </div>
                        </Stack>
                    }
                </div>
            </div>
        </div>
    );
};

export default Emotion;