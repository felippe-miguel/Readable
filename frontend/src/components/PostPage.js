import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Col } from 'react-bootstrap'
import Post from './Post'
import Comments from './Comments'

const PostPage = props => {
  return (
    <Col>
      <Card className='mb-2'>
        <Card.Header>
          <Card.Title className='mb-0'>
            Post details
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {(props.post)
            ? 
            <Fragment>
              <Post id={props.id} history={props.history} match={props.match}/>
              <Comments postKey={props.id} id={props.post.id} match={props.match}/>
            </Fragment>
            : 'Post não encontrado'
          }
        </Card.Body>
      </Card>
    </Col>
  )
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