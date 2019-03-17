import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import SocketSelector from './SocketSelector';
import {getPlugType, getPlugTypeClass, getCountryCompatibleSockets } from './Helpers';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fromPlugType: "",
      toPlugType: "",
      selectedFromCountry: null,
      selectedToCountry: null,
      fromPlugTypes: [],
      toPlugTypes: [],
      isAdapterNeeded: ""
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Do I need an adapter? 
          <span className={this.state.isAdapterNeeded === "Yes" ? "yes-adapter" : "no-adapter"}>
            &nbsp;{this.state.isAdapterNeeded}
          </span>
        </header>
        <div className="Selection-panel-wrapper">
          <div className="Selection-panel">
            <SocketSelector 
              selectedCountry={this.state.selectedFromCountry}
              handleCountryChange={this.handleFromCountryChange}
              selectedPlugType={this.state.fromPlugType}
              plugTypes={this.state.fromPlugTypes}
              onPlugTypeClicked={this.onFromPlugTypeClicked}
              label='Your Country' />
          </div>
          <div className="Selection-panel">
            <SocketSelector 
              selectedCountry={this.state.selectedToCountry}
              handleCountryChange={this.handleToCountryChange}
              selectedPlugType={this.state.toPlugType}
              plugTypes={this.state.toPlugTypes}
              onPlugTypeClicked={this.onToPlugTypeClicked}
              label='Your destination' />
          </div>
        </div>

      </div>
    );
  }

  checkCountriesHaveComptabilePlugs = (selectedFromCountry, selectedToCountry) => {
    if(selectedFromCountry === null || selectedToCountry === null) {
      return;
    }

    let compatableSockets = getCountryCompatibleSockets(selectedFromCountry, selectedToCountry);
    console.debug(compatableSockets);
    if(compatableSockets.length > 0){
      this.setState({isAdapterNeeded: "Yes"});
    } else {
      this.setState({isAdapterNeeded: "No"});
    }
  }

  handleFromCountryChange = (selectedFromCountry) => {
    let plugTypes = getPlugType(selectedFromCountry);
    let selectedPlugType = getPlugTypeClass(plugTypes[0]);
    this.setState({
      selectedFromCountry,
      fromPlugType: selectedPlugType,
      fromPlugTypes: plugTypes
    });
    this.checkCountriesHaveComptabilePlugs();
  }

  handleToCountryChange = (selectedToCountry) => {
    let plugTypes = getPlugType(selectedToCountry);
    let selectedPlugType = getPlugTypeClass(plugTypes[0]);
    this.setState({
      selectedToCountry,
      toPlugType: selectedPlugType,
      toPlugTypes: plugTypes
    });
    this.checkCountriesHaveComptabilePlugs();
  }
  
  onFromPlugTypeClicked = (type) =>{
    this.setState({
      fromPlugType: getPlugTypeClass(type),
    });
  }

  onToPlugTypeClicked = (type) =>{
    this.setState({
      toPlugType: getPlugTypeClass(type),
    });
  }

}

export default App;
