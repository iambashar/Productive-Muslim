import React, {useState} from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg';
import './Dua.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Recommendation from './recommendation/Recommendation';
import Favourites from './favourites/Favourites';
import Emotion from './emotion/Emotion';
import { useHistory } from "react-router";
import { useAuth } from "../../components/Authentication/AuthContext";

const Dua = () => {
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
            <div >
                <header class="headerDiv">
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
                                    <Nav.Link className="active" href="#">Dua</Nav.Link>
                                    <Nav.Link href="../../pages/Salah">Salah</Nav.Link>
                                    <Nav.Link href="../../pages/Sawm">Sawm</Nav.Link>
                                    <Nav.Link href="../../pages/Tracker">Tracker</Nav.Link>
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
                    <Route path="/pages/Dua/recommendation">
                        <Recommendation></Recommendation>
                    </Route>
                    <Route path="/pages/Dua/favourites">
                        <Favourites></Favourites>
                    </Route>
                    <Route path="/">
                        <Emotion></Emotion>
                    </Route>

                </Switch>
            </div>
        </Router>

    );
};

export default Dua;