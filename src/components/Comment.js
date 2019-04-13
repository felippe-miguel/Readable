import React, { Component } from 'react'
import { Card, Button, Col, Row} from 'react-bootstrap'
import { MdThumbUp, MdThumbDown, MdDelete } from "react-icons/md"
import { deleteComment, voteComment } from '../utils/api'

class Comment extends Component {
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
    return (
      <Card className='mb-2'>
        <Card.Header>
          <Card.Title className='mb-0'>
            <Row>
              <Col>@{this.props.comment.author}</Col>
              <Col md="auto">
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
          <Card.Text>{this.props.comment.body}</Card.Text>
          
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
                {this.props.comment.voteScore}
            </Col>
            <Col md="auto" >
              {new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(this.props.comment.timestamp)}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  }
}

export default Comment