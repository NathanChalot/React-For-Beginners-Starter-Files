import React from 'react';

class EditFishForm extends React.Component {
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
      </div>
    );
  }
}

export default EditFishForm;
