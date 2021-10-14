import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Salah.css'

const Salah = () => {

    const [displaySalahTime, setdisplaySalahTime] = useState([]);

    useEffect(() => {
        // if does not work then turn off your browser ad blocker :)
        fetch("http://ip-api.com/json")
            .then(res => res.json())
            .then(
                (result) => {
                    const link = "https://api.pray.zone/v2/times/today.json?ip=".concat(result.query);
                    return fetch(link)
                }
             ).then(res => res.json())
            .then(
                (result) => {
                    setdisplaySalahTime(result.results.datetime);
                });
        }, []);

    return (
            <div >
                <header  className="salahHeader">
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
            <div className="salahdiv">
                <div className="salahtable">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Favourite</th>
                                <th scope="col">Salah</th>
                                <th scope="col">Time</th>
                                <th scope="col">Done</th>
                            </tr>
                        </thead>
                        <tbody>{
                        displaySalahTime.map(Salah =>
                            <tr>
                                <td>
                                    <div class="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>
                                <td>Fajr</td>
                                <td>{Salah.times.Fajr}</td>
                                <td>
                                <div className="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {
                        displaySalahTime.map(Salah =>
                            <tr>
                            <td>
                                    <div class="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>
                                <td>Dhuhr</td>
                                <td>{Salah.times.Dhuhr}</td>
                                <td>
                                <div className="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {
                        displaySalahTime.map(Salah =>
                            <tr>
                            <td>
                                    <div class="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>
                                <td>Asr</td>
                                <td>{Salah.times.Asr}</td>
                                <td>
                                <div className="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>

                            </tr>
                        )}
                        {
                        displaySalahTime.map(Salah =>
                            <tr>
                            <td>
                                    <div class="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>
                                <td>Maghrib</td>
                                <td>{Salah.times.Maghrib}</td>
                                <td>
                                <div className="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>

                            </tr>
                        )}
                        {
                        displaySalahTime.map(Salah =>
                            <tr>
                            <td>
                                    <div class="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>
                                <td>Isha</td>
                                <td>{Salah.times.Isha}</td>
                                <td>
                                <div className="form-check d-flex justify-content-center">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </td>

                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Salah;