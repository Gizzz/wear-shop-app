import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Heading from './Heading'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const category = this.props.match.params.category
    this.props.loadShopItems(category)
  }

  componentWillReceiveProps(nextProps) {
    const isLocationChanged = nextProps.location !== this.props.location
    if (isLocationChanged) {
      const category = nextProps.match.params.category
      this.props.loadShopItems(category)
    }
  }

  render() {
    const category = this.props.match.params.category
    // replace with selector
    const shopItemsOfCategory = this.props.shopItems.itemsByCategory[category]
    const isItemsLoaded = !this.props.isItemsLoading
    const itemsCount = isItemsLoaded ? shopItemsOfCategory.length : 0

    return (
      <div className="content list">
        <div className={`billboard ${category}`}></div>
        <Heading
          category={category}
          isItemsLoading={this.props.isItemsLoading}
          itemsCount={itemsCount}
        />
        <ul className="items">
          {
            shopItemsOfCategory.map((item) => (
              <li key={item.name}>
                <Link to={`/detail/${category}/${item.name}`}>
                  <img src={item.image} alt="" />
                  <div className="title">{item.title}</div>
                  <span className="price">${item.price.toFixed(2)}</span>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  // redux
  shopItems: PropTypes.object.isRequired,
  isItemsLoading: PropTypes.bool.isRequired,
  loadShopItems: PropTypes.func.isRequired,
  // router
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default List
