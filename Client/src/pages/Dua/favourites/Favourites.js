import React, { useEffect, useState } from 'react';
import emotionIcon from '../../../Images/emotionInactive.svg'
import favIcon from '../../../Images/favActive.svg'
import likedIcon from '../../../Images/liked.svg'
import './Favourites.css'
import { useAuth } from "../../../components/Authentication/AuthContext";

const Favourites = () => {
    const [uid, setUid] = useState()
    const { currentUser } = useAuth();
    const [displayfavourite, setDisplayfarourite] = useState([]);
    var ts = false;

    useEffect(() => {
        fetch("http://127.0.0.1:3000/getfavdua/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (results) => {
                    setDisplayfarourite(results.data.dua);
                }
            );
        setUid(currentUser.uid);
    }, []);

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
            fetch('http://localhost:3000/updatefavdua', {
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
            fetch('http://localhost:3000/updatefavdua', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fc, duaID })
            });
        }
    };

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
                            <img src={favIcon} width="25"></img>
                        </div>
                        <div className="menuText">Favourites</div>
                    </a>
                </div>
            </div>
            <div class="rightDiv">
                <div >
                    {
                        displayfavourite.map((dua, index) =>
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

export default Favourites;