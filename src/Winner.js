import React, { Component } from 'react';
import * as bs from 'react-bootstrap';

class Winner extends Component {
    render(){
        return (<div className="winner">Winner is {this.props.winner}</div>);
    }
}

export default Winner;