import React from 'react';

class Fish extends React.Component {
  render() {
    const { image, name, price, desc, status } = this.props.details;

    return (
      <li className="fish-menu">
        <img src={image} alt={name}/>
        <h3 className="fish-name">
          {name}
          <span className="price">{price}</span>
        </h3>
        <p>{desc}</p>
        <button>Add to Cart</button>
      </li>
    );
  }
}

export default Fish;
