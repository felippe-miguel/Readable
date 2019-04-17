import React from 'react'
import { Nav } from 'react-bootstrap'

const NavApp = props => {
  return (
    <Nav 
      variant="tabs" 
      defaultActiveKey="/"
      activeKey={props.location.pathname}
    >
      <Nav.Item>
        <Nav.Link eventKey="/" href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/new-post" href="/new-post" >New Post</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default NavApp
