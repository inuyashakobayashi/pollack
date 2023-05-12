import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';



function Home() {

  return (
    <div>
      <h1>Home</h1>
      <br/>

      <Link to='/poll'>
        <button >Poll</button>
      </Link>

    <br/> <br/>
    <Link to='/vote'>
        <button >Vote</button>
      </Link>

    </div>
  )
}

export default Home