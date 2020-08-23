import React from 'react';

class Fish extends React.Component {
  render() {
    const { image, name, price, desc, status } = this.props.details;

    return (
      <li className="fish-menu">
        <img src="IMAGE" alt="NAME"/>
        <h3 className="fish-name">
          NAME
          <span className="price">FORMATTED PRICE</span>
        </h3>
        <p>DESC</p>
        <button>Add to Cart</button>
      </li>
    );
  }
}

export default Fish;
