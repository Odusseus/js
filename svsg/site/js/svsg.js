var Svsg = {};

Svsg.globals = function(){
    this.size = 0;
};

Svsg.queenDirectionEnum = {
    UP :        {value: 0, name: "Up", code: "UP"},
    UPRIGHT :   {value: 1, name: "Up-Right", code: "UR"},
    RIGHT :     {value: 2, name: "Right", code: "RI"},
    DOWNRIGHT : {value: 3, name: "Down-Right", code: "DR"},
    DOWN :      {value: 4, name: "Down", code: "DO"},
    DOWNLEFT :  {value: 5, name: "Down-Left", code: "DL"},
    LEFT :      {value: 6, name: "Left", code: "LE"},
    UPLEFT :    {value: 7, name: "Up-Left", code: "UL"},
};

Svsg.direction = function(directionEnum) {
    this.current = 0;
    this.directionEnum = directionEnum;
    this.setCurrentDirection = function(){
        for(var key in this.directionEnum){
            var element = this.directionEnum[key];
            if(element.value == this.current){                
                return element;
            }
        }
        return undefined;
    };
    
    this.next = function() {
        this.current++;
        this.currentDirection = this.setCurrentDirection();
    };
    this.currentDirection = this.setCurrentDirection();
};

Svsg.setOutput = function(outputFieldname, value) {
    
    var outputField = document.getElementById(outputFieldname);
    outputField.innerHTML = value;
};

Svsg.queen = function(id) {
    this.id = id;
    this.line = this.id;
    this.getColumn = function(){
        var column = 0;        
        if(!Svsg.globals.size){
            Svsg.globals.size = 0;
        }
        column = Math.floor(Math.random() * Svsg.globals.size);
        return column;
    };
    this.column = this.getColumn();

    this.getReach = function(){ 
        
        // for(var currentDirection = Svsg.QueenDirectionEnum.UP;
        //     currentDirection.value < Svsg.QueenDirectionEnum.MAX; 
        //     ){

        // }

        var directions = [""];

        return 0;
    };
    this.reach = this.getReach();
};

Svsg.go = function(size, outputFieldname) {

    Svsg.globals.size = size;

    var fields = Svsg.globals.size * Svsg.globals.size;

    var queens = [];
    
    for(i = 0; i < Svsg.globals.size; i++){
        queens.push(new Svsg.queen(i));
    }
    
    var queensMessage = "";
    queens.forEach(function(element) {
      queensMessage += "(" + element.id + "," +element.line +","+ element.column + "),";
  }, this); 

   var output = fields + " : " + queensMessage;

    Svsg.setOutput(outputFieldname, output);
};


