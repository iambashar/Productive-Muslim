import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Forum.css'
import { useHistory, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import userimg from '../../Images/user.png';
import { useAuth } from "../../components/Authentication/AuthContext";
import MyPosts from './MyPosts/MyPosts';
import AllPosts from './AllPosts/AllPosts';

const Forum = () => {

    const { logout, currentUser } = useAuth();
    const history = useHistory();
    const [error, setError] = useState("");

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    };

    return (
        <Router>
            <div>
                <header class="forumHeader">
                    <Navbar collapseOnSelect expand="lg" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">
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
                {currentUser.displayName == null ? <div className="annonimousdiv"><h1 className="annonimousalingment">Please login with an account to see the posts!<br/><br/>Jazakumullah Khair</h1> </div> :

                    <Switch>
                        <Route path="/pages/forum/myposts">
                            <MyPosts></MyPosts>
                        </Route>
                        <Route path="/">
                            <AllPosts></AllPosts>
                        </Route>
                    </Switch>
                }
            </div>
        </Router >
    );
};

export default Forum;
