var ChessMachine = ChessMachine || {};

ChessMachine.Carousel = function (name) {
    "use strict";

    this.name = name;
    this.cards = new ChessMachine.Cards();
    this.randomNumber = 0;

    this.functionInterval = null;
    this.soundInterval = null;
    this.currentCardNumber = 0;
    this.steps = 0;
    this.power = 0;
};

ChessMachine.Carousel.prototype.getName = function () {
    return this.name;
};

ChessMachine.Carousel.prototype.getCards = function () {
    return this.cards;
};

ChessMachine.Carousel.prototype.getRandomNumber = function () {
    return this.randomNumber;
};

ChessMachine.Carousel.prototype.setRandomNumber = function () {
    return this.randomNumber = ChessMachine.Common.getRandomFromInterval(0, this.cards.getLength() - 1);
};


ChessMachine.Carousel.prototype.setFunctionInterval = function (functionInterval) {
    this.functionInterval = functionInterval;
};

ChessMachine.Carousel.prototype.getFunctionInterval = function () {
    return this.functionInterval;
};

ChessMachine.Carousel.prototype.clearFunctionInterval = function () {
    clearInterval(this.functionInterval);
};


ChessMachine.Carousel.prototype.setSoundInterval = function (soundInterval) {
    this.soundInterval = soundInterval;
};

ChessMachine.Carousel.prototype.getSoundInterval = function () {
    return this.soundInterval;
};

ChessMachine.Carousel.prototype.clearSoundInterval = function () {
    clearInterval(this.soundInterval);
};



ChessMachine.Carousel.prototype.setCurrentCardNumber = function (currentCardNumber) {
    this.currentCardNumber = currentCardNumber;
};

ChessMachine.Carousel.prototype.getCurrentCardNumber = function () {

    return this.currentCardNumber;
};


ChessMachine.Carousel.prototype.getCurrentCard = function () {

    var currentCardNumber = this.currentCardNumber;
    //var card = this.cards.cards[currentCardNumber];
    var card = this.cards.getCard(currentCardNumber);
    return card;
};

ChessMachine.Carousel.prototype.setNextCurrentCardNumber = function () {
    this.currentCardNumber ++;

    if (this.currentCardNumber > this.cards.getLength() - 1) {
        this.currentCardNumber = 0;
    }
};

ChessMachine.Carousel.prototype.getNextCurrentCardNumber = function () {

    var next = this.currentCardNumber + 1;
    if (next > this.cards.getLength() - 1) {
        next = 0;
    }

    return next;
};

ChessMachine.Carousel.prototype.getNextCurrentCard = function () {

    var card = this.cards.getCard(this.getNextCurrentCardNumber());
    return card;
};

ChessMachine.Carousel.prototype.getPreviousCurrentCardNumber = function () {

    var next = this.currentCardNumber - 1;
    if (next < 0) {
        next = this.cards.getLength() - 1;
    }

    return next;
};

ChessMachine.Carousel.prototype.getPreviousCurrentCard = function () {

    var card = this.cards.getCard(this.getPreviousCurrentCardNumber());
    return card;
};


ChessMachine.Carousel.prototype.oneStep = function () {
    if (this.steps > 0) {
        this.steps--;
    }
    
};

ChessMachine.Carousel.prototype.getSteps = function () {
    return this.steps;
};

ChessMachine.Carousel.prototype.setSteps = function (step) {
    this.steps = step;
};


ChessMachine.Carousel.prototype.calculateSteps = function () {

    var numberOfCards = ChessMachine.Common.getRandomFromInterval(1, this.cards.getLength());
    power = ChessMachine.Common.getRandomFromInterval(0, 1);

    this.steps = numberOfCards + (numberOfCards * power);
};

ChessMachine.Carousel.prototype.getPower = function () {
    return this.power;
};

