import { connect } from 'react-redux'

import * as actionCreators from '../../../redux/action-creators'
import { getShopItemsByCategory } from '../../../redux/reducers'
import List from './List'

const mapStateToProps = (state, ownProps) => {
  return {
    shopItems: getShopItemsByCategory(state, ownProps.match.params.category),
    isItemsLoading: state.shopItems.isItemsLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadShopItems: (category) => { dispatch(actionCreators.loadShopItems(category)) }
  }
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List)

export default ListContainer
