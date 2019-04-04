import React, { Component } from 'react'
import { Card, Form, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class FormPost extends Component {
  state = {
    title: '',
    body: '',
    author: '',
    categorie: '',
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

  handleCategorieChange = (e) => {
    const categorie = e.target.value

    this.setState(() => ({
      categorie
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    // todo: Add post to store

    console.log('New post')
    console.log(this.state)
    console.log(this.props)

    this.setState(() => ({
      title: '',
      body: '',
      author: '',
      categorie: '',
      post: null
    }))
  }

  render() {
    const { title, body, author, categorie } = this.state

    return (
      <Card className='mb-2'>
        <Card.Body>
          <Card.Title>Form Post</Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="Title">
                <Form.Control onChange={this.handleTitleChange} value={title} type="text" placeholder="Title" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="Body">
                <Form.Control onChange={this.handleBodyChange} value={body} as="textarea" rows="3" placeholder="Body"/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="Author">
                <Form.Control onChange={this.handleAuthorChange} value={author} type="text" placeholder="Author" />
              </Form.Group>
              <Form.Group as={Col} controlId="Categorie">
                <Form.Control value={categorie} onChange={this.handleCategorieChange} as="select">
                  <option value=''>Categories</option>
                  {Object.keys(this.props.categories).map((key) => 
                    <option key={key} value={this.props.categories[key].name}>
                        {this.props.categories[key].name}
                    </option>
                  )}
                </Form.Control>
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