var ChessMachine = ChessMachine || {};
ChessMachine.Common = ChessMachine.Common || {};

ChessMachine.Common.VERSION = '1.0.0';
ChessMachine.Common.NAME = 'ChessMachine';
ChessMachine.Common.GAME_STORE = "GAMECM";
ChessMachine.Common.OPTION_STORE = "OPTIONCM";
ChessMachine.Common.HISCORE_STORE = "HISCORECM";
ChessMachine.Common.OPTION_SOUND_OFF = "off";
ChessMachine.Common.OPTION_SOUND_ON = "on";
ChessMachine.Common.DEFAULT_LANGUAGE = "English";
ChessMachine.Common.SPEED = 50;

ChessMachine.Common.getRandomFromInterval = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
};

ChessMachine.Common.isStorable = function () {
    if (typeof (Storage) === "undefined") {
        alert("Sorry, your browser does not support web storage...");
        return false;
    }
    return true;
};

ChessMachine.Common.resetGame = function () {
    if (!ChessMachine.Common.isStorable()) {
        return false;
    }
    localStorage.removeItem(ChessMachine.Common.GAME_STORE);
};

ChessMachine.Common.gup = function (nameIn) {
    var name = nameIn.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results === null) return "";
    else return results[1];
};

//#region DateTime


ChessMachine.Common.DateTime = function () {
    if (!(this instanceof ChessMachine.Common.DateTime)) throw new Error("Constructor can't be called a function");

    var datumTijd = null;

    this.setDatumTijd = function (newDatumTijd) {
        this.datumTijd = newDatumTijd;
    };

    this.setToday = function () {

        this.datumTijd = new Date();
    };


    this.setStringDatum = function (stringDatum) {
        if (stringDatum === null) {
            return null;
        }

        var elements = stringDatum.split('-');

        var newDate = new Date();
        newDate.setFullYear(elements[2], (elements[1] - 1), elements[0]);

        this.datumTijd = newDate;

    };

    this.getDatumTijd = function () {
        return this.datumTijd;
    };

    this.addDays = function (days) {
        if (days !== null || days !== undefined) {
            this.datumTijd.setTime(this.datumTijd.getTime() + days * 86400000);
        }
    };


    this.toString = function () {

        theMonth = this.datumTijd.getMonth() + 1;
        theDate = this.datumTijd.getDate();
        theYear = this.datumTijd.getFullYear();
        theHours = this.datumTijd.getHours();
        theMinutes = this.datumTijd.getMinutes();
        theSecondes = this.datumTijd.getSeconds();

        var newTime = theDate + "-" + theMonth + "-" + theYear + " " + theHours + ":" + theMinutes + ":" + theSecondes;

        return newTime;
    };

    this.monthDateYearToString = function () {

        if (this.datumTijd === null) {
            return null;
        }

        theMonth = this.datumTijd.getMonth() + 1;
        theDate = this.datumTijd.getDate();
        theYear = this.datumTijd.getFullYear();

        var newTime = theDate + "-" + theMonth + "-" + theYear;

        return newTime;
    };

};
//#endregion DateTime

//#region Storage
Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};
//#endregion Storage