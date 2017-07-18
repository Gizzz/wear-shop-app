import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Heading from './Heading';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const category = this.props.match.params.category;
    this.loadData(category);
  }

  componentWillReceiveProps(nextProps) {
    const isLocationChanged = nextProps.location !== this.props.location;
    if (isLocationChanged) {
      const category = nextProps.match.params.category;
      this.loadData(category);
    }
  }

  loadData(category) {
    fetch(`/data/${category}.json`)
      .then(response => response.json())
      .then((json) => {
        this.setState({ shopItems: json });
      })
      .catch(e => console.error(e));
  }

  render() {
    const category = this.props.match.params.category;
    let shopItems = this.state.shopItems;

    const isItemsLoaded = shopItems != null;
    if (isItemsLoaded) {
      shopItems = shopItems.map((item) => (
        <li key={item.name}>
          <Link to={`/detail/${category}/${item.name}`}>
            <img src={item.image} alt="" />
            <div className="title">{ item.title }</div>
            <span className="price">${ item.price.toFixed(2) }</span>
          </Link>
        </li>
      ));
    }

    const itemsCount = isItemsLoaded ? shopItems.length : null;

    return (
      <div className="content list">
        <div className={`billboard ${category}`}></div>
        <Heading category={category} itemsCount={itemsCount} />
        <ul className="items">
          { shopItems }
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default List;