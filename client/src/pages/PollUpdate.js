// import React, { useState, useEffect } from 'react';
// import { Button, Form, Col, Row, Container, Modal } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// function PollUpdate() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [options, setOptions] = useState([{ id: 1, text: '' }, { id: 2, text: '' }]);
//   const [setting, setSetting] = useState({
//     voices: 1,
//     worst: false,
//     deadline: new Date().toISOString()
//   });
//   const [fixed, setFixed] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [response, setResponse] = useState(null);
//   const navigate = useNavigate();
//   const { adminToken, shareToken } = useParams(); // Extracting tokens from URL parameters


//   useEffect(() => {
//     const fetchData = async () => {
      
//       try {
//         const response = await axios.get(`http://localhost:8080/poll/lack/${shareToken}`);
//         setTitle(response.data.poll.body.title);
//         setDescription(response.data.poll.body.description);
//         setOptions(response.data.poll.body.options);
//         setSetting(response.data.poll.body.setting);
//         setFixed(response.data.poll.body.fixed);
//         console.log(response.data.poll.body.options)
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [shareToken]);

//   const handleClose = () => {
//     setShowModal(false);
//     navigate('/');
//   };

//   const handleOptionChange = (index, value) => {
//     const updatedOptions = [...options];
//     updatedOptions[index].text = value;
//     setOptions(updatedOptions);
//   };

//   const addOption = () => {
//     setOptions([...options, { id: options.length + 1, text: '' }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const pollData = {
//       title,
//       description,
//       options,
//       setting,
//       fixed,
//     };

//     try {
//       const response = await axios.put(`http://localhost:8080/poll/lack/${adminToken}`, pollData);
//       setResponse({
//         code: response.data.code,
//         message: response.data.message,
//       });
//       setShowModal(true);

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Container>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="title">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter poll title"
//           />
//         </Form.Group>

//         <Form.Group controlId="description">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter poll description"
//           />
//         </Form.Group>

//         <Form.Group>
//           <Form.Label>Options</Form.Label>
//           {options.map((option, index) => (
//             <Form.Group key={option.id} controlId={`option${index}`}>
//               <Form.Label>Option {index + 1}</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder={`Option ${index + 1}`}
//                 value={option.text}
//                 onChange={(e) => handleOptionChange(index, e.target.value)}
//               />
//             </Form.Group>
//           ))}
//           <Button variant="secondary" onClick={addOption}>
//             Add Option
//           </Button>
//         </Form.Group>

//         <Row>
//           <Col>
//             <Form.Group controlId="voices">
//               <Form.Label>Voices</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={setting.voices}
//                 onChange={(e) => setSetting({ ...setting, voices: parseInt(e.target.value) })}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="worst">
//               <Form.Label>Worst</Form.Label>
//               <Form.Check
//                 type="checkbox"
//                 checked={setting.worst}
//                 onChange={(e) => setSetting({ ...setting, worst: e.target.checked })}
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="deadline">
//               <Form.Label>Deadline</Form.Label>
//               <Form.Control
//                 type="datetime-local"
//                 value={new Date(setting.deadline).toISOString().slice(0, 16)}
//                 onChange={(e) => setSetting({ ...setting, deadline: e.target.value })}
//               />
//             </Form.Group>
//           </Col>
//         </Row>

//         <Form.Group controlId="fixed">
//           <Form.Label>Fixed</Form.Label>
//           <Form.Control
//             type="text"
//             value={fixed}
//             onChange={(e) => setFixed(parseInt(e.target.value))}
//             placeholder="Enter fixed value"
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Update Poll
//         </Button>
//       </Form>

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Poll Updated</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {response && (
//             <>
//               <p>
//                 Message: <b>{response.message}</b>
//               </p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

// export default PollUpdate;


import React, { useState, useEffect } from 'react';
import { Button, Form, Col, Row, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function PollUpdate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState([{ id: 1, text: '' }, { id: 2, text: '' }]);
  const [setting, setSetting] = useState({
    voices: 1,
    worst: false,
    deadline: new Date().toISOString()
  });
  const [fixed, setFixed] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  const { adminToken, shareToken } = useParams(); // Extracting tokens from URL parameters

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/poll/lack/${shareToken}`);
        setTitle(response.data.poll.body.title);
        setDescription(response.data.poll.body.description);
        setOptions(response.data.poll.body.options);
        setSetting(response.data.poll.body.setting);
        setFixed(response.data.poll.body.fixed);
        console.log(response.data.poll.body.options)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [shareToken]);

  const handleClose = () => {
    setShowModal(false);
    navigate('/');
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, { id: options.length + 1, text: '' }]);
  };

  const handleFixedChange = (id, isChecked) => {
    if (isChecked) {
      setFixed([...fixed, id]);
    } else {
      setFixed(fixed.filter(item => item !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pollData = {
      title,
      description,
      options,
      setting,
      fixed,
    };

    try {
      const response = await axios.put(`http://localhost:8080/poll/lack/${adminToken}`, pollData);
      setResponse({
        code: response.data.code,
        message: response.data.message,
      });
      setShowModal(true);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter poll title"
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter poll description"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Options</Form.Label>
          {options.map((option, index) => (
            <Form.Group key={option.id} controlId={`option${index}`}>
              <Form.Label>Option {index + 1}</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </Form.Group>
          ))}
          <Button variant="secondary" onClick={addOption}>
            Add Option
          </Button>
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="voices">
              <Form.Label>Voices</Form.Label>
              <Form.Control
                type="number"
                value={setting.voices}
                onChange={(e) => setSetting({ ...setting, voices: parseInt(e.target.value) })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="worst">
              <Form.Label>Worst</Form.Label>
              <Form.Check
                type="checkbox"
                checked={setting.worst}
                onChange={(e) => setSetting({ ...setting, worst: e.target.checked })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="datetime-local"
                value={new Date(setting.deadline).toISOString().slice(0, 16)}
                onChange={(e) => setSetting({ ...setting, deadline: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="fixed">
          <Form.Label>Fixed</Form.Label>
          {setting.voices > 1 && options.map((option, index) => (
            <Form.Check
              key={option.id}
              type="checkbox"
              label={`Option ${index + 1}`}
              checked={fixed.includes(option.id)}
              onChange={(e) => handleFixedChange(option.id, e.target.checked)}
            />
          ))}
          {setting.voices === 1 && (
            <Form.Control
              as="select"
              value={fixed[0] || ''}
              onChange={(e) => setFixed([parseInt(e.target.value)])}
            >
              <option value=''>Select an option...</option>
              {options.map((option, index) => (
                <option key={option.id} value={option.id}>{`Option ${index + 1}`}</option>
              ))}
            </Form.Control>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Poll
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Poll Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {response && (
            <>
              <p>
                Message: <b>{response.message}</b>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PollUpdate;

