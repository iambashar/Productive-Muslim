import React, {useState} from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg';
import mainIcon from '../../Images/mainIcon.svg';
import './Tracker.css';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import Myday from './myday/Myday';
import Planned from './planned/Planned';
import Listofuser from './listofuser/Listofuser';
import { useHistory } from "react-router";
import { useAuth } from "../../components/Authentication/AuthContext";

const Tracker = () => {
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
        <Router> 
        <div>
        <header class="trackerHeader">
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
                                    <Nav.Link className="active" href="#">Tracker</Nav.Link>
                                    <Nav.Link href="../../pages/Challenges">Challenges</Nav.Link>
                                    <Nav.Link href="../../pages/Forum">Forum</Nav.Link>
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
                <Switch>
                    <Route path="/pages/Tracker/myday">
                        <Myday></Myday>
                    </Route>
                    <Route path="/pages/Tracker/planned">
                        <Planned></Planned>
                    </Route>
                    <Route path="/pages/Tracker/listofuser">
                        <Listofuser></Listofuser>
                    </Route>
                    <Route path="/">
                        <Myday></Myday>
                    </Route>

                </Switch>
            </div>
        </Router>
    );
};

export default Tracker;