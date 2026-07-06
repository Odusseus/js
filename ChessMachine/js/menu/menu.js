var ChessMachine = ChessMachine || {};
ChessMachine.Common = ChessMachine.Common || {};

var Globalize = Globalize || {};

ChessMachine.Menu = (function () {
    "use strict";

    return {
        localize: function () {
        if (localStorage.getItem(ChessMachine.Common.OPTION_STORE) !== null) {
            var option = localStorage.getObject(ChessMachine.Common.OPTION_STORE);
            Globalize.culture(option.language.code);
        }

        document.getElementById("menu-title").innerHTML = Globalize.localize("menu-title", Globalize.culture().name);
        document.getElementById("menu-game").innerHTML = Globalize.localize("menu-game", Globalize.culture().name);
        document.getElementById("menu-hiScore").innerHTML = Globalize.localize("menu-hiScore", Globalize.culture().name);
        document.getElementById("menu-options").innerHTML = Globalize.localize("menu-options", Globalize.culture().name);
        document.getElementById("menu-game").innerHTML = Globalize.localize("menu-game", Globalize.culture().name);
        document.getElementById("menu-help").innerHTML = Globalize.localize("menu-help", Globalize.culture().name);

        return true;
        }
        

};
})();


window.onload = function () {
    ChessMachine.Menu.localize();
};
