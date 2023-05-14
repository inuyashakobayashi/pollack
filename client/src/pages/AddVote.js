// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Form, Button, Alert } from 'react-bootstrap';

// function AddVote() {
//   const { token } = useParams();
//   const [ownerName, setOwnerName] = useState('');
//   const [poll, setPoll] = useState(null);
//   const [choices, setChoices] = useState([]);
//   const [response, setResponse] = useState(null);

//   useEffect(() => {
//     const fetchPoll = async () => {
//       try {
//         const res = await axios.get(`http://localhost:8080/poll/lack/${token}`);
//         setPoll(res.data);
//         setChoices(res.data.options)
//         console.log(res.data)
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchPoll();
//   }, [token]);

//   const handleChoiceChange = (id, isSelected) => {
//     const newChoices = choices.map((choice) => {
//       if (choice.id === id) {
//         return { ...choice, isSelected };
//       }
//       return choice;
//     });
//     setChoices(newChoices);
//     console.log(newChoices)
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Filter out unselected choices
//     const selectedChoices = choices.filter(choice => choice.isSelected);
  
//     const voteData = {
//       owner: {
//         name: ownerName,
//       },
//       // Include only selected choices in the data sent to the server
//       choice: selectedChoices.map(({id, isSelected}) => ({id, worst: isSelected})),
//     };
//     console.log(voteData)

//     try {
//       const res = await axios.post(`http://localhost:8080/vote/lack/${token}`, voteData);
//       setResponse(res.data);
      
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Vote</h2>
//       {poll ? (
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="ownerName">
//             <Form.Label>Owner Name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter your name"
//               value={ownerName}
//               onChange={(e) => setOwnerName(e.target.value)}
//             />
//           </Form.Group>
//           {
//             <div>
//             <p>{poll.poll.body.title}</p>
//             <p>{poll.poll.body.description}</p>
//             </div>
//           }

//           {
          
//           poll.options.map((option) => (
//             <Form.Group key={option.id}>
              
//               <Form.Check
//                 type="checkbox"
//                 label={option.text}
//                 onChange={(e) => handleChoiceChange(option.id, e.target.checked)}
//               />
//             </Form.Group>
//           ))
          
          
//           }

//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       ) : (
//         <p>Loading poll data...</p>
//       )}
//       {response && (
//         <Alert variant="success" className="mt-4">
//           Vote submitted successfully. Edit link: {response.edit.link}
//         </Alert>
//       )}
//     </div>
//   );

//       }

// export default AddVote;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, Alert, Card, Container, Col, Row } from 'react-bootstrap';

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
        setChoices(res.data.options)
        console.log(res.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchPoll();
  }, [token]);

  const handleChoiceChange = (id, isSelected) => {
    const newChoices = choices.map((choice) => {
      if (choice.id === id) {
        return { ...choice, isSelected };
      }
      return choice;
    });
    setChoices(newChoices);
    console.log(newChoices)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Filter out unselected choices
    const selectedChoices = choices.filter(choice => choice.isSelected);
  
    const voteData = {
      owner: {
        name: ownerName,
      },
      // Include only selected choices in the data sent to the server
      choice: selectedChoices.map(({id, isSelected}) => ({id, worst: isSelected})),
    };
    console.log(voteData)

    try {
      const res = await axios.post(`http://localhost:8080/vote/lack/${token}`, voteData);
      setResponse(res.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Col lg={6}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title className="text-center mb-4">Add Vote</Card.Title>
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
                <Card.Text>
                  <strong>{poll.poll.body.title}</strong>
                  <p>{poll.poll.body.description}</p>
                </Card.Text>
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
                <Button variant="primary" type="submit" block>
                  Submit
                </Button>
              </Form>
            ) : (
              <p>Loading poll data...</p>
            )}
          </Card.Body>
        </Card>
        {response && (
          <Alert variant="success">
            Vote submitted successfully. Edit link: {response.edit.link}
          </Alert>
        )}
      </Col>
    </Container>
  );
}

export default AddVote;
