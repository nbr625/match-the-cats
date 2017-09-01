import React, { Component } from 'react';
import cardBack from '../assets/images/card-back.png'
import '../assets/styles/index.css'

class Card extends Component {

    render() {
        let p = this.props,
           c = p.cat,
           cardUrl  = c.matched || !!p.selectedCard && p.selectedCard.id === c.id ? c.img : cardBack,
           sHeight = window.innerHeight
              || document.documentElement.clientHeight
              || document.body.clientHeight;

        return (
            <div>
                <img className="cardImage" src={cardUrl} alt="Unable To Display Cat" height={sHeight * .2} width={sHeight * .10}/>
            </div>
        );
    }
}

export default Card;