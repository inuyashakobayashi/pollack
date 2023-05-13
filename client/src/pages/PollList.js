import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = () => {
    axios.get('http://localhost:8080/poll/lack/pollList')
      .then(response => {
        setPolls(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error retrieving the poll data!', error);
      });
  }

  const deletePoll = (token) => {
    axios.delete(`http://localhost:8080/poll/lack/${token}`)
      .then(response => {
        fetchPolls();  // Refresh the polls after a successful delete
      })
      .catch(error => {
        console.error('There was an error deleting the poll!', error);
      });
  }

  const findToken = (tokens, link) => {
    const token = tokens.find(token => token.link === link);
    return token ? token.value : null;
  }

  return (
    <Container>
      <h1 className="text-center my-3">existing poll list</h1>
      <Row>
        {polls.map((pollItem, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card>
              <Card.Header as="h5">{pollItem.poll.body.title}</Card.Header>
              <Card.Body>
                <Card.Title>{pollItem.poll.body.description}</Card.Title>
                {pollItem.poll.body.options.map((option, i) => (
                  <Card.Text key={i}>{option.text}</Card.Text>
                ))}
                <Card.Text><strong>Deadline:</strong> {new Date(pollItem.poll.body.setting.deadline).toLocaleString()}</Card.Text>
                {/* <Button variant="primary" href={`/poll/${pollItem.poll.tokens[1].value}`}>Go to Poll</Button>
                <Button variant="secondary" className="ml-2" href={`/poll-update/${pollItem.poll.tokens[1].value}/${pollItem.poll.tokens[0].value}`}>Update Poll</Button>
                <Button variant="danger" className="ml-2" onClick={() => deletePoll(pollItem.poll.tokens[2].value)}>Delete Poll</Button> */}
                 <Button variant="primary" href={`/poll/${findToken(pollItem.poll.tokens, 'share')}`}>Go to Poll</Button>
                <Button variant="secondary" className="ml-2" href={`/poll-update/${findToken(pollItem.poll.tokens, 'admin')}/${findToken(pollItem.poll.tokens, 'share')}`}>Update Poll</Button>
                <Button variant="danger" className="ml-2" onClick={() => deletePoll(findToken(pollItem.poll.tokens, 'admin'))}>Delete Poll</Button>
            
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default PollList;
