import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetAllPosts } from '../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetAllPosts())
  }

  render() {
    return (
      <div>
        Hello world
      </div>
    );
  }
}

export default connect()(App);
