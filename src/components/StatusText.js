import React, { Component } from 'react';

export default class StatusText extends Component {

    render() {
        return (
            <div className="statusText">
                { this.props.activeText }
            </div>
        );
    }
}