import React, { Component } from 'react';
import Card from './Card'
import Score from './Score'
import StatusText from './StatusText';
import ReactAudioPlayer from 'react-audio-player'
import themeSong from '../assets/audio/theme-song.mp3';
import '../assets/styles/index.css'

export default class Game extends Component {

    constructor(props){
        super(props);

        this.state = {
            cats: this.createCatCards(),
            activePlayer: 1,
            score: [0, 0],
            selectedCard: {},
            attemptedMatch: {},
            activeText: 'Start us off Player 1',
            gameOver: false
        }

    }

    createCatCards = () =>{
        let cats = [];
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 2; j++){
                let cat = {};
                cat.id = i + j * 8;
                cat.img = "http://thecatapi.com/api/images/get.php?api_key=MTAx&id=b0" + i;
                cat.matched = false;
                cats.push(cat);
            }
        }
        return this.randomizeCats(cats)
    }

    randomizeCats = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    restartGame = () => {
        this.setState({
            cats: this.createCatCards(),
            activePlayer: 1,
            score: [0, 0],
            selectedCard: {},
            attemptedMatch: {},
            gameOver: false,
            activeText: 'Start us off Player 1'
        });
    }

    selectCard = (index) => {
        let s = this.state;
        if(!s.cats[index].matched) {
            let newCats = s.cats;
            if (!Object.keys(s.selectedCard).length) {
                this.setState({
                    cats: newCats,
                    selectedCard: { id: newCats[index].id, img: newCats[index].img }
                });
            } else {
                this.checkIfMatched(newCats, index);
            }
        }

    }

    checkIfMatched = (newCats, index) => {
        let s = this.state,
            selectedImage = s.selectedCard.img;

        if(newCats[index].img === selectedImage){
            newCats = newCats.map((cat) => {
                if(cat.img === selectedImage){
                    cat.matched = true;
                }
                return cat;
            });
            this.scoreUp(newCats)
        } else {
            this.changePlayer(newCats[index]);
        }

    }

    scoreUp = (newCards) => {
         let s = this.state,
             newScore = s.score;
         newScore[s.activePlayer - 1] = newScore[s.activePlayer - 1] + 1;

         this.setState({
             cats: newCards,
             selectedCard: {},
             matchedCard: {},
             score: newScore,
             activeText: 'Its a match! Well done Player ' + s.activePlayer + '!'
         });

         if( newScore.reduce((a, b) => a + b ) === 8){
            this.setState({ gameOver: true });
         }  else {
             setTimeout( () => {
                 this.setState({
                     activeText: 'Player ' + this.state.activePlayer + ' it is still your turn.'
                 })
             }, 1500)
         }

    }

    changePlayer = (card) => {
        let newPlayer = this.state.activePlayer === 1 ? 2 : 1;

        this.setState({
            activeText: 'Oh it is not a match...' ,
            attemptedMatch: {id: card.id, img: card.img}
        });
        setTimeout( () => {
            this.setState({
                activePlayer: newPlayer,
                selectedCard: {},
                attemptedMatch: {},
                activeText: 'Player ' + newPlayer + ' it is your move!'
            })
        }, 1500)


    }

    concludeGame = () => {
         this.setState({ activeText: 'Player ' + this.state.activePlayer + 'has mangaged to match more cats! Victory is yours!' });
    };

    renderGameOver = () => {
        let s = this.state;
        if(s.score[0] === s.score[1]){
            return (
                <div className="gameOver">
                    <p>It is a tie! You are equally matched!</p>
                    <div onClick={this.restartGame} className="rematchButton">Rematch?</div>
                </div>
            )

        }  else {
            return (
                <div className="gameOver">
                    <p>Player {s.activePlayer} has won!</p>
                    <div onClick={this.restartGame} className="rematchButton">Rematch?</div>
                </div>
            )
        }
    }

    render() {
        let s = this.state,
            cats = s.cats;
        return (
            <div className="game">
                <StatusText activeText={s.activeText}  />

                <div className="controls">
                    <div className="cardGrid">
                        {cats.map((c, i) => {
                            return (
                                <div className="card" onClick={() => this.selectCard(i)}>
                                    <Card cat={c} key={i} selectedCard={s.selectedCard} attemptedMatch={s.attemptedMatch} />
                                </div>
                            );
                        })}
                    </div>
                    <Score activePlayer={s.activePlayer} score={s.score}/>
                    <ReactAudioPlayer
                        src={themeSong}
                        autoPlay
                    />

                </div>
                {s.gameOver ? this.renderGameOver() : null}


            </div>
        );

    }
}
