import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    details: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }),
    addToOrder: PropTypes.func
  };

  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available'

    return (
      <li className="menu-fish">
        <img src={image} alt={name}/>
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => { this.props.addToOrder(this.props.id)}} >
            {isAvailable ? 'Add to Cart' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
