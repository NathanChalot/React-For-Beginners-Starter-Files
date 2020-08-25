import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    orders: {}
  };

  /* Connect with firebase for fishes and load orders from localStorage*/
  componentDidMount() {
    const storeId = this.props.match.params.storeId;
    const orders = localStorage.getItem(storeId);

    if (orders) {
      this.setState({orders: JSON.parse(orders)});
    }
    this.ref = base.syncState(`${storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })
  }
  /* Remove connexion with firebase when unmounting -> to avoid memory leak (check why) */
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    localStorage.setItem(this.props.match.params.storeId,
      JSON.stringify(this.state.orders));
  }

  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({ fishes: fishes });
  }

  updateFish = (key, updatedFish) => {
    const fishes = this.state.fishes;
    fishes[key] = updatedFish;

    this.setState({fishes: fishes});
  }

  addToOrder = (key) => {
    const orders = { ...this.state.orders };
    orders[key] = orders[key] + 1 || 1;
    this.setState({ orders: orders });
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
            { Object.keys(this.state.fishes).map( key =>
                <Fish
                  key={key}
                  id={key}
                  details={this.state.fishes[key]}
                  addToOrder={this.addToOrder}/>
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} orders={this.state.orders} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes} />
      </div>
    );
  }
}

export default App;
