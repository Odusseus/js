function HiscoreViewModel() {

    var self = this;

    self.hiscores = ko.observableArray([]);

    self.localize = function () {
        if (localStorage.getItem(ChessMachine.Common.OPTION_STORE) !== null) {
            var option = localStorage.getObject(ChessMachine.Common.OPTION_STORE);
            Globalize.culture(option.language.code);
        }

        document.getElementById("hiscore-title").innerHTML = Globalize.localize("hiscore-title", Globalize.culture().name);
        document.getElementById("hiscore-yourHiscore").innerHTML = Globalize.localize("hiscore-yourHiscore", Globalize.culture().name);
        document.getElementById("hiscore-games").innerHTML = Globalize.localize("hiscore-games", Globalize.culture().name);
        document.getElementById("hiscore-games2").innerHTML = Globalize.localize("hiscore-games", Globalize.culture().name);
        
        document.getElementById("hiscore-coinPurses").innerHTML = Globalize.localize("hiscore-coinPurses", Globalize.culture().name);
        document.getElementById("hiscore-coinPurses2").innerHTML = Globalize.localize("hiscore-coinPurses", Globalize.culture().name);
        
        document.getElementById("hiscore-date").innerHTML = Globalize.localize("hiscore-date", Globalize.culture().name);
        document.getElementById("hiscore-date2").innerHTML = Globalize.localize("hiscore-date", Globalize.culture().name);
        
        document.getElementById("hiscore-enterYourName").innerHTML = Globalize.localize("hiscore-enterYourName", Globalize.culture().name);
        document.getElementById("hiscore-ok").innerHTML = Globalize.localize("hiscore-ok", Globalize.culture().name);
        document.getElementById("hiscore-cancel").innerHTML = Globalize.localize("hiscore-cancel", Globalize.culture().name);
        document.getElementById("hiscore-scores").innerHTML = Globalize.localize("hiscore-scores", Globalize.culture().name);
        document.getElementById("hiscore-name").innerHTML = Globalize.localize("hiscore-name", Globalize.culture().name);
        
        return true;
    };

    self.restore = function () {
        self.localize();
        if (ChessMachine.Common.isStorable()) {
            if (localStorage.getItem(ChessMachine.Common.HISCORE_STORE) === null) {
                //self.hiscores = [new Hiscore(1500, 20, "Noël", "22-10-2013"),
                //                new Hiscore(200, 10, "Loeky", "12-08-2013" ),
                //                new Hiscore(15, 3, "Roland", "01-05-2013" )
                //               ];
                //self.store();
                return true;
            } else {
                var hiscores = localStorage.getObject(ChessMachine.Common.HISCORE_STORE);
                hiscores.sort(function (a, b) { return b.score - a.score; });

                for (var i = 0; hiscores !== null && i < hiscores.length; i++) {
                    self.hiscores.push(new Hiscore(hiscores[i].coinPurses, hiscores[i].games, hiscores[i].name, hiscores[i].date));
                }

                return true;
            }
        }
        return false;
    };

    self.store = function () {
        if (!ChessMachine.Common.isStorable()) {
            return false;
        }

        var hulpHiscores = ko.toJS(self.hiscores);

        localStorage.setObject(ChessMachine.Common.HISCORE_STORE, hulpHiscores);
        return true;
    };

    self.toggleOverlay = function () {
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
    };

    self.addHiscore = function () {
        var coinPurses = document.getElementById('coinPursesHiscore').innerHTML;
        var games = document.getElementById('gamesHiscore').innerHTML;
        var name = document.getElementById('nameHiscore').value;
        if (name === "") { name = "?";}
        var today = document.getElementById('todayHiscore').innerHTML;
        self.hiscores.push(new Hiscore(coinPurses, games, name, today));
        self.store();
        window.location = "hiscore.html";
    };

    self.checkHiscore = function () {
        var gamesParameter = ChessMachine.Common.gup("games");
        var coinPursesParameter = ChessMachine.Common.gup("coinPurses");
        var startCoinPursesParameter = ChessMachine.Common.gup("startCoinPurses");
        
        if (gamesParameter !== undefined && coinPursesParameter !== undefined) {
            if (!isNaN(gamesParameter) && !isNaN(coinPursesParameter) && gamesParameter !== "" && coinPursesParameter !== "") {
                if (!isNaN(gamesParameter)) {
                    var games = parseInt(gamesParameter, 0);
                    document.getElementById('gamesHiscore').innerHTML = games;
                }

                var startCoinPurses = 0;
                if (!isNaN(startCoinPursesParameter)) {
                    startCoinPurses = parseInt(startCoinPursesParameter, 0);
                }

                var coinPurses = 0;
                if (!isNaN(coinPursesParameter)) {
                    coinPurses = parseInt(coinPursesParameter, 0);
                }

                if (coinPurses > startCoinPurses) {
                    coinPurses -= startCoinPurses;
                }
                
                document.getElementById('coinPursesHiscore').innerHTML = coinPurses;

                var dateTime = new ChessMachine.Common.DateTime();
                dateTime.setToday();
                document.getElementById('todayHiscore').innerHTML = dateTime.monthDateYearToString();
                self.toggleOverlay();
            }
        }
    };

}

