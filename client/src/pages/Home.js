import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';



function Home() {

  return (
    <div>Home
      <br/>

      <Link to='/poll'>
        <button >Poll</button>
      </Link>

    <br/>
    <Link to='/vote'>
        <button >Vote</button>
      </Link>

      {/* <Link to='/addPoll'>
        <button >new poll</button>
      </Link>

      <Link to='/showPolls'>
        <button>show polls</button>
      </Link>
      <hr/>

      <EnterToken/> */}

    </div>
  )
}

export default Home