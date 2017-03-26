import React, { Component } from 'react';
import * as bs from 'react-bootstrap';

class Vote extends Component {
    getMatchSeats() {
        return this.props.match || [];
    }
    isDisabled() {
        return this.props.votingDisabled;
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-1">
                </div>

                {this.getMatchSeats().map(entry =>
                    <div key={entry} className="col-md-5">
                    <bs.Button key={entry}
                        disabled={this.isDisabled()}
                        className="btn btn-primary btn-lg"
                        onClick={() => this.props.vote(entry)}>
                        Vote for {entry}
                        </bs.Button>
                    </div>
                )}
                
                <div className="col-md-1">
                </div>
            </div>
        );
    }
}

export default Vote;