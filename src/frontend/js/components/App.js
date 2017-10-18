import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import Header from './Header'
import Footer from './Footer'
import Home from './pages/Home'
import ListContainer from './pages/list/ListContainer'
import DetailContainer from './pages/detail/DetailContainer'
import CartContainer from './pages/cart/CartContainer'
import Checkout from './pages/checkout/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import PageNotFound from './pages/PageNotFound'

import storageHelper from '../utils/storage-helper'
import '../../styles/index.less'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.clearCart = this.clearCart.bind(this)

    this.state = {
      cartItems: [
        // expample cart item:
        // =================== 
        // {
        // 	itemData: {},
        // 	size: "M",
        // 	quantity: 1,
        // },
      ],
    }
  }

  componentDidMount() {
    // restore app state from storage
    const restoredState = storageHelper.loadState()
    if (restoredState) {
      this.setState(restoredState)
    }

    // save app state to storage on window.beforeunload
    window.addEventListener('beforeunload', () => {
      storageHelper.saveState(this.state)
    })
  }

  clearCart() {
    this.setState({
      cartItems: [],
    })
  }

  render() {
    // don't forget to change css
    const transitionDuration = 400

    return (
      <BrowserRouter>
        <div className="app">
          <Header cartItems={this.state.cartItems} />
          <section className="main">
            <div className="wrapper">
              <Route render={({ location }) => (
                <CSSTransitionGroup
                  transitionName="route_change"
                  transitionAppear={true}
                  transitionAppearTimeout={transitionDuration}
                  transitionEnterTimeout={transitionDuration}
                  transitionLeaveTimeout={transitionDuration}
                >
                  <Switch location={location} key={location.key}>
                    <Route exact path="/" component={Home} />
                    <Route path="/list/:category" component={ListContainer} />
                    <Route path="/detail/:category/:itemName" render={({ match }) => (
                      <DetailContainer match={match} />
                    )} />
                    <Route path="/cart" render={() => (
                      <CartContainer />
                    )} />
                    <Route exact path="/checkout" render={() => (
                      <Checkout cartItems={this.state.cartItems} onPlaceOrder={this.clearCart} />
                    )} />
                    <Route path="/checkout/success" component={CheckoutSuccess} />
                    <Route component={PageNotFound}/>
                  </Switch>
                </CSSTransitionGroup>
              )} />
            </div>
          </section>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}
