var ChessMachine = ChessMachine || {};
ChessMachine.Common = ChessMachine.Common || {};

var Globalize = Globalize || {};

function OptionViewModel() {
    "use strict";

    var self = this;

    if (localStorage.getItem(ChessMachine.Common.OPTION_STORE) !== null) {

        var option = localStorage.getObject(ChessMachine.Common.OPTION_STORE);
        Globalize.culture(option.language.code);
    }

    self.availableSoundStates = [
       { code: "on", name: Globalize.localize("option-on", Globalize.culture().name) },
       { code: "off", name: Globalize.localize("option-off", Globalize.culture().name) }
    ];

    self.availableLanguages = [
       { code: "en", name: Globalize.culture("en").nativeName },
       { code: "nl", name: Globalize.culture("nl").nativeName },
       { code: "fr", name: Globalize.culture("fr").nativeName },
       { code: "de", name: Globalize.culture("de").nativeName }
    ];


    self.localize = function () {
        Globalize.culture(self.option.language().code);

        //Globalize.culture("en");

        //    //document.getElementById("info").innerHTML =  Globalize.culture().name;

        document.getElementById("option-options").innerHTML = Globalize.localize("option-options", Globalize.culture().name);
        document.getElementById("option-myOptionsAre").innerHTML = Globalize.localize("option-myOptionsAre", Globalize.culture().name);
        document.getElementById("option-sound").innerHTML = Globalize.localize("option-sound", Globalize.culture().name);
        document.getElementById("option-language").innerHTML = Globalize.localize("option-language", Globalize.culture().name);
        document.getElementById("option-theCashRegisterStartWith").innerHTML = Globalize.localize("option-theCashRegisterStartWith", Globalize.culture().name);
        document.getElementById("option-coins").innerHTML = Globalize.localize("option-coins", Globalize.culture().name);
        document.getElementById("option-coins2").innerHTML = Globalize.localize("option-coins", Globalize.culture().name);
        document.getElementById("option-yourCoinPursesStartWith").innerHTML = Globalize.localize("option-yourCoinPursesStartWith", Globalize.culture().name);
        document.getElementById("option-menu").innerHTML = Globalize.localize("option-menu", Globalize.culture().name);
        document.getElementById("option-save").innerHTML = Globalize.localize("option-save", Globalize.culture().name);
        document.getElementById("option-resetGame").innerHTML = Globalize.localize("option-resetGame", Globalize.culture().name);
        document.getElementById("option-resetGame").setAttribute('title', Globalize.localize("option-resetCurrentGame", Globalize.culture().name));
        document.getElementById("option-resetAll").innerHTML = Globalize.localize("option-resetAll", Globalize.culture().name);
        document.getElementById("option-resetAll").setAttribute('title', Globalize.localize("option-resetOptionsCurrentGame", Globalize.culture().name));

        ////"resetCurrentGame": "Huidige speel resetten",
        ////"resetOptionsCurrentGame": "Opties, huidige speel en de Hi-score resetten",
        
    };

    self.start = function () {

        self.restore();

        var infoTag = ChessMachine.Common.gup("info");

        if (infoTag) {

            var info = Globalize.localize(infoTag, Globalize.culture().name);

            document.getElementById('info').innerHTML = info;
        }

    };

    self.restore = function () {


        if (ChessMachine.Common.isStorable()) {
            if (localStorage.getItem(ChessMachine.Common.OPTION_STORE) === null) {
                self.option = new Options(self.availableSoundStates[0], self.availableLanguages[0], "my name", 1000, 1000);
                Globalize.culture(self.availableLanguages[0].code);
                self.storeNow();
                self.localize();
                return true;
            } else {
                var option = localStorage.getObject(ChessMachine.Common.OPTION_STORE);

                var soundStateIndex = 0;
                for (var i = 0; self.availableSoundStates !== null && i < self.availableSoundStates.length; i++) {
                    if (self.availableSoundStates[i].code === option.soundState.code) {
                        soundStateIndex = i;
                        break;
                    }
                }

                var languageIndex = 0;
                for (var ii = 0; self.availableLanguages !== null && ii < self.availableLanguages.length; ii++) {
                    if (self.availableLanguages[ii].code === option.language.code) {
                        languageIndex = ii;
                        break;
                    }
                }

                self.option = new Options(self.availableSoundStates[soundStateIndex], self.availableLanguages[languageIndex], option.playerName, option.startCashRegister, option.startCoinPurses);
                self.localize();
                return true;
            }
        }
        return false;
    };

    self.store = function () {
        if (self.storeNow()) {
            Globalize.culture(self.option.language().code);

            window.location = "/option.html" + "?info=" + "option-optionsAreSaved";

        }

    };
    
    self.storeNow = function () {
        if (!ChessMachine.Common.isStorable()) {
            return false;
        }

        var hulpOption = ko.toJS(self.option);

        localStorage.setObject(ChessMachine.Common.OPTION_STORE, hulpOption);

        return true;
    };

    self.resetTables = function () {
        if (!ChessMachine.Common.isStorable()) {
            return false;
        }
        localStorage.clear();

        window.location = "../option.html" + "?info=" + "option-allTheDataAreReseted";
        return true;


    };

    self.resetGame = function () {
        if (!ChessMachine.Common.isStorable()) {
            return false;
        }
        localStorage.removeItem(ChessMachine.Common.GAME_STORE);

        document.getElementById('info').innerHTML = Globalize.localize("option-theCurrentGameIsReseted", Globalize.culture().name);
    };

}

