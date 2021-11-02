import React, { useRef, useState } from "react"
import { InputGroup, Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import "./UpdateProfile.css"
import { Link, useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons"
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeclose = <FontAwesomeIcon icon={faEyeSlash} />;

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [passwordShown, setPasswordShown] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
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

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <>
      <Card className="emotionBox2">
        <Card.Body>
          <h1 className="text-center mb-4">Update Profile</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className="pass-wrapper" type={passwordShown ? "text" : "password"} ref={passwordRef} placeholder="Leave blank to keep the same" />
              <InputGroup.Append>
                <InputGroup.Text>
                  <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eyeclose}</i>
                </InputGroup.Text>
              </InputGroup.Append>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password</Form.Label>
              <Form.Control className="pass-wrapper" type={passwordShown ? "text" : "password"} ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
              <InputGroup.Append>
                <InputGroup.Text>
                  <i onClick={togglePasswordVisiblity}>{passwordShown ? eye : eyeclose}</i>
                </InputGroup.Text>
              </InputGroup.Append>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
          </div>
        </Card.Body>
      </Card>

    </>
  )
}
