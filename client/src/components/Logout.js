import React from 'react'
import { Button } from 'react-materialize';

const Logout = () => {
  return (
    <div>
       <Button
    node="button"
    style={{
      marginRight: '5px'
    }}
    waves="light"
  >
    <a href="/api/logout" style={{color:'white'}}>Logout</a>
  </Button>
    </div>
  )
}

export default Logout