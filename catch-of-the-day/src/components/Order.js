import React from 'react';

class Order extends React.Component {
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
        <div className="total">
          Total:
          {total}
        </div>
      </div>
    );
  }
}

export default Order;
