import React, { Component } from 'react';
import cardBack from '../assets/images/card-back.png'
import '../assets/styles/index.css'

export default class Card extends Component {

    render() {
        let p = this.props,
           c = p.cat,
           cardUrl  = c.matched || p.selectedCard.id === c.id || p.attemptedMatch.id === c.id ? c.img : cardBack,
           sHeight = window.innerHeight
              || document.documentElement.clientHeight
              || document.body.clientHeight;

        return (
            <div>
                <img className="cardImage" src={cardUrl} alt="Unable To Display Cat" height={sHeight * .22} width={sHeight * .10}/>
            </div>
        );
    }
}