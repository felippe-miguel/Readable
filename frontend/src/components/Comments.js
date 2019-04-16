import React, { Component } from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import {  getCommentsFromPost } from '../utils/api'
import Comment from './Comment'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import { FaPlus, FaMinus } from "react-icons/fa";
import { handleCommentPost, handleDeleteCommentPost } from '../actions/posts'

class Comments extends Component {
  state = {
    comments: [],
    showCommentForm: false
  }

  componentDidMount = () => {
    this.handleGetComments()
  }

  handleVote = (commentId, option) => {
    this.setState(() => ({
      comments: this.state.comments.map((comment) => {
        if (comment.id === commentId) {
          option === 'upVote'
          ? comment.voteScore++
          : comment.voteScore--
        }

        return comment
      })
    }))
  }

  handleAdd = (comment) => {
    const { dispatch } = this.props

    this.toggleShowForm()

    this.setState(state => ({
      comments: [comment, ...state.comments]
    }))

    dispatch(handleCommentPost(this.props.postKey))
  }

  handleDelete = (commentId) => {
    const { dispatch } = this.props

    this.setState(() => ({
      comments: this.state.comments.filter((comment) => comment.id !== commentId)
    }))

    dispatch(handleDeleteCommentPost(this.props.postKey))
  }

  handleGetComments = () => {
    getCommentsFromPost(this.props.id)
    .then(( comments ) => {
      this.setState(() => ({
        comments
      }))
    })
  }

  toggleShowForm = () => {
    this.setState(() => ({
      showCommentForm: !this.state.showCommentForm
    }))
  }

  render() {
    return (
      <Card className='mb-2'>
        <Card.Header>
          <Card.Title className='mb-0'>
            <Row>
              <Col>Post comments</Col>
              <Col md="auto">
                <Button 
                  size="sm" 
                  variant="outline-primary" 
                  onClick={this.toggleShowForm}
                >
                {this.state.showCommentForm 
                  ? <FaMinus />
                  : <FaPlus />
                }
                </Button>
              </Col>
            </Row>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          {this.state.showCommentForm && 
            <CommentForm postId={this.props.id} onAdd={(comment) => this.handleAdd(comment)}/>
          }
          
          {this.state.comments.map((comment) => (
            <Comment 
              onDelete={(commentId) => {
                this.handleDelete(commentId)}
              } 
              onVote={(commentId, option) => {
                this.handleVote(commentId, option)
              }}
              postKey={this.props.postKey}
              comment={comment} 
              key={comment.id} 
              match={this.props.match}
            />
          ))}
        </Card.Body>
      </Card>
    )
  }
}

export default connect()(Comments)