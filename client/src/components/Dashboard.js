import React from 'react'
import {Link} from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <p>dashboard home, is logged in</p>
      <Link to="/huaolelo">
        <h2>vocab dashboard</h2>
      </Link>
      <h2>sentence structures</h2>
      <h2>examples</h2>
    </div>
  )
}

export default Dashboard