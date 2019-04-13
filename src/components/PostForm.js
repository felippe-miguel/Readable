import React, { Component } from 'react'
import { Card, Form, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { idGenerator } from '../utils/helpers'
import { handleAddNewPost, handleUpdatePost } from '../actions/posts'

class PostForm extends Component {
  state = {
    validated: false,
    title: '',
    body: '',
    author: '',
    category: '',
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.post) {
      this.setState(() => ({
        title: nextProps.post.title,
        body: nextProps.post.body,
        author: nextProps.post.author,
        category: nextProps.post.category,
      }))
    }
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

      if (this.props.post) {
        this.handleEdit(dispatch)
      } else {
        this.handleCreate(dispatch)
      }

      this.props.history.push('/')
    }
  }

  handleEdit = (dispatch) => {
    dispatch(handleUpdatePost({
      post: {
        ...this.props.post,
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
        category: this.state.category,
        timestamp: Date.now()
      }, 
      postKey: this.props.match.params.id
    }))
  }

  handleCreate = (dispatch) => {
    dispatch(handleAddNewPost({
      id: idGenerator(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
      timestamp: Date.now(),
    }))
  }

  render() {
    const { title, body, author, category, validated } = this.state

    return (
      <Card className='mb-2'>
        <Card.Header>
          <Card.Title className='mb-0'>
            {this.props.post
              ? 'Edit post'
              : 'New Post'
            }
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="Title">
                <Form.Control 
                required 
                onChange={this.handleTitleChange} 
                value={title} 
                type="text" 
                placeholder="Title" />
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
                <Button variant="outline-primary" type="submit">
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

function mapStateToProps ({ categories, posts }, {match}) {
  const post = posts[match.params.id]

  return {
    categories,
    post
  }
}

export default connect(mapStateToProps)(PostForm)