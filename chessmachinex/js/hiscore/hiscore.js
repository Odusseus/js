var Hiscore = (function () {

    function Hiscore(coinPurses, games, name, date) {
        var self = this;

        self.coinPurses = coinPurses;
        self.games = games;
        self.name = name;
        self.date = date;
        if (games !== undefined && games > 0) {
            self.score = Math.round(coinPurses / games);
        }
    }

    return Hiscore;
})();
