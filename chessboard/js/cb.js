var Ocb = {}

Ocb.boardWidth = 400;

    Ocb.resizeBoard = function(x){

        var board = document.getElementById("boardId");
        board.setAttribute("style","width:" + x.toString() + "px; height:" + x.toString() + "px");

    };

    Ocb.zoomIn = function(){
        Ocb.boardWidth -= 10;
        Ocb.resizeBoard(Ocb.boardWidth);
    };

    Ocb.zoomOut = function(){
        Ocb.boardWidth += 10;
        Ocb.resizeBoard(Ocb.boardWidth);
    };

//Ocb.resizeBoard(100);