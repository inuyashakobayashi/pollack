import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


function Home() {
  return (
    <div>Home

    <Link to='/addPoll'>
    <button >new poll</button>
    </Link>
    <Link to='/addVote'>
     <button>new vote</button>
    </Link>
    <Link to='/showPolls'>
     <button>show polls</button>
    </Link>
    <Button variant="primary">Click me</Button>

    </div>
  )
}

export default Home