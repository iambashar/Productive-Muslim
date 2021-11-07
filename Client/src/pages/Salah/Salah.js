import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Salah.css'
import userimg from '../../Images/user.png';
import { useHistory } from "react-router";
import { useAuth } from "../../components/Authentication/AuthContext";
import moment from 'moment';
import Countdown from "react-countdown";
import check from '../../Images/check.svg'
import circle from '../../Images/circle.svg'

const Salah = () => {

    const [displaySalahTime, setdisplaySalahTime] = useState([]);
    const [uid, setUid] = useState();
    //const [displaySalahLocation, setdisplaySalahLocation] = useState([]);
    //const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"}));
    const [date, setDate] = useState(new Date());
    const dummy = { date };
    const [donesalah, setdonesalah] = useState([]);
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [done, setdone] = useState([false])
    var ts;
    //console.log(Date.parse('01/01/2011 '+dummy.toString().substr(16,5)));
    //const date = new Date();
    const onChange = date => {
        setDate(date);
        //handleShow();
    }

    useEffect(() => {
        // if does not work then turn off your browser ad blocker :)
        fetch("https://api.db-ip.com/v2/free/self")
            .then(res => res.json())
            .then(
                (result) => {
                    const link = "https://api.pray.zone/v2/times/today.json?ip=".concat(result.ipAddress);
                    return fetch(link)
                }
            ).then(res => res.json())
            .then(
                (result) => {
                    setdisplaySalahTime(result.results.datetime);
                    //setdisplaySalahLocation(result.results.location);
                });
        setUid(currentUser.uid);
        fetch("/waqtdone/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (result) => {
                    setdonesalah(result.data.waqts);
                }
            )
    }, []);

    const setisDone = (index, waqt) => {

        if (document.getElementsByClassName("checkimg")[index].alt == "check"){
            document.getElementsByClassName("checkimg")[index].src = circle;
            document.getElementsByClassName("checkimg")[index].alt = "circle";
        }else {
            document.getElementsByClassName("checkimg")[index].src = check;
            document.getElementsByClassName("checkimg")[index].alt = "check";
            document.getElementsByTagName("tr")[index+1].className = "";
        }


        var isDone = new Boolean(true);

        fetch('/addwaqtdone', {
            method: 'POST',
            body: JSON.stringify({
                uid,
                waqt,
                isDone
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }
    
    function convert12hrFormat(time24){
        const timeString = time24 + ':00';
        // e_e
        const timeString12hr = new Date('1999-01-03T' + timeString + 'Z').toLocaleTimeString('en-US',{timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
        );
        return timeString12hr;
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
        <div >
            <header class="salahHeader">
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
                                <Nav.Link className="active" href="#">Salah</Nav.Link>
                                <Nav.Link href="../../pages/Sawm">Sawm</Nav.Link>
                                <Nav.Link href="../../pages/Tracker">Tracker</Nav.Link>
                                <Nav.Link href="../../pages/Challenges">Challenges</Nav.Link>
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
            <div className="salahdiv">
                <div className="salahtable">
                    <table className="table" onChange={onChange} >
                        <thead>
                            <tr>
                                {/* <th scope="col">Favourite</th> */}
                                <th scope="col">Salah</th>
                                <th scope="col">Time</th>
                                <th scope="col">Done</th>
                                <th scope="col">Time Remaining</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displaySalahTime.map((Salah, index) =>
                                    <tr className={
                                        ((Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) < Date.parse('01/01/2011 ' + Salah.times.Imsak))) ?
                                            //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))
                                            "highlightNextWaqt" : ""
                                        //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))

                                    }>
                                        {/* <td>
                                        <div class="form-check d-flex justify-content-center">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </div>
                                    </td> */}
                                        <td>Tahajjud, Sehri ends</td>
                                        <td>{convert12hrFormat(Salah.times.Imsak)}</td>
                                        <td>
                                            <div >
                                                <img className="checkimg" onClick={() => setisDone(0, "Tahajjud")} src={ts = false, donesalah.map(mp => (mp.waqt == "Tahajjud" && mp.isdone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} alt={ts? "check":"circle"} width="20" />
                                            </div>
                                        </td>
                                        <td><Countdown daysInHours='true' date={Date.now() + (Date.parse(moment(new Date()).format("MM/DD/YYYY").toString() + ' ' + Salah.times.Imsak) - Date.now())} /></td>
                                    </tr>
                                )}
                            {
                                displaySalahTime.map((Salah, index) =>
                                    <tr className={
                                        ((Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) >= Date.parse('01/01/2011 ' + Salah.times.Fajr)) && (Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) < Date.parse('01/01/2011 ' + Salah.times.Sunrise))) ?
                                            //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))
                                            "highlightNextWaqt" : ""
                                        //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))

                                    }>
                                        {/* <td>
                                        <div class="form-check d-flex justify-content-center">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </div>
                                    </td> */}
                                        <td><b>Fajr</b></td>
                                        <td>{convert12hrFormat(Salah.times.Fajr)}</td>
                                        <td>
                                            <div>
                                                <img className="checkimg" onClick={() => setisDone(1, "Fajr")} src={ts = false, donesalah.map(mp => (mp.waqt == "Fajr" && mp.isdone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                                            </div>
                                        </td>
                                        <td><Countdown daysInHours='true' date={Date.now() + (Date.parse(moment(new Date()).format("MM/DD/YYYY").toString() + ' ' + Salah.times.Fajr) - Date.now())} /></td>
                                    </tr>
                                )}
                            {
                                displaySalahTime.map((Salah, index) =>
                                    <tr className={
                                        ((Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) >= Date.parse('01/01/2011 ' + Salah.times.Sunrise)) && (Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) < Date.parse('01/01/2011 ' + Salah.times.Dhuhr))) ?
                                            //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))
                                            "highlightNextWaqt" : ""
                                        //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))

                                    }>
                                        {/* <td>
                                        <div class="form-check d-flex justify-content-center">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </div>
                                    </td> */}
                                        <td>Sunrise, Salat al-Ishraq, Chasht</td>
                                        <td>{convert12hrFormat(Salah.times.Sunrise)}</td>
                                        <td>
                                            <div>
                                                <img className="checkimg" onClick={() => setisDone(2, "Ishraq")} src={ts = false, donesalah.map(mp => (mp.waqt == "Ishraq" && mp.isdone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                                            </div>
                                        </td>
                                        <td><Countdown daysInHours='true' date={Date.now() + (Date.parse(moment(new Date()).format("MM/DD/YYYY").toString() + ' ' + Salah.times.Sunrise) - Date.now())} /></td>
                                    </tr>
                                )}
                            {
                                displaySalahTime.map((Salah, index) =>
                                    <tr className={
                                        ((Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) >= Date.parse('01/01/2011 ' + Salah.times.Dhuhr)) && (Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) < Date.parse('01/01/2011 ' + Salah.times.Asr))) ?
                                            //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))
                                            "highlightNextWaqt" : ""
                                        //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))

                                    }>
                                        {/* <td>
                                            <div class="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td> */}
                                        <td><b>Dhuhr</b></td>
                                        <td>{convert12hrFormat(Salah.times.Dhuhr)}</td>
                                        {/* <td>{(Date.parse('01/01/2011 '+dummy.toString().substr(16,5)) < Date.parse('01/01/2011 '+Salah.times.Dhuhr)).toString()}</td> */}
                                        <td>
                                            <div>
                                                <img className="checkimg" onClick={() => setisDone(3, "Dhuhr")} src={ts = false, donesalah.map(mp => (mp.waqt == "Dhuhr" && mp.isdone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                                            </div>
                                        </td>
                                        <td><Countdown daysInHours='true' date={Date.now() + (Date.parse(moment(new Date()).format("MM/DD/YYYY").toString() + ' ' + Salah.times.Dhuhr) - Date.now())} /></td>
                                    </tr>
                                )}
                            {
                                displaySalahTime.map((Salah, index) =>
                                    <tr className={
                                        ((Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) >= Date.parse('01/01/2011 ' + Salah.times.Asr)) && (Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) < Date.parse('01/01/2011 ' + Salah.times.Maghrib))) ?
                                            //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))
                                            "highlightNextWaqt" : ""
                                        //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))

                                    }>
                                        {/* <td>
                                            <div class="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td> */}
                                        <td><b>Asr</b></td>
                                        <td>{convert12hrFormat(Salah.times.Asr)}</td>
                                        <td>
                                            <div>
                                                <img className="checkimg" onClick={() => setisDone(4, "Asr")} src={ts = false, donesalah.map(mp => (mp.waqt == "Asr" && mp.isdone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                                            </div>
                                        </td>
                                        <td><Countdown daysInHours='true' date={Date.now() + (Date.parse(moment(new Date()).format("MM/DD/YYYY").toString() + ' ' + Salah.times.Asr) - Date.now())} /></td>

                                    </tr>
                                )}
                            {
                                displaySalahTime.map((Salah, index) =>
                                    <tr className={
                                        ((Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) >= Date.parse('01/01/2011 ' + Salah.times.Maghrib)) && (Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) < Date.parse('01/01/2011 ' + Salah.times.Isha))) ?
                                            //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))
                                            "highlightNextWaqt" : ""
                                        //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))

                                    }>
                                        {/* <td>
                                            <div class="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td> */}
                                        <td><b>Maghrib</b>, Iftar</td>
                                        <td>{convert12hrFormat(Salah.times.Maghrib)}</td>
                                        <td>
                                            <div>
                                                <img className="checkimg" onClick={() => setisDone(5, "Maghrib")} src={ts = false, donesalah.map(mp => (mp.waqt == "Maghrib" && mp.isdone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                                            </div>
                                        </td>
                                        <td><Countdown daysInHours='true' date={Date.now() + (Date.parse(moment(new Date()).format("MM/DD/YYYY").toString() + ' ' + Salah.times.Maghrib) - Date.now())} /></td>

                                    </tr>
                                )}
                            {
                                displaySalahTime.map((Salah, index) =>
                                    <tr className={
                                        (Date.parse('01/01/2011 ' + moment(Date(dummy)).format("HH:mm").toString()) >= Date.parse('01/01/2011 ' + Salah.times.Isha)) ?
                                            //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))
                                            "highlightNextWaqt" : ""
                                        //console.log((Date.parse('01/01/2011 '+time) > Date.parse('01/01/2011 '+Salah.times.Dhuhr)) || (Date.parse('01/01/2011 '+time) < Date.parse('01/01/2011 '+Salah.times.Asr)))

                                    }>
                                        {/* <td>
                                            <div class="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td> */}
                                        <td><b>Isha</b></td>
                                        <td>{convert12hrFormat(Salah.times.Isha)}</td>
                                        <td>
                                            <div>
                                                <img className="checkimg" onClick={() => setisDone(6, "Isha")} src={ts = false, donesalah.map(mp => (mp.waqt == "Isha" && mp.isdone == true) ? ts = true : ts = ts), ts ? check : circle} alt={ts? "check":"circle"} width="20" />
                                            </div>
                                        </td>
                                        <td><Countdown daysInHours='true' date={Date.now() + (Date.parse(moment(new Date()).format("MM/DD/YYYY").toString() + ' ' + Salah.times.Isha) - Date.now())} /></td>

                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Salah;
