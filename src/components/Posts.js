import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'
import Post from './Post'

class Posts extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title>Posts</Card.Title>
            </Col>
          
            <Col md="auto">
              {(this.props.filter !== '')
                ? 'Category: ' + this.props.filter
                : ''
              }
            </Col>
          
          </Row>
        </Card.Header>
        <Card.Body>
            {this.props.postsIds.map((id) => (
              <Post id={id} key={id} history={this.props.history}/>
            ))}
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps ({ posts }, { location }) {
  const filter = location.pathname.substring(1)
  let postsIds = Object.keys(posts)

  if (filter !== '') {
    postsIds = postsIds.filter((id) => posts[id].category === filter)
  }

  return {
    postsIds,
    filter
  }
}

export default connect(mapStateToProps)(Posts)