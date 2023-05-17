import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import '../css/style.css'

function Home() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="text-center" style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title className="mb-4"><h1>Welcome Home!</h1></Card.Title>
          <Card.Text>
            Participate in our community polls or cast your vote in an existing one.
          </Card.Text>
          <Link to="/poll">
            <Button variant="primary" className="m-2">
              Poll
            </Button>
          </Link>
          <Link to="/vote">
            <Button variant="success" className="m-2">
              Vote in a Poll
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;
