import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Challenges.css'
import deedimg1 from '../../Images/1.png';
import deedimg2 from '../../Images/2.png';
import deedimg3 from '../../Images/3.png';
import deedimg4 from '../../Images/4.png';
import deedimg5 from '../../Images/5.png';
import deedimg6 from '../../Images/6.png';
import deedimg7 from '../../Images/7.png';
import deedimg8 from '../../Images/8.png';
import deedimg9 from '../../Images/9.png';
import deedimg10 from '../../Images/10.png';
import deedimg11 from '../../Images/11.png';
import deedimg12 from '../../Images/12.png';
import deedimg13 from '../../Images/13.png';
import deedimg14 from '../../Images/14.png';
import deedimg15 from '../../Images/15.png';
import deedimg16 from '../../Images/16.png';
import deedimg17 from '../../Images/17.png';
import deedimg18 from '../../Images/18.png';
import deedimg19 from '../../Images/19.png';
import deedimg20 from '../../Images/20.png';
import deedimg21 from '../../Images/21.png';
import deedimg22 from '../../Images/22.png';
import deedimg23 from '../../Images/23.png';
import deedimg24 from '../../Images/24.png';
import deedimg25 from '../../Images/25.png';
import deedimg26 from '../../Images/26.png';
import deedimg27 from '../../Images/27.png';
import deedimg28 from '../../Images/28.png';
import deedimg29 from '../../Images/29.png';
import deedimg30 from '../../Images/30.png';
import { useHistory } from "react-router";
import userimg from '../../Images/user.png'
import { useAuth } from "../../components/Authentication/AuthContext";
import check from '../../Images/check.svg';
import circle from '../../Images/circle.svg';


