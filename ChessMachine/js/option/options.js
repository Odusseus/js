var Options = (function () {

    function Options(initialSoundState, initialLanguage, playerName, startCashRegister, startCoinPurses) {
        var self = this;

        self.soundState = ko.observable(initialSoundState);

        self.language = ko.observable(initialLanguage);

        self.playerName = playerName;

        self.startCashRegister = startCashRegister;
        self.startCoinPurses = startCoinPurses;

    }

    return Options;
})();
