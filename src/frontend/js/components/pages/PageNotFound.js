import React from 'react'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'

import { raisedButtonDefaultProps } from '../../common-styles'

const PageNotFound = () => {
  return (
    <div className="content page-not-found">
      <i className="error"></i>
      <h1>Sorry, we couldn't find that page</h1>
      <Link to="/">
        <RaisedButton {...raisedButtonDefaultProps} label="Go to the home page" />
      </Link>
    </div>
  )
}

export default PageNotFound
