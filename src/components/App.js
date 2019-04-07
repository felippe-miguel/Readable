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
  componentDidMount() {
    this.props.dispatch(handleGetCategories())
    this.props.dispatch(handleGetAllPosts())
  }

  render() {
    return (
      <Router>
        <Card.Body>
          <Route className='mb-2' component={NavApp} />
          <Row className='mt-2'>
            <Route path='/' exact render={() =>
              <Fragment>
                <Col lg='3' className='mb-2'>
                  <Categories />
                </Col>
                <Col lg='9'>
                  <Posts />
                </Col>
              </Fragment>
            }/>
            <Route path='/new-post' render={({ history }) => 
              <Col>
                <FormPost history={history}/>
              </Col>
            }/>
          </Row>
        </Card.Body>
      </Router>
    )
  }
}

export default connect()(App)
