import React from 'react';
import './Homepage.css'
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
const Homepage = () => {
    return (
        <div className="bdy">
            <header class="headerDiv">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="#">
                            <img src={mainIcon} alt="logo" width="50" />
                            <img src={textIcon} alt="logo" width="200" />
                        </Navbar.Brand>
                    </Container>
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
            <Row>
                <Col md={9} className="quranAyah">
                <p className="quranAyahPara">Rather, your souls have enticed you to something, so patience is most fitting. And Allah is the one sought for help against that which you describe.<br />(Suratul Yousuf, Verse: 111)
                    </p>
                </Col>
                <Col md={2} className="salahTime">
                <p>Next Salah: <br /> Ashr, 4:50pm</p>
                </Col>
                
            </Row>
            <Row className="hadith">
                <button id="btnHadithofDay">
                    Hadith of the Day
                </button>
            </Row>
        </div>

    );
};

export default Homepage;