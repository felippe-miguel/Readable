import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleGetAllPosts, handleGetCategories } from '../actions/shared'
import Categories from './Categories'
import NavApp from './NavApp'
import { Card, Col, Row } from 'react-bootstrap'
import Posts from './Posts'
import FormPost from './FormPost'

class App extends Component {
  componentWillMount() {
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
                  <Categories location={location}/>
                </Col>
                <Col lg='9'>
                  <Posts location={location} history={history}/>
                </Col>
              </Fragment>
            }/>
            <Route path={['/new-post', '/:id/edit']} render={({ history, match }) => 
              <Col>
                <FormPost 
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