const Challenges = () => {
    const [error, setError] = useState("")
    const [doneChallenge, setDoneChallenge] = useState([]);
    const [uid, setUid] = useState();
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [done, setdone] = useState([false])
    var ts;

    useEffect(() => {
        setUid(currentUser.uid);
        fetch("/challengedone/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (result) => {
                    setDoneChallenge(result.data.challenges);
                }
            )
    }, []);

    const setIsChallengeDone = (index, challenge) => {

        if (document.getElementsByClassName("checkimg")[index].alt == "check"){
            document.getElementsByClassName("checkimg")[index].src = circle;
            document.getElementsByClassName("checkimg")[index].alt = "circle";
        }else {
            document.getElementsByClassName("checkimg")[index].src = check;
            document.getElementsByClassName("checkimg")[index].alt = "check";
            //document.getElementsByTagName("ck")[index+1].className = "";
        }
        var isChallengeDone = new Boolean(true);
        fetch('/addchallengedone', {
            method: 'POST',
            body: JSON.stringify({
                uid,
                challenge,
                isChallengeDone
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <div>
            <header class="challengesHeader">
                    <Navbar collapseOnSelect expand="lg" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
                                <img src={mainIcon} alt="logo" width="50" />
                                <img src={textIcon} alt="logo" width="200" />
                            </Navbar.Brand>
                        </Container>
                        <Container className="container2">
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ms-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="../../pages/Dua">Dua</Nav.Link>
                                    <Nav.Link href="../../pages/Salah">Salah</Nav.Link>
                                    <Nav.Link href="../../pages/Sawm">Sawm</Nav.Link>
                                    <Nav.Link href="../../pages/Tracker">Tracker</Nav.Link>
                                    <Nav.Link className="active" href="#">Challenges</Nav.Link>
                                    <Nav.Link href="../../pages/Forum">Forum</Nav.Link>
                                </Nav>
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img src={userimg} width="40" height="40" class="rounded-circle" />
                                </a>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="/update-profile">Edit Profile</a>
                                    <a class="dropdown-item" onClick={handleLogout}>Log Out</a>
                                </div>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>
            <div className="trackerdiv">
                <p>JOIN THE CHALLENGE <br /> Click below and join the 30 Days, 30 Deeds Challenge</p>
            </div>
            <div className="taskdiv">
                <h2><b>30 DEEDS CHALLENGE</b></h2>
                <p>The blessed month is upon us! Ramadan is all about fasting, worship and charity and we couldn't
                    think of a better time to commit to doing good. Show love to Allah (SWT) and thank him by
                    performing a good deed everyday with our 30 Days, 30 Deeds Challenge.</p>
                <div class="Ashras">
                    <div><b>1st Ashrah</b></div>
                    <div>يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ</div>
                    <div>Oh Everliving, The Everlasting, I seek Your help through Your mercy.</div>
                </div>

                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg1} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                            <b>Day 1</b>
                        </div>
                        <div className="challengeName">
                            Have a healthy Sehr
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            {/* <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => setIsChallengeDone(1)}/> */}
                            <img className="checkimg" onClick={() => setIsChallengeDone(0, 1)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 1 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg2} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 2</b>
                        </div>
                        <div className="challengeName">
                            Learn a new dua
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(1, 2)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 2 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg3} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 3</b>
                        </div>
                        <div className="challengeName">
                        Teach one good deed to a child
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(2, 3)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 3 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg4} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 4</b>
                        </div>
                        <div className="challengeName">
                        Memorize last ayats of Surah Baqarah
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(3, 4)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 4 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg5} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 5</b>
                        </div>
                        <div className="challengeName">
                        Refrain from backbiting and gossiping
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(4, 5)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 5 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg6} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 6</b>
                        </div>
                        <div className="challengeName">
                        Give Sadqa
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(5, 6)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 6 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg7} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 7</b>
                        </div>
                        <div className="challengeName">
                        Offer 3 missed prayers
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(6, 7)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 7 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg8} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 8</b>
                        </div>
                        <div className="challengeName">
                        Give up on a grudge
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(7, 8)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 8 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg9} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 9</b>
                        </div>
                        <div className="challengeName">
                        Empathize with people in your circle
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(8, 9)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 9 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg10} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 10</b>
                        </div>
                        <div className="challengeName">
                        Feed the poor of your community
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(9, 10)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 10 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="Ashras">
                    <div><b>2nd Ashrah</b></div>
                    <div>اَسْتَغْفِرُ اللہَ رَبِّی مِنْ کُلِّ زَنْبٍ وَّ اَتُوْبُ اِلَیْہِ</div>
                    <div>I seek forgiveness from Allah for all my sins and turn to Him.</div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg11} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 11</b>
                        </div>
                        <div className="challengeName">
                        Offer extra Nafl prayers
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(10, 11)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 11 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg12} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 12</b>
                        </div>
                        <div className="challengeName">
                        Calculate your Zakat
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(11, 12)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 12 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg13} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 13</b>
                        </div>
                        <div className="challengeName">
                        Read Surah Yaseen with translation
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(12, 13)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 13 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg14} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 14</b>
                        </div>
                        <div className="challengeName">
                        Give up one bad deed
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(13, 14)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 14 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg15} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 15</b>
                        </div>
                        <div className="challengeName">
                        Visit a sick person
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(14, 15)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 15 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg16} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 16</b>
                        </div>
                        <div className="challengeName">
                        Read about the life of Prophet (PBUH)
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(15, 16)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 16 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg17} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 17</b>
                        </div>
                        <div className="challengeName">
                        Realize the struggle of needy while fasting
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(16, 17)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 17 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg18} />
                    </div>
                    <div class="deedItem">
                        <div  className="dayno">
                        <b>Day 18</b>
                        </div>
                        <div className="challengeName">
                        Contribute in making a good meal
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(17, 18)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 18 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg19} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno" >
                        <b>Day 19</b>
                        </div>
                        <div className="challengeName">
                        Tell people about the beauty of Islam
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(18, 19)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 19 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg20} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno" >
                        <b>Day 20</b>
                        </div>
                        <div className="challengeName">
                        Pray for your loved ones who passed away
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(19, 20)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 20 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="Ashras">
                    <div><b>3rd Ashrah</b></div>
                    <div>اَللَّهُمَّ أَجِرْنِي مِنَ النَّارِ</div>
                    <div>O Allah! Save me from the fire.</div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg21} />
                    </div>
                    <div class="deedItem">
                        <div  className="dayno">
                        <b>Day 21</b>
                        </div>
                        <div className="challengeName">
                        Make dua for Muslims all around the world
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(20, 21)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 21 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg22} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 22</b>
                        </div>
                        <div className="challengeName">
                        Pray Salat-ut-Tasbeeh
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(21, 22)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 22 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg23} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 23</b>
                        </div>
                        <div className="challengeName">
                        Recite Durood-e-Ibrahim
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(22, 23)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 23 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg24} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 24</b>
                        </div>
                        <div className="challengeName">
                        Get a thoughtful gift for your loved ones
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(23, 24)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 24 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg25} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 25</b>
                        </div>
                        <div className="challengeName">
                        Learn a new Hadith and act upon it
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(24, 25)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 25 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg26} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 26</b>
                        </div>
                        <div className="challengeName">
                        Spend the night in Prayers
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(25, 26)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 26 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg27} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 27</b>
                        </div>
                        <div className="challengeName">
                        Revise memorized Surahs
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(26, 27)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 27 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg28} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 28</b>
                        </div>
                        <div className="challengeName">
                        Practice modesty
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(27, 28)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 28 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg29} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 29</b>
                        </div>
                        <div className="challengeName">
                        Spend less on things and give more
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(28, 29)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 29 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg30} />
                    </div>
                    <div class="deedItem">
                        <div className="dayno">
                        <b>Day 30</b>
                        </div>
                        <div className="challengeName">
                        Give Sadaqa-al-Fitr and get ready for Eid!
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <img className="checkimg" onClick={() => setIsChallengeDone(29, 30)} src={ts = false, doneChallenge.map(mp => (mp.challenge == 30 && mp.ischallengedone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challenges;