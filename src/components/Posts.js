import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Row, Col, Button } from 'react-bootstrap'
import Post from './Post'
import { MdArrowDownward, MdArrowUpward } from "react-icons/md"

class Posts extends Component {
  state = {
    orderByDate: false,
    orderByVote: false,
    postsIds: null,
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState(() => ({
      postsIds: nextProps.postsIds,
      posts: nextProps.posts
    }))

    if (this.state.orderByDate) {
      this.order('date', this.state.orderByDate)
    } else if (this.state.orderByVote) {
      this.order('vote', this.state.orderByVote)
    }
  }
  
  order = (field, status) => {
    if (field === 'vote') {
      if (status === 'up') {
        this.sortDescendingVote()
      } else if (status === 'down') {
        this.sortAscendingVote()
      }
    }

    if (field === 'date') {
      if (status === 'up') {
        this.sortDescendingDate()
      } else if (status === 'down') {
        this.sortAscendingDate()
      }
    }
  }

  sortAscendingVote = () => {
    let { postsIds } = this.state;
    postsIds.sort((a, b) => this.props.posts[a].voteScore - this.props.posts[b].voteScore)
    this.setState({ postsIds })
  }

  sortDescendingVote = () => {
    let { postsIds } = this.state;
    postsIds.sort((a, b) => this.props.posts[a].voteScore - this.props.posts[b].voteScore).reverse()
    this.setState({ postsIds })
  }

  sortAscendingDate = () => {
    let { postsIds } = this.state;
    postsIds.sort((a, b) => this.props.posts[a].timestamp - this.props.posts[b].timestamp)
    this.setState({ postsIds })
  }

  sortDescendingDate = () => {
    let { postsIds } = this.state;
    postsIds.sort((a, b) => this.props.posts[a].timestamp - this.props.posts[b].timestamp).reverse()
    this.setState({ postsIds })
  }

  handleOrderByDate = () => {
    let newOrderBy = null
    
    switch (this.state.orderByDate) {
      case false:
        newOrderBy = 'up'
        break
      case 'up':
        newOrderBy = 'down'
        break
      case 'down':
        newOrderBy = false
        break
      default:
        newOrderBy = false
    }

    this.setState(() => ({
      orderByDate: newOrderBy,
      orderByVote: false,
    }))

    this.order('date', newOrderBy)
  }

  handleOrderByVote = () => {
    let newOrderBy = null
    
    switch (this.state.orderByVote) {
      case false:
        newOrderBy = 'up'
        break
      case 'up':
        newOrderBy = 'down'
        break
      case 'down':
        newOrderBy = false
        break
      default:
        newOrderBy = false
    }
    
    this.setState(() => ({
      orderByVote: newOrderBy,
      orderByDate: false,
    }))

    this.order('vote', newOrderBy)
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title className='mb-0'>Posts</Card.Title>
            </Col>
            <Col md="auto">
              <Button 
                className='mr-1' 
                size="sm" 
                variant={this.state.orderByVote ? "info" : "outline-info"}
                onClick={this.handleOrderByVote}
              >
                Order by vote
                {this.state.orderByVote === 'up'
                ? <MdArrowUpward />
                : this.state.orderByVote === 'down' ? <MdArrowDownward /> : ''}
              </Button>
            </Col>
            <Col md="auto">
              <Button 
                className='mr-1' 
                size="sm" 
                variant={this.state.orderByDate ? "info" : "outline-info"}
                onClick={this.handleOrderByDate}
              >
                Order by date 
                {this.state.orderByDate === 'up'
                ? <MdArrowUpward />
                : this.state.orderByDate === 'down' ? <MdArrowDownward /> : ''}
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
            {this.state.postsIds
            ? this.state.postsIds.map((id) => (
              <Post id={id} key={id} history={this.props.history}/>
            )) : ''}
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps ({ posts }, { location }) {
  const filter = location.pathname.substring(1)
  let postsIds = Object.keys(posts)

  if (filter !== '') {
    postsIds = postsIds.filter((id) => posts[id].category === filter)
  }

  return {
    posts,
    postsIds,
    filter
  }
}

export default connect(mapStateToProps)(Posts)