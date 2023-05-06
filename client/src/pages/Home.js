import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import EnterToken from '../components/EnterToken';


function Home() {


  return (
    <div>Home

      <Link to='/addPoll'>
        <button >new poll</button>
      </Link>

      <Link to='/showPolls'>
        <button>show polls</button>
      </Link>
      <hr/>

      <EnterToken/>

    </div>
  )
}

export default Home