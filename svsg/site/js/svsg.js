var Svsg = {};

Svsg.formatNumberLength = function(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
};

Svsg.globals = function(){
    this.size = 1;
};
Svsg.getSizeLenght = function(){
            var string = "" + Svsg.globals.size;
            return string.length;
        };

Svsg.ColumnLineToId = function(column, line){
    if(!Svsg.globals.size){
        Svsg.globals.size = 1;
    }
    var id = Svsg.globals.size * (line - 1) + column; 
    return id;
};

Svsg.field = function(column, line){
    this.column = column;
    this.line = line;
  
    this.id = Svsg.ColumnLineToId(column, line); 
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
    this.line = 1;
    this.column = 1;

    this.setRandomColumn = function(){
        var column = 1;        
        if(!Svsg.globals.size){
            Svsg.globals.size = 1;
        }
        column = Math.floor(Math.random() * Svsg.globals.size) + 1;
        this.column = column;
    };

    this.getUpFields = function(){
        var fields = [];
        var line = this.line;
        while(line < Svsg.globals.size) {
            line++;
            var field = new Svsg.field(this.column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getUpRightFields = function(){
        var fields = [];
        var column = this.column;
        var line = this.line;
        while(colimn < Svsg.globals.size && line < Svsg.globals.size) {
            column++;
            line++;
            var field = new Svsg.field(column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getRightFields = function(){
        var fields = [];
        var column = this.column;
        while(column < Svsg.globals.size) {
            column++;
            var field = new Svsg.field(column, this.line);
            fields.push(field);
        }
        return fields;
    };

    this.getDownRightFields = function(){
        var fields = [];
        var column = this.column;
        var line = this.line;
        while(column < Svsg.globals.size && line > 1) {
            column ++;
            line--;
            var field = new Svsg.field(column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getDownFields = function(){
        var fields = [];
        var line = this.line;
        while(line > 1) {
            line--;
            var field = new Svsg.field(this.column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getLeftDownFields = function(){
        var fields = [];
        var column = this.column;
        var line = this.line;
        while(column > 1 && line > 1) {
            column--;
            line--;
            var field = new Svsg.field(column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getLeftFields = function(){
        var fields = [];
        var column = this.column;
        while(column > 1) {
            column--;
            var field = new Svsg.field(column, this.line);
            fields.push(field);
        }
        return fields;
    };

    this.getLeftUpFields = function(){
        var fields = [];
        var column = this.column;
        var line = this.line;
        while(column > 1 && line < Svsg.globals.size) {
            column--;
            line++;
            var field = new Svsg.field(column, line);
            fields.push(field);
        }
        return fields;
    };

    this.reach = [];

    this.setReach = function(){ 
        var fields = [];
        new Svsg.field(this.column, this.line);

        for(var currentDirection = new Svsg.direction(Svsg.queenDirectionEnum);
             currentDirection.value < Object.keys(Svsg.queenDirectionEnum).length;
             currentDirection.next()
             ){
                if(currentDirection == Svsg.queenDirectionEnum.UP) {
                    fields.concat(this.getUpFields());
                }
                if(currentDirection == Svsg.queenDirectionEnum.UPRIGHT) {
                    fields.concat(this.getUpRightFields());
                }
                if(currentDirection == Svsg.queenDirectionEnum.RIGHT) {
                    fields.concat(this.getRightFields());
                }
                if(currentDirection == Svsg.queenDirectionEnum.DOWNRIGHT) {
                    fields.concat(this.getDownRightFields());
                }
                if(currentDirection == Svsg.queenDirectionEnum.DOWN) {
                    fields.concat(this.getDownFields());
                }
                if(currentDirection == Svsg.queenDirectionEnum.DOWNLEFT) {
                    fields.concat(this.getDownLeftFields());
                }
                if(currentDirection == Svsg.queenDirectionEnum.LEFT) {
                    fields.concat(this.getLeftFields());
                }
                if(currentDirection == Svsg.queenDirectionEnum.UPLEFT) {
                    fields.concat(this.getUpLeftFields());
                }                
         }        
         this.reach = fields;
    };
    
    this.getFieldIds = function(){
        var ids = [];
        this.reach.forEach(function(element) {
            ids.push(element.id);            
        }, this);
        ids.sort();
    };
    this.fieldIds = this.getFieldIds();
    this.displayFields = function(){
        var output = "";
        var repeat = Svsg.globals.size * Svsg.getSizeLenght();
        output += "<div>"; 
        for(var line = Svsg.globals.size; line > 1; line--){
            output += '_'.repeat(repeat); 
            output += Svsg.formatNumberLength(line, Svsg.getSizeLenght())  + "|";
            for(var column = 1; column < Svsg.globals.size; column++){
                var id = Svsg.ColumnLineToId(column, line);
              if(this.fieldIds[id] != undefined){
                output += Svsg.formatNumberLength(1, Svsg.getSizeLenght());
            }
            else {
                output += '.'.repeat(repeat); 
              }
            }
            output += "<br>"; 
            output += '_'.repeat(repeat); 
        }
        output += "</div>"; 
        return output;
    };
};

Svsg.go = function(size, outputFieldname) {

    Svsg.globals.size = size;

    var fields = Svsg.globals.size * Svsg.globals.size;

    var queens = [];
    
    for(i = 0; i < Svsg.globals.size; i++){
        var queen = new Svsg.queen(i);
        queen.setReach();

        queens.push(new Svsg.queen(i));
    }
    
    var queensMessage = "";
    queens.forEach(function(element) {
      queensMessage += "(" + element.id + "," +element.line +","+ element.column + "),";
  }, this); 

   //var output = fields + " : " + queensMessage;

    //Svsg.setOutput(outputFieldname, output);

    var output = queens[0].displayFields();
    Svsg.setOutput(outputFieldname, output);
};


