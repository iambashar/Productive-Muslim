import React, { useEffect, useState } from 'react';
import './Homepage.css'
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
const Homepage = () => {
    const [ayah, setAyah] = useState();
    const [surah, setSurah] = useState();
    const [ayahNo, setAyahNo] = useState();

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
            });
        }, []);

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
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"  className="toggle-nav"/>
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
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <div>
                <div className="quranAyah">
                    <p className="quranAyahPara">{ayah}<br />-Surah {surah}, Verse: {ayahNo}</p>
                </div>
                <div className="salahTime">
                    <p>Next Salah: <br /> Ashr, 4:50pm</p>
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