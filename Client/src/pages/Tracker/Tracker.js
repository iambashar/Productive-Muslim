import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Tracker.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Myday from './myday/Myday';
import Planned from './planned/Planned';
import Listofuser from './listofuser/Listofuser'

const Tracker = () => {
    return (
        <Router> 
        <div>
            <header className="trackerHeader">
                <Navbar collapseOnSelect expand="lg" variant="dark">
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
                                <Nav.Link href="../../pages/Dua">Dua</Nav.Link>
                                <Nav.Link href="../../pages/Salah">Salah</Nav.Link>
                                <Nav.Link href="../../pages/Sawm">Sawm</Nav.Link>
                                <Nav.Link className="active" href="#">Tracker</Nav.Link>
                                <Nav.Link href="../../pages/Challenges">Challenges</Nav.Link>
                                <Nav.Link href="../../pages/Forum">Forum</Nav.Link>
                            </Nav>
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