import React, { Component } from 'react';

class Score extends Component {


    render() {
        let playerOneColor = this.props.activePlayer === 1 ? 'red' : 'gray',
            playerTwoColor = this.props.activePlayer === 2 ? 'red' : 'gray';

        return (
            <div className="scoreBoard">
                <div style={{ color: playerOneColor }} className="player">Player 1 <span>{this.props.score[0]}</span></div>
                <div style={{ color: playerTwoColor }} className="player">Player 2 <span>{this.props.score[1]}</span></div>
            </div>
        );
    }
}

export default Score;