import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    fish: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    }),
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired
  };

  handleChange = (event) => {
    const input = event.currentTarget;
    const updatedFish = {
      ...this.props.fish,
      [input.name]: input.value
    }

    this.props.updateFish(this.props.id, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          name="name"
          type="text"
          value={this.props.fish.name}
          onChange={this.handleChange} />
        <input
          name="price"
          type="text"
          value={this.props.fish.price}
          onChange={this.handleChange} />
        <select name="status" value={this.props.fish.status} onChange={this.handleChange}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" value={this.props.fish.desc} onChange={this.handleChange}></textarea>
        <input
          name="image"
          type="text"
          value={this.props.fish.image}
          onChange={this.handleChange} />
        <button onClick={() => this.props.deleteFish(this.props.id)}>
          Remove Fish!
        </button>
      </div>
    );
  }
}

export default EditFishForm;
