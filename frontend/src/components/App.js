import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleGetAllPosts, handleGetCategories } from '../actions/shared'
import Categories from './Categories'
import NavApp from './NavApp'
import { Card, Col, Row } from 'react-bootstrap'
import Posts from './Posts'
import PostPage from './PostPage'
import PostForm from './PostForm'
import CommentForm from './CommentForm';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetAllPosts())
    this.props.dispatch(handleGetCategories())
  }

  render() {
    return (
      <Router>
        <Card.Body>
          <Route className='mb-2' component={NavApp} />
          <Row className='mt-2'>
            <Route path={['/','/react','/redux','/udacity']} exact  render={({ history, location }) =>
              <Fragment>
                <Col lg='3' className='mb-2'>
                  <Categories location={location} history={history}/>
                </Col>
                <Col lg='9'>
                  <Posts location={location} history={history}/>
                </Col>
              </Fragment>
            }/>
            <Route path={['/new-post', '/:category/:id/edit']} exact render={({ history, match }) => 
              <Col>
                <PostForm 
                  history={history} 
                  match={match}
                />
              </Col>
            }/>
            <Route path={'/:category/:id'} exact component={PostPage}/>
            <Route path={'/:category/:postId/comment/:id/edit'} exact render={({ history, match }) => 
              <Col>
                <CommentForm 
                  history={history} 
                  match={match}
                />
              </Col>
            }/>
          </Row>
        </Card.Body>
      </Router>
    )
  }
}

export default connect()(App)
