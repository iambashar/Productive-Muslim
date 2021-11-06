import React, { useEffect, useRef, useState } from "react"
import { InputGroup, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons"
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeclose = <FontAwesomeIcon icon={faEyeSlash} />;

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, signInWithGoogle } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [userdata, setUser] = useState([])
  const [passwordShown, setPasswordShown] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  async function googleSingin(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      const res = await signInWithGoogle();
      const user = res.user;
      var link = "http://127.0.0.1:3000/userprofile/".concat(user.uid);
      await fetch(link)
        .then(res => res.json())
        .then(
          (result) => {
            setUser(result.data.user);
          }
        );
      if (userdata.length == 0){
        var uid = user.uid;
        var name = user.displayName;
        var email = user.email;
        var madhab = 'Hanafi';
        var country = 'Bangladesh';
        var city = 'Dhaka';
        fetch('http://localhost:3000/adduser', {
            method: 'POST',
            body: JSON.stringify({ uid, name, email, madhab, country, city }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
      }
      history.push("/")
    } catch {
      setError("Failed to log in with Google Account")
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
          <h1 className="text-center mb-4">Want to be a Productive Muslim?</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" class="email1" ref={emailRef} required />
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
            <Button disabled={loading} className="w-100" id="btn" type="submit">
              Log In
            </Button>
          </Form>
          <div className="btng">
            <Button disabled={loading} className="w-100" id="btn" onClick={googleSingin}>
              Sign in With Google
            </Button>
          </div>
          <div className="w-100 text-center mt-3">
            <Link className="link" to="/reset">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link className="link" to="/register">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
