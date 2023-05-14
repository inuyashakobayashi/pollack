// import React from 'react'
// import EnterToken from '../components/EnterToken';
// function Vote() {
//   return (
//     <div>Everything about Vote

//         <br/>
//         <EnterToken/>
//     </div>
//   )
// }

// export default Vote
import React from 'react'
import EnterToken from '../components/EnterToken';
import { Container, Row, Col } from 'react-bootstrap';

function Vote() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2 className="text-center my-4">Everything about Vote</h2>
          <EnterToken/>
        </Col>
      </Row>
    </Container>
  )
}

export default Vote;
