import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import { MdThumbUp, MdThumbDown, MdComment, MdBookmarkBorder } from "react-icons/md"
import { handleUpdateVotePost } from '../actions/posts'

class Post extends Component {
  handleVoteScoreUp = (e) => {
    e.preventDefault()
    this.handleVoteScore('upVote')
  }

  handleVoteScoreDown = (e) => {
    e.preventDefault()
    this.handleVoteScore('downVote')
  }

  handleVoteScore = (option) => {
    const { dispatch, post, indexStore } = this.props

    dispatch(handleUpdateVotePost({
      postId: post.id,
      postKey: indexStore,
      option: option
    }))
  }
  
  render() {
    return (
      <Card className='mb-2'>
        <Card.Body>
          <Card.Title>{this.props.post.title}</Card.Title>
          <Card.Text>{this.props.post.body}</Card.Text>
          
          <div className='row text-muted'>
            <div className='col-md-3'>
              Posted by @{this.props.post.author}
            </div>
            <div className='col-md-2'>
              <MdBookmarkBorder /> {this.props.post.category}
            </div>
            <div className='col-md-2'>
              <MdComment /> {this.props.post.commentCount}
            </div>
            <div className='col-md-2 d-flex'>
                <div className='text-primary mr-1' onClick={this.handleVoteScoreUp}>
                  <MdThumbUp />
                </div>
                <div className='text-danger mr-3' onClick={this.handleVoteScoreDown}>
                  <MdThumbDown />
                </div>
                <div >
                  {this.props.post.voteScore}
                </div>
            </div>
            <div className='col-md-3 text-right'>
              {new Intl.DateTimeFormat('pt-BR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(this.props.post.timestamp)}
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps ({ posts }, { id }) {
  const post = posts[id]
  return {
    indexStore: id,
    post: post
  }
}

export default connect(mapStateToProps)(Post)