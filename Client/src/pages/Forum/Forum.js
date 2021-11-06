import React, { useState } from 'react';
import { useEffect, useRef } from "react"
import moment from 'moment';
import { InputGroup, Button, Card, Alert } from "react-bootstrap"
import { Dropdown, Form, Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Forum.css'
import { useHistory, BrowserRouter as Router, } from "react-router-dom";
import userimg from '../../Images/user.png';
import { useAuth } from "../../components/Authentication/AuthContext";
import deleteIcon from '../../../src/Images/deleteIcon.svg';

const Forum = () => {
    const titleRef = useRef()
    const descRef = useRef()
    const [uid, setUid] = useState()
    const [name, setName] = useState()
    const [displayPosts, setPost] = useState([])
    const [displayComment, setdisplayComment] = useState([])
    const [displayupVote, setdisplayupVote] = useState([])
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    var ts = false;
    var cmnt = 0;

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

        fetch("http://127.0.0.1:3000/getupvotes/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (results) => {
                    setdisplayupVote(results.data.upvotes);
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
        const comments = 0;
        fetch('http://127.0.0.1:3000/createpost/'.concat(uid), {
            method: 'POST',
            body: JSON.stringify({ userName, title, description, upVote, comments }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        console.log(name);
    }

    const addnewcomment = (postID, index, comment) => {
        const userName = name;
        const commentcontent = document.getElementsByClassName("usercomment")[index].value;
        fetch('http://127.0.0.1:3000/createcomment', {
            method: 'POST',
            body: JSON.stringify({ postID, uid, userName, commentcontent }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        comment++;

        fetch('http://localhost:3000/updatecommentcount/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment, postID })
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

    const toggleUpVote = (postID, index, vote) => {
        if (document.getElementsByTagName("i")[index].className == "far fa-thumbs-up fa-2x") {
            document.getElementsByTagName("i")[index].className = "fas fa-thumbs-up fa-2x";
            document.getElementsByTagName("i")[index].innerHTML = (parseInt(document.getElementsByTagName("i")[index].innerHTML) + 1);
            fetch('http://127.0.0.1:3000/addupvote', {
                method: 'POST',
                body: JSON.stringify({ postID, uid }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            vote++;
            console.log(vote);
            fetch('http://127.0.0.1:3000/updateupvote', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vote, postID })
            });
        }
        else {
            document.getElementsByTagName("i")[index].className = "far fa-thumbs-up fa-2x";
            fetch('http://127.0.0.1:3000/deleteupvote', {
                method: 'DELETE',
                body: JSON.stringify({ postID, uid }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            vote--;
            document.getElementsByTagName("i")[index].innerHTML = (parseInt(document.getElementsByTagName("i")[index].innerHTML) - 1);
            fetch('http://localhost:3000/updateupvote', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vote, postID })
            });
        }
    }

    function deletePost(postID, index) {
        document.getElementsByClassName("forumbox")[index].style.display = "none";
        fetch('http://127.0.0.1:3000/deleteforumpost', {
            method: 'DELETE',
            body: JSON.stringify({ postID, uid }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    function deleteComment(commentid, idx, comment, postID, index) {
        document.getElementsByClassName("onecomment")[idx].style.display = "none";
        fetch('http://127.0.0.1:3000/deletecomment', {
            method: 'DELETE',
            body: JSON.stringify({ commentid, uid }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        comment--;
        document.getElementsByClassName("commentbtn")[index].innerHTML = cmnt+"&nbsp;&nbsp;&nbsp;Comments";
        fetch('http://localhost:3000/updatecommentcount', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment, postID })
        });
        console.log(index);
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
                                        <h1 className="posttitle">{allpost.title}</h1>
                                        <div className="deleteIcon" onClick={() => deletePost(allpost.postid, index)} style={allpost.userid == uid ? { display: 'inline-block', float: 'right' } : { display: 'none' }}>
                                            <img src={deleteIcon} width="20"></img>
                                        </div>
                                        <h2 className="forumTimeAndAuthor">Posted on {moment(allpost.posteddate).format('DD-MM-YYYY')} by <u>{allpost.username}</u></h2>
                                        <h3 className="forumBody">
                                            {allpost.description}
                                        </h3>
                                        <i id="upVotebtn" className={ts = false, displayupVote.map(mp => mp.postid == allpost.postid ? ts = true : ts = ts), ts ? "fas fa-thumbs-up fa-2x" : "far fa-thumbs-up fa-2x"}
                                            onClick={() => toggleUpVote(allpost.postid, index, allpost.upvote)}>{allpost.upvote}</i>
                                        <Dropdown.Toggle className="commentbtn" variant="secondary" onClick={() => toggleShowList(index)}>
                                            {allpost.commentcount}&nbsp;&nbsp;&nbsp;Comments
                                        </Dropdown.Toggle>
                                        <div className="commentbox">
                                            <Form id="forumbox2">
                                                <Form.Group className="mb-3" >
                                                    <Form.Label>Post your comment</Form.Label>
                                                    <Form.Control className="usercomment" as="textarea" placeholder="I was thinking.." />
                                                </Form.Group>
                                                <div>
                                                    <Button id="postbtn" onClick={() => addnewcomment(allpost.postid, index, allpost.commentcount)} type="submit">
                                                        Post
                                                    </Button>
                                                </div>
                                                <div>
                                                    {cmnt=allpost.commentcount,
                                                        displayComment.map((comment, idx) =>
                                                            comment.postid == allpost.postid ?
                                                                <Form.Group className="onecomment">
                                                                    <Form.Label>{comment.username}
                                                                        <h2 className="forumTimeAndAuthor">Posted on {moment(allpost.posteddate).format('DD-MM-YYYY')}</h2>
                                                                    </Form.Label>
                                                                    <InputGroup>
                                                                        <Form.Control id="otherusercomment" type="text" readOnly="true" defaultValue={comment.comment} />
                                                                        <InputGroup.Append style={comment.userid == uid ? { display: 'inline-block' } : { display: 'none'}}>
                                                                            <InputGroup.Text>
                                                                                <div type="submit" className="deleteIcon" onClick={() => deleteComment(comment.commentid, idx, cmnt--, allpost.postid, index)} style={comment.userid == uid ? { display: 'inline-block' } : { display: 'none'}}>
                                                                                    <img src={deleteIcon} width="20"></img>
                                                                                </div>
                                                                            </InputGroup.Text>
                                                                        </InputGroup.Append>
                                                                    </InputGroup>
                                                                </Form.Group>
                                                                :
                                                                <div>
                                                                </div>
                                                        )
                                                    }
                                                </div>
                                            </Form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    );
};

export default Forum;
