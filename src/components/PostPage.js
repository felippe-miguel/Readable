import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Col } from 'react-bootstrap'
import Post from './Post'
import Comments from './Comments'

class PostPage extends Component {
  render() {
    return (
      <Col>
        <Card className='mb-2'>
          <Card.Header>
            <Card.Title className='mb-0'>
              Post details
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {(this.props.post)
              ? 
              <Fragment>
                <Post id={this.props.id} history={this.props.history}/>
                <Comments postKey={this.props.id} id={this.props.post.id}/>
              </Fragment>
              : 'Post não encontrado'
            }
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

function mapStateToProps ({ posts }, routeData) {
  const id = routeData.match.params.id
  const post = posts[id]
  
  return {
    id,
    post
  }
}

export default connect(mapStateToProps)(PostPage)