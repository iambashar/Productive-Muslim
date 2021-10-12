import React from 'react';
import emotionIcon from '../../../Images/emotionInactive.svg'
import recomIcon from '../../../Images/recomInactive.svg'
import favIcon from '../../../Images/favActive.svg'

const Favourites = () => {
    return (
        <div class="sideMenuDua">
            <div class="menuItem">
                <a className="menuItem" href="../../../pages/Dua">
                    <div className="menuIcon" >
                        <img src={emotionIcon} width="20"></img>
                    </div>
                    Emotions
                </a>
            </div>
            <div class="menuItem">
                <a className="menuItem" href="../../../pages/Dua/recommendation">
                    <div className="menuIcon">
                        <img src={recomIcon} width="20"></img>
                    </div>
                    Recommendations
                </a>
            </div>
            <div class="menuItem">
                <a className="menuItem activeNav" href="#">
                    <div className="menuIcon">
                        <img src={favIcon} width="20"></img>
                    </div>
                    Favourites
                </a>
            </div>

        </div>
    );
};

export default Favourites;