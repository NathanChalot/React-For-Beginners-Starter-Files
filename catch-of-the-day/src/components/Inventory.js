import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends React.Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    fishes: PropTypes.shape({
      fish: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        desc: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
      })
    })
  };

  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>LOAD SAMPLE FISHES</button>
        { Object.keys(this.props.fishes).map(key =>
          <EditFishForm
            key={key}
            id={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish} />
        )}
      </div>
    );
  }
}

export default Inventory;
