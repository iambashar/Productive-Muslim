import React, { useEffect, useRef, useState } from "react"
import { Dropdown, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import "./UpdateProfile.css"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const nameRef = useRef()
  const madhabRef = useRef()
  const countryRef = useRef()
  const cityRef = useRef()
  const { currentUser } = useAuth()
  const [user, setUser] = useState()
  const [name, setName] = useState()
  const [madhab, setmadhab] = useState()
  const [country, setcountry] = useState()
  const [city, setcity] = useState()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    var link = "/userprofile/".concat(currentUser.uid);
    fetch(link)
      .then(res => res.json())
      .then(
        (result) => {
          setUser(result.data.user);
          setName(result.data.user.name);
          setmadhab(result.data.user.madhab);
          setcountry(result.data.user.country);
          setcity(result.data.user.city);
        }
      );
  }, []);

  function handleSubmit(e) {
    e.preventDefault()

    const promises = []
    setLoading(true)
    setError("")

    if (user.name != nameRef.current.value || user.madhab != madhabRef.current.value ||
      user.country != countryRef.current.value || user.city != cityRef.current.value) {
      var uid = currentUser.uid;
      var name = nameRef.current.value;
      var email = currentUser.email;
      var madhab = document.getElementById("madhabbox").innerHTML;
      var country = countryRef.current.value;
      var city = cityRef.current.value;
      promises.push(
        fetch('/updateuser/'.concat(uid), {
          method: 'POST',
          body: JSON.stringify({ name, email, madhab, country, city }),
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
      {currentUser.displayName == null ?
        <>
          <div className="annonimousdiv"><h1 className="annonimousalingment">Please login with an account to see the posts!<br />
            <br />Jazakumullah Khair</h1> </div>
          <div className="btng" id="cancelbtn">
            <Button className="w-100" id="btn" onClick={() => history.push("/")}>
              Cancel
            </Button>
          </div>
        </> :
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
                  defaultValue={name}
                />
              </Form.Group>
              <Form.Group id="name">
                <Form.Label>Madhab</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle className="searchButton2" id="madhabbox" variant="secondary">
                    {madhab}
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
                  defaultValue={country}
                />
              </Form.Group>
              <Form.Group id="name">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  ref={cityRef}
                  required
                  defaultValue={city}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" id="btn" type="submit">
                Update
              </Button>
            </Form>

            <div className="w-100 text-center link mt-2">
              <Link to="/">Cancel</Link>
            </div>
          </Card.Body>
        </Card>
      };
    </>
  )
}
