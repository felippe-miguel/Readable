import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'

class Categories extends Component {
  render() {
    return (
      <Card>
        <Card.Header>Categories</Card.Header>
        <ListGroup as="ul" variant='flush'>
          <ListGroup.Item as="li" key='all-categorie' active>
            All
          </ListGroup.Item>
          {this.props.categories.map((categorie) => (
            <ListGroup.Item as="li" key={`${categorie.name}-categorie`}>{categorie.name}</ListGroup.Item> 
          ))}
        </ListGroup>
      </Card>
    )
  }
}

function mapStateToProps ({ categories }) {
    return {
        categories: Object.values(categories)
    }
}

export default connect(mapStateToProps)(Categories)