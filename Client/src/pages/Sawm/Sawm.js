import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Modal, Button, Form } from 'react-bootstrap';
import textIcon from '../../Images/textIcon.svg'
import mainIcon from '../../Images/mainIcon.svg'
import userimg from '../../Images/user.png'
import './Sawm.css'
//import 'react-calendar/dist/Calendar.css';
import { BrowserRouter as Router, } from "react-router-dom";
import { useHistory } from "react-router";
import { useAuth } from "../../components/Authentication/AuthContext";
import Calendar from "react-calendar";
import moment from 'moment';
import firebase from 'firebase/compat';

const Sawm = () => {
    const [uid, setUid] = useState();
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [displayUpcomingSawmDates, setDisplayUpcomingSawmDates] = useState([]);
    var gSawmDates2 = new Set([]);
    useEffect(() => {
        if (firebase.auth().currentUser !== null) {
            setUid(firebase.auth().currentUser.uid);
        }
        console.log(uid);
    }, [uid]);

    useEffect(() => {
        var link = "http://127.0.0.1:3000/showupcomingsawmdates/";
        link = link.concat(uid);
        fetch(link)
            .then(res => res.json())
            .then(
                (result) => {
                    setDisplayUpcomingSawmDates(result.data.dates);
                    console.log(result.data.dates);
                    //gSawmDates2 = result.data.dates.sawmdates;
                }
            )
    }
    )

    const handleClose = () => setShow(false);
    const handleShow = (date) => {
        setShow(true);
        //setDate(date);
    }

    const onChange = date => {
        setDate(date);
        //handleShow();
    }
    
    

    const days = [1, 4];
    var gSawmDates = ['22-08-2021', '23-08-2021', '24-08-2021', '21-09-2021', '22-09-2021', '23-09-2021', '20-10-2021', '21-10-2021',
     '22-10-2021', '19-11-2021', '20-11-2021', '21-11-2021', '18-12-2021', '19-12-2021', '20-12-2021', '17-01-2022', '18-01-2022', '19-01-2022',
      '15-02-2022', '16-02-2022', '17-02-2022', '17-03-2022', '18-03-2022', '19-03-2022', '15-04-2022', '16-04-2022', '17-04-2022', '15-05-2022',
       '16-05-2022', '17-05-2022', '13-06-2022', '14-06-2022', '15-06-2022', '13-07-2022', '14-07-2022', '15-07-2022', '03-05-2022', '04-05-2022',
        '05-05-2022', '06-05-2022', '07-05-2022', '08-05-2022', '11-05-2022', '19-08-2021', '08-08-2022', '03-04-2022', '04-04-2022', '05-04-2022',
         '06-04-2022', '07-04-2022', '08-04-2022', '09-04-2022', '10-04-2022', '11-04-2022', '12-04-2022', '13-04-2022', '14-04-2022', '15-04-2022',
          '16-04-2022', '17-04-2022', '18-04-2022', '19-04-2022', '20-04-2022', '21-04-2022', '22-04-2022', '23-04-2022', '24-04-2022', '25-04-2022',
           '26-04-2022', '27-04-2022', '28-04-2022', '29-04-2022', '30-04-2022', '01-05-2022', '02-05-2022'];
    
    
    
    const addSawmOath = () => {
        console.log(date);
        var val = date.getDate().toString().padStart(2,'0') + "-" + (date.getMonth()+1).toString().padStart(2,'0') + "-" + date.getFullYear();
        console.log(val);
        gSawmDates.push(val);
        console.log(gSawmDates.slice(-1)[0]);
        var sawmReason = document.getElementById("reasonInput").value;
        var sawmDate = document.getElementById("dateInput").value;
        console.log(sawmReason, sawmDate);
        fetch('http://localhost:3000/addsawmoath', {
            method: 'POST',
            body: JSON.stringify({ 
                uid, 
                sawmDate, 
                sawmReason 
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(
            console.log(sawmReason, sawmDate)
        );
        
    }

    const retUpcomingDates = () => {
        var startDate = new Date();
        var daysToAdd = 15;
        var upcomingDates1 = [];
        for(var i=0; i<= daysToAdd; i++){
            var currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            var val = currentDate.getDate().toString().padStart(2,'0') + "-" + (currentDate.getMonth()+1).toString().padStart(2,'0') + "-" + currentDate.getFullYear();
            if(gSawmDates.find(x=>x===val) || gSawmDates2.has(x=>x===val)){
                var val2 = val;
                var temp = val2.charAt(0);
                val2 = val2.split('');
                val2[0] = val[3];
                val2[3] = temp;
                temp = val2[1];
                val2[1] = val2[4];
                val2[4] = temp;
                val2 = val2.join('');
                var nDate = new Date(val2);
                //console.log(val);
                upcomingDates1.push(<div>{val} - Ayyam al-Beed - ایّام البیض‎ (The White Days)</div>);
            }
            else if(days.find(x=>x===currentDate.getDay())){
                var val = currentDate.getDate().toString().padStart(2,'0') + "-" + (currentDate.getMonth()+1).toString().padStart(2,'0') + "-" + currentDate.getFullYear();
                upcomingDates1.push(<div>{val} - Sunnah</div>);
            }
        }
        return upcomingDates1;
    }

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
                                <Nav.Link href="../../pages/Dua">Dua</Nav.Link>
                                <Nav.Link href="../../pages/Salah">Salah</Nav.Link>
                                <Nav.Link className="active" href="#">Sawm</Nav.Link>
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
            <div className="rightDiv">
                    <div className="emotionBox">
                        <div id="inner">
                        <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Make an Oath for Fasting</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form.Group >
                                    <Form.Label>Date: </Form.Label>
                                    <Form.Control type="text" readOnly id="dateInput" value={moment(date).format("YYYY-MM-DD")}/>   
                                    <Form.Label>Reason: </Form.Label>
                                    <Form.Control type="text" id="reasonInput" placeholder="Enter reason here..."/>           
                                </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={addSawmOath}>Save</Button>
                                </Modal.Footer>
                            </Modal>
                            <Calendar
                            calendarType="Arabic" 
                            onChange={onChange} 
                            value={date}
                            onClickDay={handleShow} 
                            tileClassName={({date}) => {
                                if(days.find(x=>x===moment(date).day()) || gSawmDates.find(x=>x===moment(date).format("DD-MM-YYYY")) || gSawmDates2.has(x=>x===moment(date).format("DD-MM-YYYY"))){
                                    return 'highlight'
                                }
                            }}
                            //tileDisabled={({ date }) => date.getDay() === 0}
                             />
                        </div>
                        <div>
                            <h1>Upcoming Dates for Fasting (next 14 days)</h1>
                            {/* <h3>{moment(date).format("DD-MM-YYYY")} - {date.toString()}</h3> */}
                            <h3>
                            {
                             retUpcomingDates()
                            }
                            </h3>
                            {
                                displayUpcomingSawmDates.map((mysawm) =>
                                    //{gSawmDates2.add(moment(mysawm.sawmdate).format('DD-MM-YYYY').toString());},
                                    <h3>{moment(mysawm.sawmdate).format('DD-MM-YYYY')} - {mysawm.sawmreason}</h3>
                                )
                            }
                        </div>
                </div>
            </div>
        </div>
    </Router>
    );
};

export default Sawm;
