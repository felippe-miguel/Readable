import React, { Component } from 'react'
import { Card, Button, Col, Row} from 'react-bootstrap'
import { MdThumbUp, MdThumbDown, MdDelete, MdModeEdit } from "react-icons/md"
import { deleteComment, voteComment } from '../utils/api'

class Comment extends Component {
  componentDidMount = () => {
    if (this.props.postKey) {
      
    }
  }

  handleVoteScoreUp = (e) => {
    e.preventDefault()
    this.handleVoteScore('upVote')
  }

  handleVoteScoreDown = (e) => {
    e.preventDefault()
    this.handleVoteScore('downVote')
  }

  handleVoteScore = (option) => {
    const { comment } = this.props

    voteComment(comment.id,option)
    .then(() => {
      this.props.onVote(comment.id, option)
    })
  }

  handleDelete = () => {
    deleteComment(this.props.comment.id).then(() => {
      this.props.onDelete(this.props.comment.id)
    })
  }

  render() {
    const { comment } = this.props

    return (
      <Card className='mb-2'>
        <Card.Header>
          <Card.Title className='mb-0'>
            <Row>
              <Col>@{comment.author}</Col>
              <Col md="auto">
                <Button 
                  className='mr-1' 
                  size="sm" 
                  variant="outline-info" 
                  href={`/${this.props.match.params.category}/${this.props.postKey}/comment/${comment.id}/edit`}
                >
                  <MdModeEdit />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline-danger" 
                  onClick={this.handleDelete}
                >
                  <MdDelete />
                </Button>
              </Col>
            </Row>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{comment.body}</Card.Text>
          
          <Row className='text-muted'>
            <Col >
            </Col>
            <Col md="auto" >
              <Button size="sm" 
                variant="outline-success" 
                className='mr-1' 
                onClick={this.handleVoteScoreUp}
              >
                <MdThumbUp />
              </Button>
              <Button size="sm" 
                variant="outline-warning" 
                className='mr-3' 
                onClick={this.handleVoteScoreDown}
              >
                <MdThumbDown />
              </Button>
                {comment.voteScore}
            </Col>
            <Col md="auto" >
              {new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(comment.timestamp)}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

export default Comment