import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

function EnterToken() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/addVote/${token}`);
  };

  return (
    <Form onSubmit={handleSubmit} inline>
        <Form.Label htmlFor="token" srOnly>
         Vote: Give your share token
        </Form.Label>
        <Form.Control
          type="text"
          id="token"
          placeholder="Enter token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mr-2"
        /><br/>
        <Button type="submit">New Vote</Button>
      </Form> 
  );
}

export default EnterToken;
