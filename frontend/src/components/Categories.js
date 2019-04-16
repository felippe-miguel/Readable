import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'

class Categories extends Component {
  handleSelect = (e) => {
  }
  
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title className='mb-0'>Categories</Card.Title>
        </Card.Header>
        <ListGroup
          defaultActiveKey='/react'
          activeKey={this.props.location.pathname}
          onSelect={this.handleSelect}
          variant='flush'
        >
          {this.props.categories.map((categorie) => (
            <ListGroup.Item 
              action
              href={`/${categorie.name}`}
              key={`${categorie.name}-categorie`}
            >
              {categorie.name}
            </ListGroup.Item> 
          ))}
        </ListGroup>
      </Card>
    )
  }
}

function mapStateToProps ({ categories }, { location }) {
  return {
    categories: Object.values(categories),
    location
  }
}

export default connect(mapStateToProps)(Categories)