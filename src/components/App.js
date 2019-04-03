import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetAllPosts, handleGetCategories } from '../actions/shared'
import Categories from './Categories'
import { Card, Nav } from 'react-bootstrap'
import Posts from './Posts'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetCategories())
    this.props.dispatch(handleGetAllPosts())
  }

  render() {
    return (
      <div>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
        </Nav>
        
        <Card.Body>
          <div className='row'>
            <div className='col-lg-3 mb-2'>
              <Categories />
            </div>
            <div className='col-lg-9'>
              <Posts />
            </div>
          </div>
        </Card.Body>
      </div>
    )
  }
}

export default connect()(App)
