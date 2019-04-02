import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import { MdThumbUp, MdComment, MdBookmarkBorder } from "react-icons/md";

class Post extends Component {
  render() {
    console.log(this.props)
    return (
      <Card className='mb-2'>
        <Card.Body>
          <Card.Title>{this.props.post.title}</Card.Title>
          <Card.Text>{this.props.post.body}</Card.Text>
          
          <div className='row text-muted'>
            <div className='col-4'>
              Posted by @{this.props.post.author}
            </div>
            <div className='col'>
              <MdBookmarkBorder /> {this.props.post.category}
            </div>
            <div className='col-2'>
              <MdComment /> {this.props.post.commentCount}
            </div>
            <div className='col-2'>
              <MdThumbUp /> {this.props.post.voteScore}
            </div>
            <div className='col'>
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
    post: post
  }
}

export default connect(mapStateToProps)(Post);