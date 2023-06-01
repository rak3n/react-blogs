import React, { useState } from 'react';
import { Form, Button, Alert, Card, Container } from 'react-bootstrap';
import axios from 'axios';

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !newPassword || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Server request to update password using json-server
    try {
      const response = await axios({
        url: `http://localhost:5000/users?email=${email}`,
        method: 'GET'
      });
      const { data } = response;
      console.log(data);

      if (data.length === 0) {
        setErrorMessage('Email not found.');
        return;
      }

      const user = data[0];
      const updatedUser = { ...user, password: newPassword };

      await axios({
        url: `http://localhost:5000/users/${user.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(updatedUser),
      });

      if (errorMessage) setErrorMessage('');
      setSuccessMessage('Password updated successfully.');
    } catch (error) {
      setErrorMessage('An error occurred while updating the password.');
    }
  };

  const resetMessages = () => {
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center">Forgot Password?</h2>

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit} onChange={resetMessages}>
            <Form.Group controlId="email" className="mt-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="newPassword" className="mt-2">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mt-2"> 
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Container className="mt-2 d-flex justify-content-center">
              <Button variant="primary" type="submit" block onClick={resetMessages}>
                Submit
              </Button>
            </Container>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ForgetPasswordForm;