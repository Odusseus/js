var Ocb = {}

Ocb.boardWidth = 400;
Ocb.squareWidth = 50;

    Ocb.resizeBoard = function(x){

        var board = document.getElementById("boardId");
        board.setAttribute("style","width:" + x.toString() + "px; height:" + x.toString() + "px");

    };

    Ocb.resizeSquare = function(x){
        var squares = document.getElementsByClassName("square");
        for(var i=0; i<squares.length; i++){
            squares[i].setAttribute("style","width:" + x.toString() + "px; height:" + x.toString() + "px");
        }
    };

    Ocb.zoomIn = function(){
        Ocb.boardWidth -= 10;
        Ocb.squareWidth = Ocb.boardWidth / 8;

        Ocb.resizeSquare(Ocb.squareWidth);
        Ocb.resizeBoard(Ocb.boardWidth);
    };

    Ocb.zoomOut = function(){
        Ocb.boardWidth += 10;
        Ocb.squareWidth = Ocb.boardWidth / 8;

        Ocb.resizeSquare(Ocb.squareWidth);
        Ocb.resizeBoard(Ocb.boardWidth);
    };

//Ocb.resizeBoard(100);