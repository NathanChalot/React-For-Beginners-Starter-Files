import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import base, { firebaseApp } from '../base.js';
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

  static state = {
    uid: null,
    owner: null
  };

  handleAuth = async (authData) => {
    const store = await base.fetch(this.props.storeId, { context: this });
    const userId = authData.user.uid;

    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, { data: userId });
    }
    this.setState({
      uid: userId,
      owner: store.owner || userId
    });
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp.auth().signInWithPopup(authProvider).then(this.handleAuth)
  };

  render() {
    return <Login authenticate={this.authenticate}/>
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
