import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import emotionIcon from '../../Images/emotionActive.svg'
import recomIcon from '../../Images/recomInactive.svg'
import favIcon from '../../Images/favInactive.svg'
import './Dua.css'
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

const Dua = () => {
    return (
        <Router>
            <div>
                <header>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="#">
                                <img src={mainIcon} alt="logo" width="50" />
                                <img src={textIcon} alt="logo" width="200" />
                            </Navbar.Brand>
                        </Container>
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ms-auto">
                                    <Nav.Link href="../../pages/Homepage">Home</Nav.Link>
                                    <Nav.Link className="active" href="#">Dua</Nav.Link>
                                    <Nav.Link href="../../pages/Salah">Salah</Nav.Link>
                                    <Nav.Link href="../../pages/Sawm">Sawm</Nav.Link>
                                    <Nav.Link href="../../pages/Tracker">Tracker</Nav.Link>
                                    <Nav.Link href="../../pages/Challenges">Challenges</Nav.Link>
                                    <Nav.Link href="../../pages/Forum">Forum</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </header>

            </div>

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

        </Router>


    );
};

export default Dua;