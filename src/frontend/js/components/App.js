import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import Header from './Header'
import Footer from './Footer'
import Home from './pages/Home'
import ListContainer from './pages/list/ListContainer'
import DetailContainer from './pages/detail/DetailContainer'
import CartContainer from './pages/cart/CartContainer'
import CheckoutContainer from './pages/checkout/CheckoutContainer'
import CheckoutSuccess from './pages/CheckoutSuccess'
import PageNotFound from './pages/PageNotFound'

import '../../styles/index.less'

const App = () => {
  // don't forget to change css
  const transitionDuration = 400

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
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
                  <Route path="/cart" component={CartContainer} />
                  <Route exact path="/checkout" component={CheckoutContainer} />
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

export default App
