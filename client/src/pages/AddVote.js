import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function AddVote() {
  const { token } = useParams();
  const [ownerName, setOwnerName] = useState('');
  const [poll, setPoll] = useState(null);
  const [choices, setChoices] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/poll/lack/${token}`);
        setPoll(res.data);
        console.log(poll)
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoll();
  }, [token]);

  const handleChoiceChange = (id, worst) => {
    const newChoices = choices.map((choice) => {
      if (choice.id === id) {
        return { ...choice, worst };
      }
      return choice;
    });
    setChoices(newChoices);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const voteData = {
      owner: {
        name: ownerName,
      },
      choice: choices,
    };

    try {
      const res = await axios.post(`http://localhost:8080/vote/lack/${token}`, voteData);
      setResponse(res.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Vote</h2>
      {poll ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="ownerName">
            <Form.Label>Owner Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </Form.Group>
          {
            <div>
            <p>{poll.poll.body.title}</p>
            <p>{poll.poll.body.description}</p>
            </div>
          }

          {
          
          poll.options.map((option) => (
            <Form.Group key={option.id}>
              
              <Form.Check
                type="checkbox"
                label={option.text}
                onChange={(e) => handleChoiceChange(option.id, e.target.checked)}
              />
            </Form.Group>
          ))
          
          
          }

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <p>Loading poll data...</p>
      )}
      {response && (
        <Alert variant="success" className="mt-4">
          Vote submitted successfully. Edit link: {response.edit.link}
        </Alert>
      )}
    </div>
  );

      }

export default AddVote;
