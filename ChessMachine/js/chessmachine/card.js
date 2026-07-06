var ChessMachine = ChessMachine || {};

ChessMachine.Card = function (name, color, value) {
    "use strict";

    this.randomNumber = Math.random();

    this.name = name;
    this.color = color;
    this.value = value;
};

ChessMachine.Card.prototype.getName = function () {
    return this.name;
};

ChessMachine.Card.prototype.getColor = function () {
    return this.color;
};

ChessMachine.Card.prototype.getValue = function () {
    return this.value;
};

ChessMachine.Card.prototype.getRandomNumber = function () {
    return this.randomNumber;
};

ChessMachine.Cards = function () {
    "use strict";

    this.cards = [];

    this.cards.push(new ChessMachine.Card('rook', 'white', 5));
    this.cards.push(new ChessMachine.Card('rook', 'white', 5));

    this.cards.push(new ChessMachine.Card('knight', 'white', 3));
    this.cards.push(new ChessMachine.Card('knight', 'white', 3));

    this.cards.push(new ChessMachine.Card('bishop', 'white', 3));
    this.cards.push(new ChessMachine.Card('bishop', 'white', 3));

    this.cards.push(new ChessMachine.Card('queen', 'white', 9));
    this.cards.push(new ChessMachine.Card('king', 'white', 50));
    this.cards.push(new ChessMachine.Card('pawn', 'white', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'white', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'white', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'white', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'white', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'white', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'white', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'white', 1));

    //black
    this.cards.push(new ChessMachine.Card('rook', 'black', 5));
    this.cards.push(new ChessMachine.Card('rook', 'black', 5));

    this.cards.push(new ChessMachine.Card('knight', 'black', 3));
    this.cards.push(new ChessMachine.Card('knight', 'black', 3));

    this.cards.push(new ChessMachine.Card('bishop', 'black', 3));
    this.cards.push(new ChessMachine.Card('bishop', 'black', 3));

    this.cards.push(new ChessMachine.Card('queen', 'black', 9));
    this.cards.push(new ChessMachine.Card('king', 'black', 100));
    this.cards.push(new ChessMachine.Card('pawn', 'black', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'black', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'black', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'black', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'black', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'black', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'black', 1));
    this.cards.push(new ChessMachine.Card('pawn', 'black', 1));

    this.cards.sort(function (a, b) { return b.getRandomNumber() - a.getRandomNumber(); });

};

ChessMachine.Cards.prototype.getCards = function () {
    return this.cards;
};

ChessMachine.Cards.prototype.getLength = function () {

    var l = this.getCards().length;

    return l;
};

ChessMachine.Cards.prototype.getCard = function (id) {
    //var card = this.getCards()[id];
    var card = this.cards[id];
    return card;
};