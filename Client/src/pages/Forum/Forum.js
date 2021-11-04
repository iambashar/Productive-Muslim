import React, { useState } from 'react';
import { useEffect, useRef } from "react"
import moment from 'moment';
import { Button, Card, Alert } from "react-bootstrap"
import { Dropdown, Form, Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Forum.css'
import { Link, useHistory, BrowserRouter as Router, } from "react-router-dom";
import userimg from '../../Images/user.png';
import { useAuth } from "../../components/Authentication/AuthContext";

function upvoteAccepted() {
    // var link = 'http://localhost:3000/updateupvote/'.concat(vote);
    // fetch(link, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ postid })
    // });
}

function showComments() {
    alert('Expand box to reveal comment section.');
}

const Forum = () => {
    const titleRef = useRef()
    const descRef = useRef()
    const commentRef = useRef()
    const [uid, setUid] = useState()
    const [name, setName] = useState()
    const [displayPosts, setPost] = useState([])
    const [displayComment, setdisplayComment] = useState([])
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [showList, setShowList] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:3000/userprofile/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (result) => {
                    setName(result.data.user.name);
                    setUid(result.data.user.userid);
                }
            );

        fetch("http://127.0.0.1:3000/showposts")
            .then(res => res.json())
            .then(
                (results) => {
                    setPost(results.data.posts);
                }
            );

        fetch("http://127.0.0.1:3000/showcomments")
            .then(res => res.json())
            .then(
                (results) => {
                    setdisplayComment(results.data.comments);
                }
            );
    }, []);

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    function addnewpost() {
        const userName = name;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const upVote = 0;
        fetch('http://127.0.0.1:3000/createpost/'.concat(uid), {
            method: 'POST',
            body: JSON.stringify({ userName, title, description, upVote }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    const addnewcomment = (postID, index) => {
        const userName = name;
        const comment = document.getElementsByClassName("usercomment")[index].value;
        fetch('http://127.0.0.1:3000/createcomment', {
            method: 'POST',
            body: JSON.stringify({ postID, uid, userName, comment }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    const toggleShowList = (index) => {
        if (document.getElementsByClassName("commentbox")[index].style.display == "flex") {
            document.getElementsByClassName("commentbox")[index].style.display = "none";
        }
        else {
            document.getElementsByClassName("commentbox")[index].style.display = "flex";
        }
    }

    return (
        <div>
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
            </Router >
            <div className="pageContent">
                <br />
                <Dropdown>
                    <Dropdown.Toggle id="postbox" variant="secondary">
                        Want to Post something
                    </Dropdown.Toggle>

                    <Dropdown.Menu id="postdrop" >
                        <Form id="forumbox2">
                            <Form.Group className="mb-3" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control id="title" type="text" placeholder="What is the meaning of life?" ref={titleRef} required />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control id="description" as="textarea" placeholder="If anyone can briefly explain this.." rows={3} ref={descRef} required />
                            </Form.Group>
                            <Button id="postbtn" type="submit" onClick={addnewpost}>
                                Post
                            </Button>
                        </Form>
                    </Dropdown.Menu>
                </Dropdown>

                <div>
                    {
                        displayPosts.map((allpost, index) =>
                            <div className="postdiv">
                                <div className="forumbox">
                                    <div>
                                        <h1>{allpost.title}</h1>
                                        <h2 className="forumTimeAndAuthor">Posted on {moment(allpost.posteddate).format('DD-MM-YYYY')} by <u>{allpost.username}</u></h2>
                                        <h3 className="forumBody">
                                            {allpost.description}
                                        </h3>
                                        <button onClick={upvoteAccepted}>{allpost.upvote}</button>
                                        <button id="commentbtn" onClick={() => toggleShowList(index)}>{} Comments</button>
                                        <div className="commentbox">
                                            <Form id="forumbox2">
                                                {
                                                    displayComment.map(comment =>
                                                        comment.postid == allpost.postid ?
                                                            <Form.Group className="mb-3" >
                                                                <Form.Label>{allpost.username}
                                                                    <h2 className="forumTimeAndAuthor">Posted on {moment(allpost.posteddate).format('DD-MM-YYYY')}</h2>
                                                                </Form.Label>
                                                                <Form.Control id="otherusercomment" type="text" readOnly="true" defaultValue={comment.comment} />
                                                            </Form.Group>
                                                            :
                                                            <div>
                                                            </div>
                                                    )
                                                }
                                                <Form.Group className="mb-3" >
                                                    <Form.Label>Post you comment</Form.Label>
                                                    <Form.Control className="usercomment" as="textarea" placeholder="I was thinking.." />
                                                </Form.Group>
                                                <Button id="postbtn" onClick={() => addnewcomment(allpost.postid, index)} type="submit">
                                                    Post
                                                </Button>
                                            </Form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Forum;
