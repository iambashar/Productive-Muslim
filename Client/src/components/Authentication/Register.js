import React, { useRef, useState } from "react"
import { InputGroup, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./Register.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import firebase from 'firebase/compat';
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeclose = <FontAwesomeIcon icon={faEyeSlash} />;

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [passwordShown, setPasswordShown] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      if (firebase.auth().currentUser !== null) {
        const user = firebase.auth().currentUser;
        var uid = user.uid;
        var name = "";
        var email = user.email;
        var madhab = 'Hanafi';
        var country = 'Bangladesh';
        var city = 'Dhaka';
        fetch('/adduser', {
            method: 'POST',
            body: JSON.stringify({ uid, name, email, madhab, country, city }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
      }
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <Card className="emotionBox2">
        <Card.Body>
          <h1 className="text-center mb-4">Create an Account</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
              <Form.Control className="pass-wrapper" type={passwordShown ? "text" : "password"} ref={passwordRef} required />
              <InputGroup.Append>
                <InputGroup.Text>
                  <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eyeclose}</i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <InputGroup>
              <Form.Control className="pass-wrapper" type={passwordShown ? "text" : "password"} ref={passwordConfirmRef} required />
              <InputGroup.Append>
                <InputGroup.Text>
                  <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eyeclose}</i>
                </InputGroup.Text>
              </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <Button disabled={loading} className="w-100" id="btn" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
