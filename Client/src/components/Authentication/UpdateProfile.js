import React, { useEffect, useRef, useState } from "react"
import { InputGroup, Dropdown, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import userimg from '../../Images/user.png'
import "./UpdateProfile.css"
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import firebase from 'firebase/compat';
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeclose = <FontAwesomeIcon icon={faEyeSlash} />;

export default function UpdateProfile() {
  const nameRef = useRef()
  const madhabRef = useRef()
  const countryRef = useRef()
  const cityRef = useRef()
  const { currentUser } = useAuth()
  const [user, setUser] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    var link = "http://127.0.0.1:3000/userprofile/".concat(currentUser.uid);
    fetch(link)
      .then(res => res.json())
      .then(
        (result) => {
          setUser(result.data.user);
        }
      );
  }, []);

  function handleSubmit(e) {
    e.preventDefault()

    const promises = []
    setLoading(true)
    setError("")

    if (user.name != nameRef || user.madhab != madhabRef ||
      user.country != countryRef || user.city != cityRef) {
      var uid = currentUser.uid;
      var name = nameRef.current.value;
      var email = currentUser.email;
      var madhab = document.getElementById("madhabbox").innerHTML;
      var country = countryRef.current.value;
      var city = cityRef.current.value;
      promises.push(
        fetch('http://127.0.0.1:3000/updateuser/'.concat(uid), {
          method: 'POST',
          body: JSON.stringify({ uid, name, email, madhab, country, city }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
      )
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const setMadhabValue = (selectedMadhab) => {
    document.getElementById("madhabbox").innerHTML = selectedMadhab.target.outerText;
  }

  return (
    <>
      {
        user.map((user) =>
          <Card className="emotionBox2">
            <Card.Body>
              <h1 className="text-center mb-4">Update Profile</h1>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    required
                    defaultValue={user.name}
                  />
                </Form.Group>
                <Form.Group id="name">
                  <Form.Label>Madhab</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle className="searchButton2" id="madhabbox" variant="secondary">
                      {user.madhab}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="searchMenu" >
                      <Dropdown.Item onClick={setMadhabValue} id="searchItem">Hanafi</Dropdown.Item>
                      <Dropdown.Item onClick={setMadhabValue} id="searchItem">Maliki</Dropdown.Item>
                      <Dropdown.Item onClick={setMadhabValue} id="searchItem">Shafi</Dropdown.Item>
                      <Dropdown.Item onClick={setMadhabValue} id="searchItem">Hanbali</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                </Form.Group>
                <Form.Group id="name">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    ref={countryRef}
                    required
                    defaultValue={user.country}
                  />
                </Form.Group>
                <Form.Group id="name">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    ref={cityRef}
                    required
                    defaultValue={user.city}
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" id="btn" type="submit">
                  Update
                </Button>
              </Form>
              <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
              </div>
            </Card.Body>
          </Card>
        )
      };
    </>
  )
}
