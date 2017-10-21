import { connect } from 'react-redux'

import * as actionCreators from '../../../redux/action-creators'
import { selectors } from '../../../redux/reducers'
import List from './List'

const mapStateToProps = (state, ownProps) => {
  return {
    shopItems: selectors.entities.shopItems.getShopItemsByCategory(state, ownProps.match.params.category),
    isItemsLoading: selectors.ui.get_isItemsLoading(state),
    errorMessage: selectors.ui.get_errorMessage(state),
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadShopItems: (category) => { dispatch(actionCreators.loadShopItems(category)) }
})

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List)
export default ListContainer
