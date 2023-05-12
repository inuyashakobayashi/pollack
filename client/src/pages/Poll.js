import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PollList from './PollList'
function Poll() {
  return (
    <div>Everything about Poll
        <br />
        <Link to='/addPoll'>
        <button >new poll</button>
      </Link>
      <hr/>

      <Container>
        Show all Polls:
        <br/>
        <PollList />
      </Container>

    </div>
  )
}

export default Poll