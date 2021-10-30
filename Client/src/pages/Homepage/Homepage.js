import React, { useContext, useEffect, useState } from 'react';
import './Homepage.css'
import { Navbar, Container, Nav, Carousel, Button } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import { useHistory } from "react-router";
import { useAuth } from "../../components/Authentication/AuthContext";
import { SalahContext} from '../SalahContextProvider';

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
    const [meridian, setMeridian] = useState();
    var remTime;

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

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
        var id = Math.floor(Math.random() * 6236) + 1;
        var link = "http://api.alquran.cloud/v1/ayah/";
        link = link.concat(id, "/en.asad");
        fetch(link)
            .then(res => res.json())
            .then(data => {
                setAyah(data.data.text);
                setSurah(data.data.surah.englishName);
                setAyahNo(data.data.surah.numberOfAyahs);
                console.log(data.data.text);
            });
    }, []);

    useEffect(() => {
        // if does not work then turn off your browser ad blocker :)
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then(
                (result) => {
                    //const link = "https://api.pray.zone/v2/times/today.json?ip=".concat(result.query);
                    const link = "https://api.pray.zone/v2/times/today.json?ip=116.58.203.136";
                    return fetch(link)
                }
            ).then(res => res.json())
            .then(
                (result) => {
                    getSalahTimes(result.results.datetime);
                });
    }, []);

    useEffect(() => {
        if (parseInt(nextHr) * 60 + parseInt(nextMin) <= 719) {
            setMeridian("am");
        }
        else {
            setMeridian("pm");
        }
    }, [nextMin, nextHr]);

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
            setNextHr(dhuhr[0]);
            setNextMin(dhuhr[1]);

        }
        else if (currentTime >= dhuhrMin && currentTime < asrMin) {
            setCurrentWakt("Dhuhr");
            setNextWakt("Asr");
            remTime = asrMin - currentTime;
            setRemHr(Math.floor(remTime / 60));
            setRemMin(remTime % 60);
            setNextHr(asr[0] - 12);
            setNextMin(asr[1]);
        }
        else if (currentTime >= asrMin && currentTime < maghribMin) {
            setCurrentWakt("Asr");
            setNextWakt("Maghrib");
            remTime = maghribMin - currentTime;
            setRemHr(Math.floor(remTime / 60));
            setRemMin(remTime % 60);
            setNextHr(maghrib[0] - 12);
            setNextMin(maghrib[1]);
        }
        else if (currentTime >= maghribMin && currentTime < ishaMin) {
            setCurrentWakt("Maghrib");
            setNextWakt("Isha");
            remTime = ishaMin - currentTime;
            setRemHr(Math.floor(remTime / 60));
            setRemMin(remTime % 60);
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
                                <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width="40" height="40" class="rounded-circle" />
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="/update-profile">Edit Profile</a>
                                <a class="dropdown-item" onClick={handleLogout}>Log Out</a>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <div>
                <div className="quranAyah">
                    <p className="quranAyahPara">{ayah}<br />-Surah {surah}, Verse: {ayahNo}</p>
                </div>
                <div className="salahTime">
                    <Carousel indicators={false} indicatorLabels="[0]">
                        <Carousel.Item interval={4000}>
                            <p>Next Salah: <br /> {nextWakt}, {nextHr}:{nextMin}{meridian}</p>
                        </Carousel.Item>
                        <Carousel.Item interval={4000}>
                            <p>{currentWakt} remaining: <br /> {remHr}hr, {remMin}min</p>
                        </Carousel.Item>
                    </Carousel>
                </div>

            </div>
            <div className="hadith">
                <button id="btnHadithofDay">
                    Hadith of the Day
                </button>
            </div>
        </div>

    );
};

export default Homepage;