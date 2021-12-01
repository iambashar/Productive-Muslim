import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { Dropdown, Form, InputGroup, Button } from "react-bootstrap"
import './AllPosts.css';
import { useAuth } from "../../../components/Authentication/AuthContext";
import deleteIcon from '../../../../src/Images/deleteIcon.svg';
import mypost from '../../../Images/myPost.svg';
import allpostact from '../../../Images/allPostActive.svg';
import searchIcon from '../../../Images/searchIcon.svg'

const AllPosts = () => {
    const titleRef = useRef()
    const descRef = useRef()
    const [uid, setUid] = useState()
    const [name, setName] = useState()
    const [displayPosts, setPost] = useState([])
    const [displayComment, setdisplayComment] = useState([])
    const [displayupVote, setdisplayupVote] = useState([])
    const { currentUser } = useAuth()
    var ts = false;
    var cmnt = 0;

    useEffect(() => {
        fetch("/userprofile/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (result) => {
                    setName(result.data.user.name);
                    setUid(result.data.user.userid);
                }
            );

        fetch("/showposts")
            .then(res => res.json())
            .then(
                (results) => {
                    setPost(results.data.posts);
                }
            );

        fetch("/showcomments")
            .then(res => res.json())
            .then(
                (results) => {
                    setdisplayComment(results.data.comments);
                }
            );

        fetch("/getupvotes/".concat(currentUser.uid))
            .then(res => res.json())
            .then(
                (results) => {
                    setdisplayupVote(results.data.upvotes);
                }
            );
    }, []);

    function addnewpost() {
        const userName = name;
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const upVote = 0;
        const comments = 0;
        fetch('/createpost/'.concat(uid), {
            method: 'POST',
            body: JSON.stringify({ userName, title, description, upVote, comments }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    const addnewcomment = (postID, index, comment) => {
        const userName = name;
        const commentcontent = document.getElementsByClassName("usercomment")[index].value;
        fetch('/createcomment', {
            method: 'POST',
            body: JSON.stringify({ postID, uid, userName, commentcontent }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        comment++;

        fetch('/updatecommentcount/', {
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
            fetch('/addupvote', {
                method: 'POST',
                body: JSON.stringify({ postID, uid }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            vote++;
            fetch('/updateupvote', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vote, postID })
            });
            vote--;
        }
        else {
            document.getElementsByTagName("i")[index].className = "far fa-thumbs-up fa-2x";
            fetch('/deleteupvote', {
                method: 'DELETE',
                body: JSON.stringify({ postID, uid }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            vote--;
            document.getElementsByTagName("i")[index].innerHTML = (parseInt(document.getElementsByTagName("i")[index].innerHTML) - 1);
            fetch('/updateupvote', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ vote, postID })
            });
            vote++;
        }
    }

    function deletePost(postID, index) {
        document.getElementsByClassName("forumbox")[index].style.display = "none";
        fetch('/deleteforumpost', {
            method: 'DELETE',
            body: JSON.stringify({ postID, uid }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    }

    function deleteComment(commentid, idx, comment, postID, index) {
        document.getElementsByClassName("onecomment")[idx].style.display = "none";
        fetch('/deletecomment', {
            method: 'DELETE',
            body: JSON.stringify({ commentid, uid }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        comment--;
        document.getElementsByClassName("commentbtn")[index].innerHTML = cmnt + "&nbsp;&nbsp;&nbsp;Comments";
        fetch('/updatecommentcount', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment, postID })
        });
        comment++;
    }

    const searchPost = () => {
        var text = document.getElementById("searchForum").value;
        text = "%25" + text + "%25";
        var link = "/searchpost/";
        link = link.concat(text);
        fetch(link)
            .then(res => res.json())
            .then(
                (results) => {
                    setPost(results.data.search);
                }
            );
    }


    return (
        <div>
            <div class="sideMenuDua">
                <div class="menuItem">
                    <a className="menuItem activeNav" href="#">
                        <div className="menuIcon" >
                            <img src={allpostact} width="25"></img>
                        </div>
                        <div className="menuText">All Posts</div>
                    </a>
                </div>
                <div class="menuItem">
                    <a className="menuItem" href="../../pages/Forum/Myposts">
                        <div className="menuIcon">
                            <img src={mypost} width="25"></img>
                        </div>
                        <div className="menuText">My Posts</div>
                    </a>
                </div>

            </div>
            <div className="rightDiv">
                <br />
                <div className="searchDiv">
                    <InputGroup>
                        <Form.Control id="searchForum" type="text" placeholder="Search" autoComplete="off" />
                        <InputGroup.Append>
                            <InputGroup.Text>
                                <div type="submit" className="deleteIcon" onClick={searchPost}>
                                    <img className="searchIcon" src={searchIcon} width="20"></img>
                                </div>
                            </InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
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

                <div className="forumContent">
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
                                        <h3 className="forumBody forumPost">
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
                                                    {cmnt = allpost.commentcount,
                                                        displayComment.map((comment, idx) => comment.postid == allpost.postid ?
                                                            <Form.Group className="onecomment">
                                                                <Form.Label className="commentAuthor">{comment.username}
                                                                    <h2 className="forumTimeAndAuthor">Posted on {moment(allpost.posteddate).format('DD-MM-YYYY')}</h2>
                                                                </Form.Label>
                                                                <InputGroup>
                                                                    <Form.Control id="otherusercomment" type="text" readOnly="true" defaultValue={comment.comment} />
                                                                    <InputGroup.Append style={comment.userid == uid ? { display: 'inline-block' } : { display: 'none' }}>
                                                                        <InputGroup.Text>
                                                                            <div type="submit" className="deleteIcon" onClick={() => deleteComment(comment.commentid, idx, cmnt--, allpost.postid, index)} style={comment.userid == uid ? { display: 'inline-block' } : { display: 'none' }}>
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

export default AllPosts;