import React, { Component } from 'react';

export default class Score extends Component {

    render() {
        let playerOneColor = this.props.activePlayer === 1 ? 'red' : 'gray',
            playerTwoColor = this.props.activePlayer === 2 ? 'red' : 'gray';

        return (
            <div className="scoreBoard">
                <div style={{ color: playerOneColor }} className="player">
                    <div className="playerTag">Player 1</div>
                    <div className="playerScore">{this.props.score[0]}</div>
                </div>
                <div style={{ color: playerTwoColor }} className="player">
                    <div className="playerTag">Player 2</div>
                    <div className="playerScore">{this.props.score[1]}</div>
                </div>
            </div>
        );
    }
}
