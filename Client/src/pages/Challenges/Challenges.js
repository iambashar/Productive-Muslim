import React, {useState} from 'react';
import { Navbar, Container, Nav, FormCheck } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Challenges.css'
import Button from 'react-bootstrap/Button';
import deedimg2 from '../../Images/2.png';
import deedimg1 from '../../Images/1.png';
import { useHistory } from "react-router";
import userimg from '../../Images/user.png'
import { useAuth } from "../../components/Authentication/AuthContext";


const Challenges = () => {
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
    return (
        <div>
            <header class="challengesHeader">
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
                <Button className="btnjoin" variant="outline-success">Join Now</Button>{' '}
            </div>
            <div className="taskdiv">
                <h2><b>30 DEEDS CHALLENGE</b></h2>
                <p>The blessed month is upon us! Ramadan is all about fasting, worship and charity and we couldn't
                    think of a better time to commit to doing good. Show love to Allah (SWT) and thank him by
                    performing a good deed everyday with our 30 Days, 30 Deeds Challenge.</p>
                <div class="Ashras">
                    <div>1st Ashras</div>
                    <div>يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغيثُ</div>
                    <div>Oh Everliving, The Everlasting, I seek Your help through Your mercy.</div>
                </div>

                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg1} />
                    </div>
                    <div class="deedItem">
                        <div>
                            Day 1
                        </div>
                        <div>
                            Have a healthy Sehr
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </div>
                </div>
                <div class="deeds">
                    <div className="deedimg">
                        <img src={deedimg2} />
                    </div>
                    <div class="deedItem">
                        <div>
                            Day 2
                        </div>
                        <div>
                            Learn a new dua
                        </div>
                    </div>
                    <div className="ck">
                        <div class="form-check d-flex justify-content-center">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challenges;