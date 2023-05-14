// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Card, ListGroup } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';

// function PollDetail() {
//   const [poll, setPoll] = useState(null);
//   const { token } = useParams();  // Get the share token from the URL

//   useEffect(() => {
//     // Fetch the poll data when the component mounts
//     axios.get(`http://localhost:8080/poll/lack/${token}`)
//       .then(response => {
//         setPoll(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error retrieving the poll data!', error);
//       });
//   }, [token]);

//   if (!poll) {
//     return <div>Loading...</div>;  // Show a loading message while the poll data is being fetched
//   }

//   return (
//     <Container>
//       <h1 className="text-center my-3">{poll.poll.body.title}</h1>
//       <p>{poll.poll.body.description}</p>
//       <Card>
//         <Card.Header>Options</Card.Header>
//         <ListGroup variant="flush">
//           {poll.options.map((option, index) => (
//             <ListGroup.Item key={index}>
//               {option.text} - Votes: {option.voted.length}
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </Card>
//     </Container>
//   );
// }

// export default PollDetail;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function PollDetail() {
  const [poll, setPoll] = useState(null);
  const { token } = useParams();  // Get the share token from the URL

  useEffect(() => {
    // Fetch the poll data when the component mounts
    axios.get(`http://localhost:8080/poll/lack/${token}`)
      .then(response => {
        setPoll(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the poll data!', error);
      });
  }, [token]);

  if (!poll) {
    return <div>Loading...</div>;  // Show a loading message while the poll data is being fetched
  }

  return (
    <Container>
      <h1 className="text-center my-3">{poll.poll.body.title}</h1>
      <p>{poll.poll.body.description}</p>
      <Card>
        <Card.Header>Options</Card.Header>
        <ListGroup variant="flush">
          {poll.options.map((option, index) => (
            <ListGroup.Item key={index}>
              {option.text} - Votes: {option.voted.length}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card className="mt-4">
        <Card.Header>Poll Settings</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Voices: {poll.poll.body.setting.voices}
          </ListGroup.Item>
          <ListGroup.Item>
            Worst: {poll.poll.body.setting.worst ? 'True' : 'False'}
          </ListGroup.Item>
          <ListGroup.Item>
            Deadline: {new Date(poll.poll.body.setting.deadline).toLocaleString()}
          </ListGroup.Item>
          <ListGroup.Item>
            Fixed: {poll.poll.body.fixed.join(', ')}
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Card className="mt-4">
        <Card.Header>Share Token</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Link: {poll.poll.share.link}
          </ListGroup.Item>
          <ListGroup.Item>
            Value: {poll.poll.share.value}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default PollDetail;
