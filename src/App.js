import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import SocketSelector from './SocketSelector';
import {getPlugType, getCountryCompatibleSockets } from './Helpers';

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
      isAdapterNeeded: "",
      caveat: ""
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
        <span className="caveat">
          {this.state.caveat}
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

  checkCountriesHaveComptablePlugs = (selectedFromCountry, selectedToCountry) => {
    if(selectedFromCountry === null || selectedToCountry === null) {
      return;
    }
    let caveat = "When using plug(s) of type: ";
    let compatibleSockets = getCountryCompatibleSockets(selectedFromCountry, selectedToCountry);
    if(compatibleSockets.length > 0) {
      caveat = caveat + compatibleSockets.map(e => e.plug).join(", ");
      this.setState({
        isAdapterNeeded: "No..",
        caveat: caveat
      });
    } else {
      this.setState({
        isAdapterNeeded: "Yes",
        caveat: ""
      });
    }
  }

  handleFromCountryChange = (selectedFromCountry) => {
    let plugTypes = getPlugType(selectedFromCountry);
    let selectedPlugType = plugTypes[0];
    this.setState({
      selectedFromCountry,
      fromPlugType: selectedPlugType,
      fromPlugTypes: plugTypes
    });
    this.checkCountriesHaveComptablePlugs(selectedFromCountry, this.state.selectedToCountry);
  }

  handleToCountryChange = (selectedToCountry) => {
    let plugTypes = getPlugType(selectedToCountry);
    let selectedPlugType = plugTypes[0];
    this.setState({
      selectedToCountry,
      toPlugType: selectedPlugType,
      toPlugTypes: plugTypes
    });
    this.checkCountriesHaveComptablePlugs(this.state.selectedFromCountry, selectedToCountry);
  }

  onFromPlugTypeClicked = (type) =>{
    this.setState({
      fromPlugType: type,
    });
  }

  onToPlugTypeClicked = (type) =>{
    this.setState({
      toPlugType: type,
    });
  }

}

export default App;
