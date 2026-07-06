var ChessMachine = ChessMachine || {};
ChessMachine.Common = ChessMachine.Common || {};

var Globalize = Globalize || {};

ChessMachine.Help = (function () {
    "use strict";

    return {
        localize: function () {
        if (localStorage.getItem(ChessMachine.Common.OPTION_STORE) !== null) {
            var option = localStorage.getObject(ChessMachine.Common.OPTION_STORE);
            Globalize.culture(option.language.code);
        }

        document.getElementById("help-title").innerHTML = Globalize.localize("help-title", Globalize.culture().name);
        document.getElementById("help-illustrator").innerHTML = Globalize.localize("help-illustrator", Globalize.culture().name);
        document.getElementById("help-author").innerHTML = Globalize.localize("help-author", Globalize.culture().name);
        document.getElementById("help-text1").innerHTML = Globalize.localize("help-text1", Globalize.culture().name);
        document.getElementById("help-text2").innerHTML = Globalize.localize("help-text2", Globalize.culture().name);
        document.getElementById("help-menu").innerHTML = Globalize.localize("help-menu", Globalize.culture().name);

        return true;
        }
        

};
})();


window.onload = function () {
    ChessMachine.Help.localize();
};
