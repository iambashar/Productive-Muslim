import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'

const Salah = () => {
    return (
        <div>
            <header>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                                <Nav.Link className="active" href="#">Salah</Nav.Link>
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
    );
};

export default Salah;