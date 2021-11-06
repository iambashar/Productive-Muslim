import React, { useContext, useEffect, useState } from 'react';
import './Homepage.css'
import { Navbar, Container, Nav, Carousel, Button, Col, Row } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import { useHistory } from "react-router";
import { useAuth } from "../../components/Authentication/AuthContext";
import userimg from '../../Images/user.png';
import { SalahContext } from '../SalahContextProvider';
import firebase from 'firebase/compat'
import Footer from '../../components/Footer/Footer'



const Homepage = (props) => {
    const [ayah, setAyah] = useState();
    const [surah, setSurah] = useState();
    const [ayahNo, setAyahNo] = useState();
    const [currentWakt, setCurrentWakt] = useState();
    const [nextWakt, setNextWakt] = useState();
    const [remMin, setRemMin] = useState();
    const [remHr, setRemHr] = useState();
    const [nextMin, setNextMin] = useState();
    const [nextHr, setNextHr] = useState();
    const [nextHr12, setNextHr12] = useState();
    const [meridian, setMeridian] = useState();
    var remTime;
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [uid, setUid] = useState();
    const [displayMydayTask, setDisplayMydayTask] = useState([]);
    const [displayfavourite, setDisplayfarourite] = useState([]);
    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            setUid(firebase.auth().currentUser.uid);
        }
    }, [uid]);

    useEffect(() => {
        var id = Math.floor(Math.random() * 6236) + 1;
        var link = "http://api.alquran.cloud/v1/ayah/";
        link = link.concat(id, "/en.asad");
        fetch(link)
            .then(res => res.json())
            .then(data => {
                setAyah(data.data.text);
                setSurah(data.data.surah.englishName);
                setAyahNo(data.data.numberInSurah);
                console.log(data.data);
            });

        // if does not work then turn off your browser ad blocker :)
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then(
                (result) => {
                    const link = "https://api.pray.zone/v2/times/today.json?ip=".concat("116.58.202.147");
                    return fetch(link)
                }
            ).then(res => res.json())
            .then(
                (result) => {
                    getSalahTimes(result.results.datetime);
                });

        link = "http://localhost:3000/showmyday/";
        link = link.concat(currentUser.uid);
        console.log(currentUser.uid);
        fetch(link)
            .then(res => res.json()
                .then(
                    (result) => {
                        setDisplayMydayTask(result.data.tasks);
                        console.log(result.data.tasks);
                    }));
        fetch("http://127.0.0.1:3000/getfavdua/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (results) => {
                    setDisplayfarourite(results.data.dua);
                    console.log(results.data.dua);
                }
            );
    }, []);

    useEffect(() => {
        if (parseInt(nextHr12) * 60 + parseInt(nextMin) <= 719) {
            setMeridian("am");
        }
        else {
            setMeridian("pm");
        }
    }, [nextMin, nextHr12]);

    function getHadith() {

        // fetch('https://api.sunnah.com/v1/hadiths/random', {
        //     method: 'GET',
        //     headers: {
        //         "x-api-key": "SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk"
        //     }})
        //     .then(res => res.json())
        //     .then(data => {
        //         setAyah(data.hadit[0].body);
        //         setSurah(data.hadit[0].chapterTitle);
        //         setAyahNo(data.hadit[0].chapterNumber);
        //     });

    }

    function retrieveTime() {
        var today = new Date();
        var hr = today.getHours();
        var min = today.getMinutes();
        var time = hr * 60 + min;
        return time;
    };

    function getSalahTimes(salahTimes) {
        const times = [];
        times["Fajr"] = salahTimes[0].times.Fajr;
        times["Dhuhr"] = salahTimes[0].times.Dhuhr;
        times["Asr"] = salahTimes[0].times.Asr;
        times["Maghrib"] = salahTimes[0].times.Maghrib;
        times["Isha"] = salahTimes[0].times.Isha;

        var fajr = times["Fajr"].split(':');
        var dhuhr = times["Dhuhr"].split(':');
        var asr = times["Asr"].split(':');
        var maghrib = times["Maghrib"].split(':');
        var isha = times["Isha"].split(':');

        var fajrMin = parseInt(fajr[0]) * 60 + parseInt(fajr[1]);
        var dhuhrMin = parseInt(dhuhr[0]) * 60 + parseInt(dhuhr[1]);
        var asrMin = parseInt(asr[0]) * 60 + parseInt(asr[1]);
        var maghribMin = parseInt(maghrib[0]) * 60 + parseInt(maghrib[1]);
        var ishaMin = parseInt(isha[0]) * 60 + parseInt(isha[1]);

        var currentTime = retrieveTime();

        if (currentTime >= fajrMin && currentTime < dhuhrMin) {
            setCurrentWakt("Fajr");
            setNextWakt("Dhuhr");
            remTime = dhuhrMin - currentTime;
            setRemHr(Math.floor(remTime / 60));
            setRemMin(remTime % 60);
            if (dhuhr[0] > 12)
                setNextHr(dhuhr[0] - 12);
            else
                setNextHr(dhuhr[0]);
            setNextHr12(dhuhr[0]);
            setNextMin(dhuhr[1]);
        }
        else if (currentTime >= dhuhrMin && currentTime < asrMin) {
            setCurrentWakt("Dhuhr");
            setNextWakt("Asr");
            remTime = asrMin - currentTime;
            setRemHr(Math.floor(remTime / 60));
            setRemMin(remTime % 60);
            setNextHr12(asr[0]);
            setNextHr(asr[0] - 12);
            setNextMin(asr[1]);
        }
        else if (currentTime >= asrMin && currentTime < maghribMin) {
            setCurrentWakt("Asr");
            setNextWakt("Maghrib");
            remTime = maghribMin - currentTime;
            setRemHr(Math.floor(remTime / 60));
            setRemMin(remTime % 60);
            setNextHr12(maghrib[0]);
            setNextHr(maghrib[0] - 12);
            setNextMin(maghrib[1]);
        }
        else if (currentTime >= maghribMin && currentTime < ishaMin) {
            setCurrentWakt("Maghrib");
            setNextWakt("Isha");
            remTime = ishaMin - currentTime;
            setRemHr(Math.floor(remTime / 60));
            setRemMin(remTime % 60);
            setNextHr12(isha[0]);
            setNextHr(isha[0] - 12);
            setNextMin(isha[1]);
        }
        else {
            setCurrentWakt("Isha");
            setNextWakt("Fajr");
            remTime = fajrMin + 1440 - currentTime;
            if (remTime > 1440) {
                remTime = remTime - 1440;
            }
            setRemHr(Math.floor(remTime / 60));
            setRemMin(remTime % 60);
            setNextHr12(fajr[0]);
            setNextHr(fajr[0]);
            setNextMin(fajr[1]);
        }
    };


    return (
        <div className="bdy">
            <header class="headerDiv">
                <Navbar collapseOnSelect expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand href="#">
                            <img src={mainIcon} alt="logo" width="50" />
                            <img src={textIcon} alt="logo" width="200" />
                        </Navbar.Brand>
                    </Container>
                    <Container className="container2">
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="toggle-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link className="active" href="#">Home</Nav.Link>
                                <Nav.Link href="../../pages/Dua">Dua</Nav.Link>
                                <Nav.Link href="../../pages/Salah">Salah</Nav.Link>
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
            <div className="quranAyah">
                <p>{ayah}<br />-Surah {surah}, Verse: {ayahNo}</p>
            </div>
            <Container>
            <Row className="cards">
                <div className="cardItem">
                    <Carousel indicators={false} indicatorLabels="[0]">
                        <Carousel.Item  className="quranAyahPara" interval={4000}>
                            <p>Next Salah: <br /> {nextWakt}, {nextHr}:{nextMin}{meridian}</p>
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <p>{currentWakt} remaining: <br /> {remHr}hr, {remMin}min</p>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="cardItem">
                <Carousel indicators={false} indicatorLabels="[0]">
                    {
                        displayMydayTask.map(myday =>
                            <Carousel.Item interval={4000}>
                            <p>Today's Task: <br/> {myday.task}</p>
                        </Carousel.Item>
                            )
                    }
                    </Carousel>
                </div>
                <div className="cardItemDua">
                <Carousel indicators={false} indicatorLabels="[0]">
                    {
                        displayfavourite.map(favdua =>
                            <Carousel.Item interval={8000}>
                            <p>Make a Dua: <br/> {favdua.translation}</p>
                        </Carousel.Item>
                            )
                    }
                    </Carousel>
                </div>
                

            </Row>
            </Container>
        </div>

    );
};

export default Homepage;