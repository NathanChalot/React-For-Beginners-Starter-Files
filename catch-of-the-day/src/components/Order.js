import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrderItem = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.orders[key];
    const isAvailable = fish.status === 'available';

    if (!isAvailable) {
      return <li key={key}>Sorry {fish ? fish.name : 'the product'} is not available :(</li>
    }

    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
      </li>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.orders);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.orders[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    },0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrderItem)}</ul>
        <div className="total">
          Total:
          {formatPrice(total)}
        </div>
      </div>
    );
  }
}

export default Order;
