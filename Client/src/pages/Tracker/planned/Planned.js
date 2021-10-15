import React from 'react';
import mydayIcon from '../../../Images/mydayInactive.svg'
import planIcon from '../../../Images/planActive.svg'
import listIcon from '../../../Images/listInactive.svg'

const Myday = () => {
    return (
        <div>
            <div class="sideMenuDua">

                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Tracker/myday">
                        <div className="menuIcon" >
                            <img  src={mydayIcon} width="25"></img>
                        </div>
                        <div className="menuText">My Day</div>
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem activeNav" href="#">
                        <div className="menuIcon">
                            <img  src={planIcon} width="25"></img>
                        </div>
                        <div className="menuText">Planned</div>
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Tracker/listofuser">
                        <div className="menuIcon">
                            <img src={listIcon} width="25"></img>
                        </div>
                        <div className="menuText">Lists</div>
                    </a>
                </div>
               

            </div>
        </div>
    );
};

export default Myday;