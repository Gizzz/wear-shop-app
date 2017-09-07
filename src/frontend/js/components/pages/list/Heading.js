import React from 'react'
import PropTypes from 'prop-types'

const Heading = (props) => {
  const category = props.category
  const categoryName_to_title = {
    mens_outerwear: 'Men\'s Outerwear',
    ladies_outerwear: 'Ladies Outerwear',
    mens_tshirts: 'Men\'s T-Shirts',
    ladies_tshirts: 'Ladies T-Shirts',
  }

  const categoryTitle = categoryName_to_title[category]
  let statusText

  if (props.errorMessage != null) {
    statusText = 'Error: ' + props.errorMessage
  } else if (props.isItemsLoading) {
    statusText = 'Loading data...'
  } else {
    statusText = props.itemsCount === 1
      ? '1 item'
      : `${props.itemsCount} items`
  }

  return (
    <div className="heading">
      <h2>{ categoryTitle }</h2>
      <span>{ statusText }</span>
    </div>
  )
}

Heading.propTypes = {
  category: PropTypes.string.isRequired,
  itemsCount: PropTypes.number.isRequired,
  isItemsLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

export default Heading
