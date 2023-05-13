import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PollList from './PollList';

function Poll() {
  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Header as="h2">Everything about Poll</Card.Header>
        <Card.Body>
          <Link to='/addPoll'>
            <Button variant="primary" size="lg">Create New Poll</Button>
          </Link>
          <hr/>
          <Container className="mt-4">
            <PollList />
          </Container>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Poll;
