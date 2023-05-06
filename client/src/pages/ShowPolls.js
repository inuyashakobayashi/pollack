import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShowPolls() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const getPolls = async () => {
      try {
        const response = await axios.get('http://localhost:8080/poll/lack/c7a9bcd688d09462ef2ff071d62ad25f');
        console.log(response.data);
        setPolls(response.data.poll);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };
    getPolls();
  }, []);

  return <div>ShowPolls</div>;
}

export default ShowPolls;
