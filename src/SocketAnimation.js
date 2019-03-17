import React, { Component } from 'react';
import './SocketAnimation.css'

class SocketAnimation extends Component {
    selectedPlugLetter = null;
    render(){
        return (
            <div className="socket-animation">
                <div className="plug-wrapper">
                    <div className={this.props.selectedPlugType + ' plug-circle'}>
                        <div className="first-hole"></div>    
                        <div className="second-hole"></div>    
                        <div className="third-hole"></div>    
                    </div>
                </div>
                <div>
                    {this.props.plugTypes.map((plugType, i) =>
                        <span className={"plug-type-changer" + 
                                        ((this.selectedPlugLetter === null && i === 0) || 
                                        this.selectedPlugLetter === plugType ? " selected" : "")} 
                            onClick={()=>{this.props.onPlugTypeClicked(plugType); this.selectedPlugLetter = plugType}} key={i}>
                        {plugType + " "}
                        </span>
                    )}
                  </div>
            </div>
        )
    }

}

export default SocketAnimation;