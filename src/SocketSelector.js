import React, { Component } from 'react';
import Select from 'react-select';
import {options} from './Helpers';
import SocketAnimation from './SocketAnimation';

class SocketSelector extends Component {
    render() {
        return (
            <div>
                <div>{this.props.label}</div>
                <Select
                    className="country-selector"
                    value={this.props.selectedCountry}
                    onChange={this.props.handleCountryChange}
                    options={ options }
                    />
                    <SocketAnimation 
                        plugTypes={this.props.plugTypes}
                        selectedPlugType={this.props.selectedPlugType} 
                        onPlugTypeClicked={this.props.onPlugTypeClicked}
                        />
            </div>
        );
    }

}

export default SocketSelector;
