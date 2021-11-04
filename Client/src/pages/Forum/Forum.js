import React, { useState } from 'react';
import { useEffect, useRef } from "react"
import { Button, Card, Alert } from "react-bootstrap"
import { Form, Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Forum.css'
import { Link, useHistory, BrowserRouter as Router, } from "react-router-dom";
import userimg from '../../Images/user.png';
import { useAuth } from "../../components/Authentication/AuthContext";
function upvoteAccepted() {
    alert('Post upvoted!');
}

function showComments() {
    alert('Expand box to reveal comment section.');
}

const Forum = () => {
    const nameRef = useRef()
    const madhabRef = useRef()
    const countryRef = useRef()
    const cityRef = useRef()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState([])
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const setMadhabValue = (selectedMadhab) => {
        document.getElementById("madhabbox").innerHTML = selectedMadhab.target.outerText;
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

    function handleSubmit(e) {
        e.preventDefault()

        const promises = []
        setLoading(true)
        setError("")

        if (user.name != nameRef || user.madhab != madhabRef ||
            user.country != countryRef || user.city != cityRef) {
            var uid = currentUser.uid;
            var name = nameRef.current.value;
            var email = currentUser.email;
            var madhab = document.getElementById("madhabbox").innerHTML;
            var country = countryRef.current.value;
            var city = cityRef.current.value;
            promises.push(
                fetch('http://127.0.0.1:3000/updateuser/'.concat(uid), {
                    method: 'POST',
                    body: JSON.stringify({ uid, name, email, madhab, country, city }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
            )
        }

        Promise.all(promises)
            .then(() => {
                history.push("/")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
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
            </div>

            <div className="pageContent">
                {
                    <div className="postdiv">
                        <Form className="forumbox">
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="What is the meaning of life?" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" placeholder="If anyone briefly explain this.." rows={3} />
                            </Form.Group>
                            <Button disabled={loading} id="postbtn" type="submit">
                                Post
                            </Button>
                        </Form>
                    </div>

                }
                <br />
                <div className="postdiv">
                    <div className="forumbox">

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
                    </div>
                </div>
            </div>

        </Router>
    );
};

export default Forum;
