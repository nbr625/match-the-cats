import React, { Component } from 'react';

class Card extends Component {


    render() {
        let s = this.state,
           cardUrl  = s.matched || s.selected ? s.img : 'defualt.jpg' ;

        return (
            <div className="Card">
                <img src={} alt=""/>
            </div>
        );
    }
}

export default Card;