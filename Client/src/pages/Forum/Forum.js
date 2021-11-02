import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Forum.css'
import { BrowserRouter as Router, } from "react-router-dom";
import { useHistory } from "react-router";
import { useAuth } from "../../components/Authentication/AuthContext";
function upvoteAccepted() {
    alert('Post upvoted!');
}

function showComments() {
    alert('Expand box to reveal comment section.');
}



const Forum = () => {
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
    } return (
        <Router>
            <div>
                <header class="forumHeader">
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
                                    <Nav.Link href="../../pages/Challenges">Challenges</Nav.Link>
                                    <Nav.Link className="active" href="#">Forum</Nav.Link>
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
            </div>

            <div className="pageContent">
                <div className="rightDiv">
                    <div className="emotionBox">
                        {
                            <div>
                                <h1>Example Forum Question?</h1>
                                <h2 className="forumTimeAndAuthor">Posted on October 15, 2021 by <u>M.K. Bashar</u></h2>
                                <h3 className="forumBody">
                                    Assalamualaikum, everyone.
                                    I have some confusions about X. Please give me some advice on the matter.
                                </h3>
                                {/* <h2 className="english">asdasd</h2> */}
                                <button onClick={upvoteAccepted}>Upvote</button>
                                <button onClick={showComments}>4 Comments</button>
                            </div>
                            /* <div className="likes">
                                <div className="menuIcon">
                                    <img src={likedIcon} width="20"></img>
                                </div>
                                1200
                            </div> */
                        }
                    </div>
                    <div className="emotionBox">
                        {
                            <div>
                                <h1>Ruling on memorizing Qur’an using the “five fortresses” method</h1>
                                <h2 className="forumTimeAndAuthor">Posted on October 15, 2021 by <u>M.K. Bashar</u></h2>
                                <h3 className="forumBody">
                                    What is the ruling on memorizing Qur’an using the “five fortresses” method?
                                </h3>
                                {/* <h2 className="english">asdasd</h2> */}
                                <button onClick={upvoteAccepted}>Upvote</button>
                                <button onClick={showComments}>3 Comments</button>
                            </div>

                            /* <div className="likes">
                                <div className="menuIcon">
                                    <img src={likedIcon} width="20"></img>
                                </div>
                                1200
                            </div> */
                        }
                    </div>
                    <div className="emotionBox">
                        {
                            <div>
                                <h1>Praying ‘Ishaa’ the next morning</h1>
                                <h2 className="forumTimeAndAuthor">Posted on October 15, 2021 by <u>M.K. Bashar</u></h2>
                                <h3 className="forumBody">
                                    At this time of year the Isha prayer is around 10:25 pm. I have school the next day so i'm not aloud to stay up that late. I wanted to know if it is haraam to pray it the next morning. My parents are willing to allow me to stay up for the Isha prayer if praying it the next morning is haraam.
                                    Thank you for your time.
                                </h3>
                                {/* <h2 className="english">asdasd</h2> */}
                                <button onClick={upvoteAccepted}>Upvote</button>
                                <button onClick={showComments}>2 Comments</button>
                            </div>
                            /* <div className="likes">
                                <div className="menuIcon">
                                    <img src={likedIcon} width="20"></img>
                                </div>
                                1200
                            </div> */
                        }
                    </div>
                </div>
            </div>

        </Router>
    );
};

export default Forum;
