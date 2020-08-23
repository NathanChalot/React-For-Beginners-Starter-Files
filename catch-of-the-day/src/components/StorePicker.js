import React from 'react';

class StorePicker extends React.Component {
  storeInput = React.createRef();
  goToStore = (event) => {
    event.preventDefault();
    const storeId = this.storeInput.current.value;
    this.props.history.push(`store/${storeId}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input type="text" required placeholder="Store Name" ref={this.storeInput}/>
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
