import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Forum.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
function upvoteAccepted() {
    alert('Post upvoted!');
  }

function showComments() {
alert('Expand box to reveal comment section.');
}

const Forum = () => {
    return (
        <Router>
        <div>
            <header className="forumHeader">
                <Navbar collapseOnSelect expand="lg" variant="dark">
                    <Container>
                    <Navbar.Brand href="#">
                    <img src={mainIcon} alt="logo" width="50"/>
                    <img src={textIcon} alt="logo" width="200"/>
                    </Navbar.Brand> 
                    </Container>
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ms-auto">
                            <Nav.Link href="../../pages/Homepage">Home</Nav.Link>
                                <Nav.Link href="../../pages/Dua">Dua</Nav.Link>
                                <Nav.Link href="../../pages/Salah">Salah</Nav.Link>
                                <Nav.Link href="../../pages/Sawm">Sawm</Nav.Link>
                                <Nav.Link href="../../pages/Tracker">Tracker</Nav.Link>
                                <Nav.Link href="../../pages/Challenges">Challenges</Nav.Link>
                                <Nav.Link className="active" href="#">Forum</Nav.Link>
                            </Nav>
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