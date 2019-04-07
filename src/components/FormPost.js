import React, { Component } from 'react'
import { Card, Form, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { idGenerator } from '../utils/helpers'
import { handleAddNewPost } from '../actions/posts'

class FormPost extends Component {
  state = {
    validated: false,
    title: '',
    body: '',
    author: '',
    category: '',
    post: null
  }

  handleTitleChange = (e) => {
    const title = e.target.value

    this.setState(() => ({
      title
    }))
  }

  handleBodyChange = (e) => {
    const body = e.target.value

    this.setState(() => ({
      body
    }))
  }

  handleAuthorChange = (e) => {
    const author = e.target.value

    this.setState(() => ({
      author
    }))
  }

  handleCategoryChange = (e) => {
    const category = e.target.value

    this.setState(() => ({
      category
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget
    this.setState({ validated: true });

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const { dispatch } = this.props

      dispatch(handleAddNewPost({
        id: idGenerator(),
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category,
        timestamp: Date.now(),
      }))

      this.setState(() => ({
        validated: false,
        title: '',
        body: '',
        author: '',
        category: '',
        post: null
      }))

      this.props.history.push('/')
    }
  }

  render() {
    const { title, body, author, category, validated } = this.state

    return (
      <Card className='mb-2'>
        <Card.Body>
          <Card.Title>New Post</Card.Title>
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="Title">
                <Form.Control required onChange={this.handleTitleChange} value={title} type="text" placeholder="Title" />
                <Form.Control.Feedback type="invalid">Please, choose a title</Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="Body">
                <Form.Control required onChange={this.handleBodyChange} value={body} as="textarea" rows="3" placeholder="Body"/>
                <Form.Control.Feedback type="invalid">Please, say something</Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="Author">
                <Form.Control required onChange={this.handleAuthorChange} value={author} type="text" placeholder="Author" />
                <Form.Control.Feedback type="invalid">Please, provide a name</Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="Category">
                <Form.Control required value={category} onChange={this.handleCategoryChange} as="select">
                  <option value=''>Categories</option>
                  {Object.keys(this.props.categories).map((key) => 
                    <option key={key} value={this.props.categories[key].name}>
                        {this.props.categories[key].name}
                    </option>
                  )}
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please, choose a categorie</Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="button-submit">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: categories
  }
}

export default connect(mapStateToProps)(FormPost)