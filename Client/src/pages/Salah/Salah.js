import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import './Salah.css'
import { useHistory } from "react-router";
import { useAuth } from "../../components/Authentication/AuthContext";

const Salah = (props) => {

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

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    console.log(displaySalahTime);

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
        <div >
            <header class="salahHeader">
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
                                    <Nav.Link className="active" href="#">Salah</Nav.Link>
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
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </div>
                                    </td>
                                    <td>Fajr</td>
                                    <td>{Salah.times.Fajr}</td>
                                    <td>
                                        <div className="form-check d-flex justify-content-center">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {
                                displaySalahTime.map(Salah =>
                                    <tr>
                                        <td>
                                            <div class="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td>
                                        <td>Dhuhr</td>
                                        <td>{Salah.times.Dhuhr}</td>
                                        <td>
                                            <div className="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            {
                                displaySalahTime.map(Salah =>
                                    <tr>
                                        <td>
                                            <div class="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td>
                                        <td>Asr</td>
                                        <td>{Salah.times.Asr}</td>
                                        <td>
                                            <div className="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td>

                                    </tr>
                                )}
                            {
                                displaySalahTime.map(Salah =>
                                    <tr>
                                        <td>
                                            <div class="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td>
                                        <td>Maghrib</td>
                                        <td>{Salah.times.Maghrib}</td>
                                        <td>
                                            <div className="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td>

                                    </tr>
                                )}
                            {
                                displaySalahTime.map(Salah =>
                                    <tr>
                                        <td>
                                            <div class="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </td>
                                        <td>Isha</td>
                                        <td>{Salah.times.Isha}</td>
                                        <td>
                                            <div className="form-check d-flex justify-content-center">
                                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
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