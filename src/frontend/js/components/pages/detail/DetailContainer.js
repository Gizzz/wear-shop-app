import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as actionCreators from '../../../redux/action-creators'
import { getShopItem } from '../../../redux/selectors'
import Detail from './Detail'

class DetailWrapper extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    // redux
    shopItem: PropTypes.object,
    loadShopItems: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const isShopItemLoaded = this.props.shopItem !== undefined
    if (isShopItemLoaded) return

    const category = this.props.match.params.category
    this.props.loadShopItems(category)
  }

  render() {
    const { shopItem, ...rest } = this.props
    return (
      <Detail
        {...rest}
        shopItem={shopItem}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const category = ownProps.match.params.category
  const name = ownProps.match.params.itemName

  return {
    shopItem: getShopItem(state, category, name)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadShopItems: (category) => { dispatch(actionCreators.loadShopItems(category)) }
  }
}

const DetailContainer = connect(mapStateToProps, mapDispatchToProps)(DetailWrapper)
export default DetailContainer
