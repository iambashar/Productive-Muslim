import React from 'react';
import emotionIcon from '../../../Images/emotionInactive.svg'
import recomIcon from '../../../Images/recomActive.svg'
import favIcon from '../../../Images/favInactive.svg'
import likedIcon from '../../../Images/liked.svg'
import './Recommendation.css'

const Recommendation = () => {
    return (
        <div>
        <div class="sideMenuDua">
            <div class="menuItem">
                <a className="menuItem" href="../../../pages/Dua/emotion">
                    <div className="menuIcon" >
                        <img src={emotionIcon} width="25"></img>
                    </div>
                    <div className="menuText">Emotions</div>
                </a>
            </div>
            <div class="menuItem">
                <a className="menuItem activeNav" href="#">
                    <div className="menuIcon">
                        <img src={recomIcon} width="25"></img>
                    </div>
                    <div className="menuText">Recommendations</div>
                </a>
            </div>
            <div class="menuItem">
                <a className="menuItem" href="../../../pages/Dua/favourites">
                    <div className="menuIcon">
                        <img src={favIcon} width="25"></img>
                    </div>
                    <div className="menuText">Favourites</div>
                </a>
            </div>
        </div>
        <div class="rightDiv">
                <div className="emotionBox">
                    <h1>Resp.title</h1>
                    <h2 className="arabic">dua.arabic</h2>
                    <h2 className="arabic">dua.pronunciation</h2>
                    <h2 className="english">dua.translation</h2>
                    <div className="likes">
                        <div className="menuIcon">
                            <img src={likedIcon} width="20"></img>
                        </div>
                        1200
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recommendation;