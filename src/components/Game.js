import React, { Component } from 'react';
import Card from './Card'
import Score from './Score'
import '../assets/styles/index.css'

class Game extends Component {

    constructor(props){
        super(props);

        this.state = {
            cats: this.createCatCards(),
            activePlayer: 1,
            score: [0, 0]
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
            selectedCard: {}
        });
    }

    selectCard = (index) => {
        if(!this.state.cats[index].matched) {
            let newCats = this.state.cats;
            if (!this.state.selectedCard) {
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
            });
            this.setState({
                cats: newCats,
                selectedCard: {}
            });

            this.scoreUp(s.activePlayer)
        } else {
            this.changePlayer(s.activePlayer);
        }

    }

    scoreUp = (player) => {
         let newScore = this.state.score ;
         if(player === 1){
             newScore[0] = newScore[0] + 1
         } else {
             newScore[1] = newScore[1] + 1
         }
         this.setState({
             score: newScore
         })
         if( newScore.reduce((a, b) => a + b ) === 8){
            this.concludeGame();
         }

    }

    concludeGame = () => {
         alert('Player ' + this.state.activePlayer + 'has mangaged to match more cats! Victory is yours!' )
    }

    changePlayer = (player) => {
        let newPlayer = player === 1 ? 2 : 1;
        this.setState({
            activePlayer: newPlayer,
            selectedCard: {}
        })
    }

    render() {
        let s = this.state,
            cats = s.cats;
        return (
            <div>
                <div className="cardGrid">
                    {cats.map((c, i) => {
                        return (
                            <div className="card" onClick={() => this.selectCard(i)}>
                                <Card cat={c} key={i} selectedCard={s.selectedCard} />
                            </div>
                        );
                    })}
                </div>

                <Score activePlayer={s.activePlayer} score={s.score}/>
            </div>
        );
    }
}

export default Game;