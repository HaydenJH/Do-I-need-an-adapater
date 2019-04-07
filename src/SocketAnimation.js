import React, { Component } from 'react';
import './SocketAnimation.css'
import { getPlugTypeClass } from './Helpers';

class SocketAnimation extends Component {
    plugTypeClicked = (e) => {
        this.props.onPlugTypeClicked(e.currentTarget.textContent.trim());
    }

    render() {
        return (
            <div className="socket-animation">
                <div className="plug-wrapper">
                    <div className={getPlugTypeClass(this.props.selectedPlugType) + ' plug-circle'}>
                        <div className="first-hole"></div>
                        <div className="second-hole"></div>
                        <div className="third-hole"></div>
                        <div className="fourth-hole"></div>
                    </div>
                </div>
                <div>
                    {this.props.plugTypes.map((plugType, i) =>
                        <span className={"plug-type-changer" +
                            (this.props.selectedPlugType === plugType.trim() ? " selected" : "")}
                            onClick={this.plugTypeClicked} key={i}>
                            {plugType + " "}
                        </span>
                    )}
                </div>
            </div>
        )
    }

}

export default SocketAnimation;