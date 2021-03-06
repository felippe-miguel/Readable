import React, { Component } from 'react'
import { Card, Form, Col, Button } from 'react-bootstrap'
import { addComment, getComment, updateComment } from '../utils/api'
import { idGenerator } from '../utils/helpers'

class CommentForm extends Component {
  state = {
    validated: false,
    body: '',
    author: '',
    comment: null,
  }

  componentDidMount = () => {
    if (this.props.match) {
      getComment(this.props.match.params.id).then((comment) => {
        this.setState(() => ({
          comment: comment,
          body: comment.body,
          author: comment.author,
        }))
      })
    }
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

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget
    this.setState({ validated: true });

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      if (this.state.comment) {
        this.handleEdit()
      } else {
        this.handleCreate()
      }
    }
  }

  handleEdit = () => {
    const comment = {
      ...this.state.comment,
      body: this.state.body,
      author: this.state.author,
      timestamp: Date.now()
    }

    updateComment(comment).then(() => {
      this.props.history.push(`/${this.props.match.params.category}/${this.props.match.params.postId}`)
    })
  }

  handleCreate = () => {
    const comment = {
      id: idGenerator(),
      parentId: this.props.postId,
      body: this.state.body,
      author: this.state.author,
      voteScore: 1,
      timestamp: Date.now()
    }

    addComment(comment).then(() => {this.props.onAdd(comment)})
  }

  render() {
    const { body, author, validated, comment } = this.state

    return (
      <Card className='mb-2'>
        <Card.Header>
          <Card.Title className='mb-0'>
            {comment
              ? 'Edit comment'
              : 'New comment'
            }
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="Author">
                <Form.Control required onChange={this.handleAuthorChange} value={author} type="text" placeholder="Author" />
                <Form.Control.Feedback type="invalid">Please, provide a name</Form.Control.Feedback>
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


export default CommentForm