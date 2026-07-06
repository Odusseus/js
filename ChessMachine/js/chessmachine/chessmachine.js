var ChessMachine = ChessMachine || {};
ChessMachine.Common = ChessMachine.Common || {};

var Globalize = Globalize || {};

ChessMachine.Main = (function () {
    "use strict";

    var getList = function (carousel) {

        var list = '';
        list += carousel.getRandomNumber();
        list += '<br>';

        for (var i = 0; i < carousel.getCards().getLength() ; i++) {
            if (i === carousel.getRandomNumber()) {
                list += '<br>' + '*';
            }
            list += carousel.getCards().getCards()[i].getColor() + ' ' + carousel.getCards().getCards()[i].getName();
            list += '<br>';
            if (i === carousel.getRandomNumber()) {
                list += '<br>';
            }

        }

        return list;
    };

    var getCardHtml = function (carousel) {

        var cardHtml = carousel.getCards().getCards()[carousel.getRandomNumber()].getColor() + ' ' + carousel.getCards().getCards()[carousel.getRandomNumber()].getName();
    
        return cardHtml;
    };

    var getCard = function (carousel) {

        var card = carousel.getCards().getCards()[carousel.getRandomNumber()];
    
        return card;
    };


    return {
        startCashRegister: 0,
        startCoinPurses: 0,
        cashRegister: 0,
        coinPurses: 0,
        roundNumber: 1,
        games: 0,
        firstCarousel : new ChessMachine.Carousel('one'),
        secondCarousel : new ChessMachine.Carousel('two'),
        thirdCarousel: new ChessMachine.Carousel('three'),
        lockFirstCard: false,
        lockSecondCard : false,
        lockThirdCard: false,
        win: 0,
        card1: null,
        card2: null,
        card3: null,
        goNowInterval: null,
        luckyNumber: 0, // 1 en 4
        roundRandom: 0, // 0 en 3
        countRound: 0,
        selected: 0,
        newGame: true,
        playSoundPlayerWintervalCount: 0,
        playSoundPlayerWinterval: null,
        soundState: ChessMachine.Common.OPTION_SOUND_ON,
        language: ChessMachine.Common.DEFAULT_LANGUAGE,
        toggleOverlay: function () {
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');
            overlay.style.opacity = 0.8;
            if (overlay.style.display === "block") {
                overlay.style.display = "none";
                specialBox.style.display = "none";
            } else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
        },
        localize: function () {
            if (localStorage.getItem(ChessMachine.Common.OPTION_STORE) !== null) {
                var option = localStorage.getObject(ChessMachine.Common.OPTION_STORE);
                Globalize.culture(option.language.code);
            }

            document.getElementById("chessmachine-youLoseAllYourCoins").innerHTML = Globalize.localize("chessmachine-youLoseAllYourCoins", Globalize.culture().name);
            document.getElementById("chessmachine-close").innerHTML = Globalize.localize("chessmachine-close", Globalize.culture().name);
            document.getElementById("chessmachine-title").innerHTML = Globalize.localize("chessmachine-title", Globalize.culture().name);
            document.getElementById("chessmachine-coinPurses").innerHTML = Globalize.localize("chessmachine-coinPurses", Globalize.culture().name);
            document.getElementById("chessmachine-games").innerHTML = Globalize.localize("chessmachine-games", Globalize.culture().name);
            document.getElementById("chessmachine-cashRegister").innerHTML = Globalize.localize("chessmachine-cashRegister", Globalize.culture().name);
            document.getElementById("chessmachine-3xSamePieces").innerHTML = Globalize.localize("chessmachine-3xSamePieces", Globalize.culture().name);
            document.getElementById("chessmachine-3xSamePieces").setAttribute('title', Globalize.localize("chessmachine-3xSamePiecesTitle", Globalize.culture().name));

            document.getElementById("chessmachine-3xSamePiecesAndColor").innerHTML = Globalize.localize("chessmachine-3xSamePiecesAndColor", Globalize.culture().name);
            document.getElementById("chessmachine-3xSamePiecesAndColor").setAttribute('title', Globalize.localize("chessmachine-3xSamePiecesAndColorTitle", Globalize.culture().name));

            document.getElementById("chessmachine-2xSamePieces").innerHTML = Globalize.localize("chessmachine-2xSamePieces", Globalize.culture().name);
            document.getElementById("chessmachine-2xSamePieces").setAttribute('title', Globalize.localize("chessmachine-2xSamePiecesTitle", Globalize.culture().name));

            document.getElementById("chessmachine-2xSamePiecesAndColor").innerHTML = Globalize.localize("chessmachine-2xSamePiecesAndColor", Globalize.culture().name);
            document.getElementById("chessmachine-2xSamePiecesAndColor").setAttribute('title', Globalize.localize("chessmachine-2xSamePiecesAndColorTitle", Globalize.culture().name));

            document.getElementById("chessmachine-1xKingLuckyNumber").innerHTML = Globalize.localize("chessmachine-1xKingLuckyNumber", Globalize.culture().name);
            document.getElementById("chessmachine-1xKingLuckyNumber").setAttribute('title', Globalize.localize("chessmachine-1xKingLuckyNumberTitle", Globalize.culture().name));

            document.getElementById("chessmachine-1xQueenLuckyNumber").innerHTML = Globalize.localize("chessmachine-1xQueenLuckyNumber", Globalize.culture().name);
            document.getElementById("chessmachine-1xQueenLuckyNumber").setAttribute('title', Globalize.localize("chessmachine-1xQueenLuckyNumberTitle", Globalize.culture().name));
            
            document.getElementById("chessmachine-luckyNumberIsYour4").innerHTML = Globalize.localize("chessmachine-luckyNumberIsYour4", Globalize.culture().name);
            document.getElementById("chessmachine-luckyNumberIsYour4").setAttribute('title', Globalize.localize("chessmachine-luckyNumberIsYour4Title", Globalize.culture().name));

            document.getElementById("chessmachine-winAmount").innerHTML = Globalize.localize("chessmachine-winAmount", Globalize.culture().name);
            document.getElementById("chessmachine-lockFirstCard").innerHTML = Globalize.localize("chessmachine-lock", Globalize.culture().name);
            document.getElementById("chessmachine-lockSecondCard").innerHTML = Globalize.localize("chessmachine-lock", Globalize.culture().name);
            document.getElementById("chessmachine-lockThirdCard").innerHTML = Globalize.localize("chessmachine-lock", Globalize.culture().name);

            document.getElementById("chessmachine-playButton").innerHTML = Globalize.localize("chessmachine-newGame", Globalize.culture().name);
            document.getElementById("chessmachine-menu").innerHTML = Globalize.localize("chessmachine-menu", Globalize.culture().name);
            document.getElementById("chessmachine-add5Coins").innerHTML = Globalize.localize("chessmachine-add5Coins", Globalize.culture().name);

            return true;
        },
        cleanScreen: function () {

            this.localize();
            
            document.getElementById('chessmachine-lockFirstCard').className = "lockDefault";
            document.getElementById('chessmachine-lockSecondCard').className = "lockDefault";
            document.getElementById('chessmachine-lockThirdCard').className = "lockDefault";

            document.getElementById('coinPurses').innerHTML = this.coinPurses;
            document.getElementById('cashRegister').innerHTML = this.cashRegister;
            document.getElementById('games').innerHTML = this.games;

            if (this.coinPurses === 0) {
                document.getElementById('chessmachine-playButton').innerHTML = Globalize.localize("chessmachine-insertCoins", Globalize.culture().name);
                document.getElementById('chessmachine-playButton').className = "insertCoinsButton";
            } else {
                document.getElementById('chessmachine-playButton').innerHTML = Globalize.localize("chessmachine-newGame", Globalize.culture().name);
                document.getElementById('chessmachine-playButton').className = "playButton";
            }

            this.firstCarousel.calculateSteps();
            this.secondCarousel.calculateSteps();
            this.thirdCarousel.calculateSteps();

            var card = this.firstCarousel.getNextCurrentCard();
            document.getElementById('nextCarousel1').className = card.getColor() + card.getName();
            document.getElementById('nextCarousel1').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            card = this.firstCarousel.getCurrentCard();
            document.getElementById('carousel1').className = card.getColor() + card.getName() + " defaultCardBorder";
            document.getElementById('carousel1').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            card = this.firstCarousel.getPreviousCurrentCard();
            document.getElementById('previousCarousel1').className = card.getColor() + card.getName();
            document.getElementById('previousCarousel1').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            card = this.secondCarousel.getNextCurrentCard();
            document.getElementById('nextCarousel2').className = card.getColor() + card.getName();
            document.getElementById('nextCarousel2').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            card = this.secondCarousel.getCurrentCard();
            document.getElementById('carousel2').className = card.getColor() + card.getName() + " defaultCardBorder";
            document.getElementById('carousel2').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            card = this.secondCarousel.getPreviousCurrentCard();
            document.getElementById('previousCarousel2').className = card.getColor() + card.getName();
            document.getElementById('previousCarousel2').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            card = this.thirdCarousel.getNextCurrentCard();
            document.getElementById('nextCarousel3').className = card.getColor() + card.getName();
            document.getElementById('nextCarousel3').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            card = this.thirdCarousel.getCurrentCard();
            document.getElementById('carousel3').className = card.getColor() + card.getName() + " defaultCardBorder";
            document.getElementById('carousel3').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            card = this.thirdCarousel.getPreviousCurrentCard();
            document.getElementById('previousCarousel3').className = card.getColor() + card.getName();
            document.getElementById('previousCarousel3').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

        },
        resetGames: function () {
            this.startCashRegister = 1000;
            this.startCoinPurses = 1000;

            if (localStorage.getItem(ChessMachine.Common.OPTION_STORE) !== null) {
                var option = localStorage.getObject(ChessMachine.Common.OPTION_STORE);
                this.soundState = option.soundState.code;
                this.language = option.language.language;
                this.startCashRegister = parseInt( option.startCashRegister,0);
                this.startCoinPurses = parseInt(option.startCoinPurses,0);
            }

            this.cashRegister = this.startCashRegister;
            this.coinPurses = this.startCoinPurses;
            this.roundNumber = 1;
            this.games = 0;

            this.lockFirstCard = false;
            this.lockSecondCard = false;
            this.lockThirdCard = false;

            ChessMachine.Common.resetGame();
            this.save();
            this.cleanScreen();
        },
        setLockFirstCard: function () {
            if (this.roundNumber !== 2) { return; }
            var className = null;
            if (this.lockFirstCard === false) {
                this.lockFirstCard = true;
                document.getElementById('chessmachine-lockFirstCard').className = "lockTrue";
                className = document.getElementById('carousel1').className;
                className = className.replace("defaultCardBorder", "");
                className.trim();
                document.getElementById('carousel1').className = className + " lockedCardBorder";
            } else {
                this.lockFirstCard = false;
                document.getElementById('chessmachine-lockFirstCard').className = "lockFalse";
                className = document.getElementById('carousel1').className;
                className = className.replace("lockedCardBorder", "");
                className.trim();
                document.getElementById('carousel1').className = className + " defaultCardBorder";
            }
        },
        setLockSecondCard: function () {
            if (this.roundNumber !== 2) { return; }
            var className = null;
            if (this.lockSecondCard === false) {
                this.lockSecondCard = true;
                document.getElementById('chessmachine-lockSecondCard').className = "lockTrue";
                className = document.getElementById('carousel2').className;
                className = className.replace("defaultCardBorder", "");
                className.trim();
                document.getElementById('carousel2').className = className + " lockedCardBorder";
            } else {
                this.lockSecondCard = false;
                document.getElementById('chessmachine-lockSecondCard').className = "lockFalse";
                className = document.getElementById('carousel2').className;
                className = className.replace("lockedCardBorder", "");
                className.trim();
                document.getElementById('carousel2').className = className + " defaultCardBorder";
            }
        },
        setLockThirdCard: function () {
            if (this.roundNumber !== 2) { return; }
            var className = null;
            if (this.lockThirdCard === false) {
                this.lockThirdCard = true;
                document.getElementById('chessmachine-lockThirdCard').className = "lockTrue";
                className = document.getElementById('carousel3').className;
                className = className.replace("defaultCardBorder", "");
                className.trim();
                document.getElementById('carousel3').className = className + " lockedCardBorder";
            } else {
                this.lockThirdCard = false;
                document.getElementById('chessmachine-lockThirdCard').className = "lockFalse";
                className = document.getElementById('carousel3').className;
                className = className.replace("lockedCardBorder", "");
                className.trim();
                document.getElementById('carousel3').className = className + " defaultCardBorder";
            }
        },
        addCoins: function () {
            if (this.soundState === ChessMachine.Common.OPTION_SOUND_ON) {
                var audioElement = document.createElement('audio');
                audioElement.setAttribute('src', 'sound/cash-register-01.mp3');
                audioElement.play();
                setTimeout(function () { ChessMachine.Main.addCoinsNow(); }, 0);
            } else {
                ChessMachine.Main.addCoinsNow();
            }

        },
        addCoinsNow: function () {
            
            this.coinPurses += 5;
            document.getElementById('coinPurses').innerHTML = this.coinPurses;

            document.getElementById('chessmachine-playButton').innerHTML = Globalize.localize("chessmachine-newGame", Globalize.culture().name);
            document.getElementById('chessmachine-playButton').className = "playButton";

            //clean luckynumber
            for (var i = 1; i < 5; i++) {
                var itemId = document.getElementById("item" + i);
                itemId.className = "default";
            }
            
        },
        save: function () {
            var game = new ChessMachine.Game();
            
            game.coinPurses = this.coinPurses;
            game.cashRegister = this.cashRegister;
            game.startCoinPurses = this.startCoinPurses;
            game.games = this.games;

            localStorage.setObject(ChessMachine.Common.GAME_STORE, game);
        },
        restore: function () {
            if (ChessMachine.Common.isStorable()) {
                if (localStorage.getItem(ChessMachine.Common.GAME_STORE) !== null) {
                    var game = localStorage.getObject(ChessMachine.Common.GAME_STORE);

                    this.coinPurses = game.coinPurses;
                    this.cashRegister = game.cashRegister;
                    this.startCoinPurses = game.startCoinPurses;
                    this.games = game.games;

                    if (localStorage.getItem(ChessMachine.Common.OPTION_STORE) !== null) {
                        var option = localStorage.getObject(ChessMachine.Common.OPTION_STORE);
                        this.soundState = option.soundState.code;
                        this.language = option.language.language;
                    }

                    return true;
                }
            }
            return false;
        },
        play: function () {
            if (!this.newGame){ 
                return false;
            } else {
                this.newGame = false;
            }
            if (this.roundNumber === 1 && this.coinPurses === 0) { return false; }
            if (this.countRound !== 0) { return false; }
            if (this.soundState === ChessMachine.Common.OPTION_SOUND_ON) {
                var audioElement = document.createElement('audio');
                audioElement.setAttribute('src', 'sound/cash-register-06.mp3');
                audioElement.play();

                ChessMachine.Main.playNow();

            } else {
                ChessMachine.Main.playNow();
            }

        },
        playNow: function () {

            document.getElementById('win1').getElementsByClassName('alarm1')[0].innerHTML = "&nbsp;";
            document.getElementById('win1').getElementsByClassName('alarm2')[0].innerHTML = "&nbsp;";
            document.getElementById('win2').getElementsByClassName('alarm1')[0].innerHTML = "&nbsp;";
            document.getElementById('win2').getElementsByClassName('alarm2')[0].innerHTML = "&nbsp;";
            document.getElementById('win3').getElementsByClassName('alarm1')[0].innerHTML = "&nbsp;";
            document.getElementById('win3').getElementsByClassName('alarm2')[0].innerHTML = "&nbsp;";

            document.getElementById('luckyNumber').getElementsByClassName('win')[0].innerHTML = "";
            document.getElementById('luckyNumber').getElementsByClassName('lose')[0].innerHTML = "";

            this.win = 0;

            if (this.roundNumber === 1) {
                this.games++;
                this.lockFirstCard = false;
                this.lockSecondCard = false;
                this.lockThirdCard = false;
                document.getElementById('chessmachine-lockFirstCard').className = "lockFalse";
                document.getElementById('chessmachine-lockSecondCard').className = "lockFalse";
                document.getElementById('chessmachine-lockThirdCard').className = "lockFalse";

                document.getElementById('chessmachine-playButton').innerHTML = Globalize.localize("chessmachine-play", Globalize.culture().name);
                document.getElementById('chessmachine-playButton').className = "playNewGameButton";

                //clean luckynumber
                for (var i = 1; i < 5; i++) {
                    var itemId = document.getElementById("item" + i);
                    itemId.className = "default";
                }

                this.coinPurses -= 5;
                this.cashRegister += 5;

                document.getElementById('coinPurses').innerHTML = this.coinPurses;
                document.getElementById('games').innerHTML = this.games;
                document.getElementById('cashRegister').innerHTML = this.cashRegister;
                document.getElementById('win').innerHTML = this.win;

                //this.firstCarousel.setRandomNumber();
                //this.secondCarousel.setRandomNumber();
                //this.thirdCarousel.setRandomNumber();
                ChessMachine.Main.playStep1();
            } else {
                ChessMachine.Main.playStep10();
            }
        },
        playStep1: function () {

            var speedMax = ChessMachine.Common.SPEED * 3;

            var speed1 = speedMax - (this.firstCarousel.getPower() * ChessMachine.Common.SPEED);
            this.firstCarousel.setFunctionInterval(setInterval(function () { ChessMachine.Main.playStep21(); }, speed1));
            this.firstCarousel.setSoundInterval(setInterval(function () { ChessMachine.Main.playCarouselSound(); }, 2500));

            var speed2 = speedMax - (this.secondCarousel.getPower() * ChessMachine.Common.SPEED);
            this.secondCarousel.setFunctionInterval(setInterval(function () { ChessMachine.Main.playStep22(); }, speed2));
            this.secondCarousel.setSoundInterval(setInterval(function () { ChessMachine.Main.playCarouselSound(); }, 2500));

            var speed3 = speedMax - (this.thirdCarousel.getPower() * ChessMachine.Common.SPEED);
            this.thirdCarousel.setFunctionInterval(setInterval(function () { ChessMachine.Main.playStep23(); }, speed3));
            this.thirdCarousel.setSoundInterval(setInterval(function () { ChessMachine.Main.playCarouselSound(); }, 2500));

        },
        playStep21: function () {
            
            this.firstCarousel.setNextCurrentCardNumber();
            this.firstCarousel.oneStep();

            var card = this.firstCarousel.getPreviousCurrentCard();
            document.getElementById('previousCarousel1').className = card.getColor() + card.getName();
            document.getElementById('previousCarousel1').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            this.card1 = this.firstCarousel.getCurrentCard();
            document.getElementById('carousel1').className = this.card1.getColor() + this.card1.getName() + " defaultCardBorder";
            document.getElementById('carousel1').title = this.card1.getValue() + ((this.card1.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));
            
            card = this.firstCarousel.getNextCurrentCard();
            document.getElementById('nextCarousel1').className = card.getColor() + card.getName();
            document.getElementById('nextCarousel1').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));


            if (this.firstCarousel.getSteps() === 0) {
                this.firstCarousel.clearFunctionInterval();
                this.firstCarousel.clearSoundInterval();
                ChessMachine.Main.playStep3();
                return;
            }
            
            if (this.firstCarousel.getSteps() < 4) {
                this.firstCarousel.clearSoundInterval();

            }
        },
        playStep22: function () {

            this.secondCarousel.setNextCurrentCardNumber();
            this.secondCarousel.oneStep();

            var card = this.secondCarousel.getPreviousCurrentCard();
            document.getElementById('previousCarousel2').className = card.getColor() + card.getName();
            document.getElementById('previousCarousel2').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            this.card2 = this.secondCarousel.getCurrentCard();
            document.getElementById('carousel2').className = this.card2.getColor() + this.card2.getName() + " defaultCardBorder";
            document.getElementById('carousel2').title = this.card2.getValue() + ((this.card2.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));


            card = this.secondCarousel.getNextCurrentCard();
            document.getElementById('nextCarousel2').className = card.getColor() + card.getName();
            document.getElementById('nextCarousel2').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            if (this.secondCarousel.getSteps() === 0) {
                this.secondCarousel.clearFunctionInterval();
                this.secondCarousel.clearSoundInterval();
                ChessMachine.Main.playStep3();
                return;
            }
            
            if (this.secondCarousel.getSteps() < 4) {
                this.secondCarousel.clearSoundInterval();

            }


        },
        playStep23: function () {
            this.thirdCarousel.setNextCurrentCardNumber();
            this.thirdCarousel.oneStep();

            var card = this.thirdCarousel.getPreviousCurrentCard();
            document.getElementById('previousCarousel3').className = card.getColor() + card.getName();
            document.getElementById('previousCarousel3').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            this.card3 = this.thirdCarousel.getCurrentCard();
            document.getElementById('carousel3').className = this.card3.getColor() + this.card3.getName() + " defaultCardBorder";
            document.getElementById('carousel3').title = this.card3.getValue() + ((this.card3.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            
            card = this.thirdCarousel.getNextCurrentCard();
            document.getElementById('nextCarousel3').className = card.getColor() + card.getName();
            document.getElementById('nextCarousel3').title = card.getValue() + ((card.getValue() === 1) ? " " + Globalize.localize("chessmachine-coin", Globalize.culture().name) : " " + Globalize.localize("chessmachine-coins", Globalize.culture().name));

            if (this.thirdCarousel.getSteps() === 0) {
                this.thirdCarousel.clearFunctionInterval();
                this.thirdCarousel.clearSoundInterval();
                ChessMachine.Main.playStep3();
                return;
            }
            
            if (this.thirdCarousel.getSteps() < 4) {
                this.thirdCarousel.clearSoundInterval();
            }

        },
        playCarouselSound: function(){
            if (this.soundState === ChessMachine.Common.OPTION_SOUND_ON) {
                var audioElement = document.createElement('audio');
                audioElement.setAttribute('src', 'sound/cameraclick-03.mp3');
                audioElement.play();
            }
        },
        playStep3: function () {
            if(this.firstCarousel.getSteps() === 0 
                && this.secondCarousel.getSteps() === 0
                && this.thirdCarousel.getSteps() === 0) {
                    ChessMachine.Main.playStep20();
            }
        },
        playStep10: function () {
            if (this.roundNumber === 2) {
                var speedMax = ChessMachine.Common.SPEED * 3;

                document.getElementById('chessmachine-lockFirstCard').className = "lockDefault";
                document.getElementById('chessmachine-lockSecondCard').className = "lockDefault";
                document.getElementById('chessmachine-lockThirdCard').className = "lockDefault";
                var className = null;
                if (this.lockFirstCard === true) {
                    className = document.getElementById('carousel1').className;
                    document.getElementById('carousel1').className = className + " lockedCardBorder";
                } else
                {
                    this.firstCarousel.calculateSteps();
                    var speed1 = speedMax - (this.firstCarousel.getPower() * ChessMachine.Common.SPEED);
                    this.firstCarousel.setFunctionInterval(setInterval(function () { ChessMachine.Main.playStep21(); }, speed1));
                    this.firstCarousel.setSoundInterval(setInterval(function () { ChessMachine.Main.playCarouselSound(); }, 2500));
                }
                if (this.lockSecondCard === true) {
                    className = document.getElementById('carousel2').className;
                    document.getElementById('carousel2').className = className + " lockedCardBorder";
                }
                else {
                    this.secondCarousel.calculateSteps();
                    var speed2 = speedMax - (this.secondCarousel.getPower() * ChessMachine.Common.SPEED);
                    this.secondCarousel.setFunctionInterval(setInterval(function () { ChessMachine.Main.playStep22(); }, speed2));
                    this.secondCarousel.setSoundInterval(setInterval(function () { ChessMachine.Main.playCarouselSound(); }, 2500));
                }
                if (this.lockThirdCard === true) {
                    className = document.getElementById('carousel3').className;
                    document.getElementById('carousel3').className = className + " lockedCardBorder";
                }
                else
                {
                    this.thirdCarousel.calculateSteps();
                    var speed3 = speedMax  - (this.thirdCarousel.getPower() * ChessMachine.Common.SPEED);
                    this.thirdCarousel.setFunctionInterval(setInterval(function () { ChessMachine.Main.playStep23(); }, speed3));
                    this.thirdCarousel.setSoundInterval(setInterval(function () { ChessMachine.Main.playCarouselSound(); }, 2500));
                }
                ChessMachine.Main.playStep3();
              }
            },
            playStep20: function () {

            this.roundNumber++;

            if (this.roundNumber === 3) {
                this.roundNumber = 1;
                document.getElementById('chessmachine-playButton').innerHTML = Globalize.localize("chessmachine-newGame", Globalize.culture().name);
                document.getElementById('chessmachine-playButton').className = "playButton";

                this.firstCarousel.calculateSteps();
                this.secondCarousel.calculateSteps();
                this.thirdCarousel.calculateSteps();
            }

            if (this.roundNumber === 2) {
                this.newGame = true;
                return;
            }

            if (this.card1.getName() === this.card2.getName()
                && this.card1.getName() === this.card3.getName()
                && this.card2.getName() === this.card3.getName()
                ) {
                this.win = 3 * this.card1.getValue();
                document.getElementById('win1').getElementsByClassName('alarm1')[0].innerHTML = Globalize.localize("chessmachine-win", Globalize.culture().name);

                if (this.card1.getColor() === this.card2.getColor()
                    && this.card1.getColor() === this.card3.getColor()
                    && this.card2.getColor() === this.card3.getColor()) {
                    this.win *= 2;
                    document.getElementById('win1').getElementsByClassName('alarm2')[0].innerHTML = Globalize.localize("chessmachine-win", Globalize.culture().name);
                }
            } else {
                if ((this.card1.getName() === this.card2.getName()
                    || this.card1.getName() === this.card3.getName()
                    || this.card2.getName() === this.card3.getName())
                    && !((this.card1.getName() === 'pawn' && this.card2.getName() === 'pawn')
                          || (this.card1.getName() === 'pawn' && this.card3.getName() === 'pawn')
                          || (this.card2.getName() === 'pawn' && this.card3.getName() === 'pawn'))
                    ) {
                    //document.getElementById('info').innerHTML = document.getElementById('info').innerHTML + "<br>" + "4";
                    if ((this.card1.getName() === this.card2.getName())
                        || (this.card1.getName() === this.card3.getName())
                        || (this.card2.getName() === this.card3.getName())) {
                        if (this.card1.getName() === this.card2.getName()) {
                            this.win = 2 * this.card1.getValue();
                        } else if (this.card1.getName() === this.card3.getName()) {
                            this.win = 2 * this.card1.getValue();
                        } else if (this.card2.getName() === this.card3.getName()) {
                            this.win = 2 * this.card2.getValue();
                        }
                    }
                    document.getElementById('win2').getElementsByClassName('alarm1')[0].innerHTML = Globalize.localize("chessmachine-win", Globalize.culture().name);
                    if ((this.card1.getName() === this.card2.getName() && this.card1.getColor() === this.card2.getColor())
                      || (this.card1.getName() === this.card3.getName() && this.card1.getColor() === this.card3.getColor())
                      || (this.card2.getName() === this.card3.getName() && this.card2.getColor() === this.card3.getColor())) {
                        this.win *= 2;
                        document.getElementById('win2').getElementsByClassName('alarm2')[0].innerHTML = Globalize.localize("chessmachine-win", Globalize.culture().name);
                    }
                } else {
                    ChessMachine.Main.playLuckyNumber();
                    return true;
                }
            }

            ChessMachine.Main.playEnd();
        },
        playLuckyNumber: function () {
            if (this.card1.getName() === 'king'
                    || this.card2.getName() === 'king'
                    || this.card3.getName() === 'king'
                    || this.card1.getName() === 'queen'
                    || this.card2.getName() === 'queen'
                    || this.card3.getName() === 'queen') {

                if (this.soundState === ChessMachine.Common.OPTION_SOUND_ON) {
                    var audioElement = document.createElement('audio');
                    audioElement.setAttribute('src', 'sound/beep-01.mp3');
                    audioElement.play();
                }


                this.goNowInterval = null;
                this.countRound = 0;
                this.luckyNumber = ChessMachine.Common.getRandomFromInterval(1, 4);
                var randomNumber = ChessMachine.Common.getRandomFromInterval(0, 3);
                //document.getElementById('luckyNumber').getElementsByClassName('textLuckNumber')[0].innerHTML = "your lucky number is " + this.luckyNumber;
                
                ChessMachine.Main.playLuckyNumberAnnimation(this.luckyNumber, randomNumber);
            }else{
                ChessMachine.Main.playEnd();
            }
        },
        playLuckyNumberAnnimation: function (luckyNb, roundRd) {
                this.luckyNumber = luckyNb;
                this.roundRandom = roundRd;
                this.countRound = (this.roundRandom * 4) + this.luckyNumber;
                this.selected = 0;
                
                this.goNowInterval = setInterval(function () { ChessMachine.Main.playLuckyNumberAnnimationNow(); }, 500);

        },
        playLuckyNumberAnnimationNow: function () {
            var itemId = null;
            if(this.selected !== 0){
                 itemId = document.getElementById("item" + this.selected);
                 itemId.className = "default";
            }
                this.selected++;
            
            if (this.selected === 5) {
                this.selected = 1;
            }
                        
            itemId = document.getElementById("item" + this.selected);
            itemId.className = "hightLight";

            this.countRound--;

            if (this.countRound === 0) {
                clearInterval(this.goNowInterval);
                ChessMachine.Main.playLuckyNumberNow();
            }

            return true;
        },
        playLuckyNumberNow: function () {
                if ((this.card1.getName() === 'king'
                    || this.card2.getName() === 'king'
                    || this.card3.getName() === 'king')
                    && this.luckyNumber === 4) {
                    
                    document.getElementById('win3').getElementsByClassName('alarm1')[0].innerHTML = Globalize.localize("chessmachine-win", Globalize.culture().name);
                    switch ('king') {
                        case this.card1.getName():
                            this.win = this.card1.getValue();
                            break;
                        case this.card2.getName():
                            this.win = this.card2.getValue();
                            break;
                        case this.card3.getName():
                            this.win = this.card3.getValue();
                            break;
                    }

                } else {
                    if ((this.card1.getName() === 'queen'
                         || this.card2.getName() === 'queen'
                         || this.card3.getName() === 'queen')
                         && this.luckyNumber === 4) {
                        document.getElementById('win3').getElementsByClassName('alarm2')[0].innerHTML = Globalize.localize("chessmachine-win", Globalize.culture().name);
                        switch ('queen') {
                            case this.card1.getName():
                                this.win = this.card1.getValue();
                                break;
                            case this.card2.getName():
                                this.win = this.card2.getValue();
                                break;
                            case this.card3.getName():
                                this.win = this.card3.getValue();
                                break;
                        }
                    }
                }
                if (this.win > 0) {
                    document.getElementById('luckyNumber').getElementsByClassName('win')[0].innerHTML = Globalize.localize("chessmachine-youWin", Globalize.culture().name);
                    if (this.soundState === ChessMachine.Common.OPTION_SOUND_ON) {
                        var audioElement = document.createElement('audio');
                        audioElement.setAttribute('src', 'sound/ChessMachinelause-light-02.mp3');
                        audioElement.play();
                    }
                } else {
                    document.getElementById('luckyNumber').getElementsByClassName('lose')[0].innerHTML = Globalize.localize("chessmachine-youLose", Globalize.culture().name);
                }
            ChessMachine.Main.playEnd();
        },
        playEnd: function () {
            if (this.win > 0) {
                if (this.cashRegister > this.win) {
                     this.cashRegister -= this.win;
                     this.coinPurses += this.win;
                } else {
                    var rest = this.win - this.cashRegister;
                    this.coinPurses += this.cashRegister;
                    this.cashRegister = 0;
                }
            }
            this.save();

            document.getElementById('coinPurses').innerHTML = this.coinPurses;
            document.getElementById('games').innerHTML = this.games;
            document.getElementById('win').innerHTML = this.win;
            document.getElementById('cashRegister').innerHTML = this.cashRegister;

            if (this.coinPurses === 0) {
                document.getElementById('chessmachine-playButton').innerHTML = Globalize.localize("chessmachine-insertCoins", Globalize.culture().name);
                document.getElementById('chessmachine-playButton').className = "insertCoinsButton";
                ChessMachine.Main.toggleOverlay();
            } else {
                if (this.cashRegister === 0) {
                    if (this.soundState === ChessMachine.Common.OPTION_SOUND_ON) {
                        setTimeout(function () { ChessMachine.Main.playerWin(); }, 500);
                    } else {
                        ChessMachine.Main.playerWinNow();
                    }
                } 
            }
            this.newGame = true;
        },
        playerWin: function () {
            if (this.soundState === ChessMachine.Common.OPTION_SOUND_ON) {

                this.playSoundPlayerWintervalCount = 3;
                this.playSoundPlayerWinterval = setInterval(function () { ChessMachine.Main.playSoundPlayerWin(); }, 1000);
                
            } else {
                setTimeout(function () { ChessMachine.Main.playerWinNow(); }, 2000);
            }
        },
        playSoundPlayerWin: function () {
            this.playSoundPlayerWintervalCount--;
            if (this.soundState === ChessMachine.Common.OPTION_SOUND_ON) {
                var audioElement = document.createElement('audio');
                audioElement.setAttribute('src', 'sound/cash-register-02.mp3');
                audioElement.play();
            }
            if (this.playSoundPlayerWintervalCount < 0) {
                clearInterval(this.playSoundPlayerWinterval);
                setTimeout(function () { ChessMachine.Main.playerWinNow(); }, 2000);
            }
        },
        openHiscore: function () {
            window.location = "/hiscore.html" + "?games=" + this.games + "&coinPurses=" + this.coinPurses + "&startCoinPurses=" + this.startCoinPurses;
            this.newGame = true;
            return true;
        },
        playerWinNow: function () {
            ChessMachine.Main.openHiscore();
           
            return true;
        }
        

    };
})();

window.onload = function () {
    if (ChessMachine.Main.restore() === false) {
        ChessMachine.Main.resetGames();
    }
    ChessMachine.Main.cleanScreen();
};
