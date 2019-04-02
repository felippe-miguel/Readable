import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <Card>
        <Card.Header>Posts</Card.Header>
        <Card.Body>
            {this.props.postsIds.map((id) => (
              <Post id={id} key={id}/>
            ))}
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps ({ posts }) {
  return {
    postsIds: Object.keys(posts)
  }
}

export default connect(mapStateToProps)(Posts);