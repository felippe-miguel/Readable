import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetAllPosts, handleGetCategories } from '../actions/shared'
import Categories from './Categories'
import { Card } from 'react-bootstrap'
import Posts from './Posts';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetCategories())
    this.props.dispatch(handleGetAllPosts())
  }

  render() {
    return (
      <Card>
        <Card.Header>App</Card.Header>
        <Card.Body>
          <div className='row'>
            <div className='col-3'>
              <Categories />
            </div>
            <div className='col-9'>
              <Posts />
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default connect()(App);
