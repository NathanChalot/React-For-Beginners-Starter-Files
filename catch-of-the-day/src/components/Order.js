import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.shape({
      fish: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        desc: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
      })
    }),
    orders: PropTypes.objectOf(PropTypes.number).isRequired,
    deleteFromOrder: PropTypes.func.isRequired
  };

  renderOrderItem = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.orders[key];
    const isAvailable = fish && fish.status === 'available';

    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{enter: 250, exit: 250}}>
          <li key={key}>
            Sorry {fish ? fish.name : 'the product'} is not available :(
            <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
          </li>
        </CSSTransition>
      );
    }

    /*
    ** We use a key per count that is different,
    ** got to check why exactly but
    ** I think it's to force react to render
    ** another item instead of rerendering in place
    **
    ** note 2: I use a different key for the count instead of just count
    ** just to try it out and because I like it better that way
    */
    return (
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{enter: 250, exit: 250}}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={`${key}Counter${count}`}
                timeout={{enter: 250, exit: 250}}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>
          </span>
        </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrderItem)}
        </TransitionGroup>
        <div className="total">
          Total:
          {formatPrice(total)}
        </div>
      </div>
    );
  }
}

export default Order;
