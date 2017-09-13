var Svsg = {};

Svsg.formatNumberLength = function(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
};

Svsg.sortNumber = function(a,b) {
    return a - b;
};

Svsg.global = function(){
    this.size = 1;
    this.maxFields = 1;
    // this.setSize = function(size){
    //     this.size = 1 * size;
    //     this.maxFields = this.size * this.size;
    // };
};
Svsg.getSizeLength = function(){
            var string = "" + Svsg.global.size;
            return string.length;
        };

Svsg.ColumnLineToId = function(column, line){
    if(!Svsg.global.size){
        Svsg.global.size = 1;
    }
    var id = Svsg.global.size * (line - 1) + column; 
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

aSvsg.queen = function(id, column, line) {
    this.id = id;
    this.column = column;
    this.line = line;

    this.idToColumnAndLine = function(){
        var columns = this.id;
        var maxColumn = Svsg.global.size / Svsg.global.size;
        var line = 1;
        while(columns < maxColumn){
            line++;
            columns-= maxColumn;
        }
        this.column = columns;
        this.line = line;
    };

    this.setRandomColumn = function(){
        var column = 1;        
        if(!Svsg.global.size){
            Svsg.global.size = 1;
        }
        column = Math.floor(Math.random() * Svsg.global.size) + 1;
        this.column = column;
    };

    this.getUpFields = function(){
        var fields = [];
        for(var line = this.line;
            line <= Svsg.global.size;
            line++) {
            var field = new Svsg.field(this.column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getUpRightFields = function(){
        var fields = [];
        for(var column = this.column,
            line = this.line;
            column <= Svsg.global.size && line <= Svsg.global.size;
            column++,
            line++) {
            var field = new Svsg.field(column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getRightFields = function(){
        var fields = [];        
        for(var column = this.column;column <= Svsg.global.size; column++) {
            var field = new Svsg.field(column, this.line);
            fields.push(field);
        }
        return fields;
    };

    this.getDownRightFields = function(){
        var fields = [];
        for( var column = this.column, line = this.line;
             column <= Svsg.global.size && line >= 1;
             column ++, 
             line--) {
            var field = new Svsg.field(column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getDownFields = function(){
        var fields = [];
        for( var line = this.line;
             line >= 1;
             line--) {
            var field = new Svsg.field(this.column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getDownLeftFields = function(){
        var fields = [];
        for( var column = this.column, 
             line = this.line;
             column >= 1 && line >= 1;
             column--,
             line--) {
            var field = new Svsg.field(column, line);
            fields.push(field);
        }
        return fields;
    };

    this.getLeftFields = function(){
        var fields = [];
        for(var column = this.column;
            column >= 1;
            column--) {
            var field = new Svsg.field(column, this.line);
            fields.push(field);
        }
        return fields;
    };

    this.getUpLeftFields = function(){
        var fields = [];
        for( var column = this.column, 
             line = this.line;
             column >= 1 && line <= Svsg.global.size;
             column--,
             line++) {
            var field = new Svsg.field(column, line);
            fields.push(field);
        }
        return fields;
    };

    this.hash = 0;
  
    this.setHash = function(){
        for(var i = 0; i < this.reach.length; i++) {
            this.hash += this.reach[i];
        }
    };
    

    this.reach = [];

    this.setReach = function(){ 
        var fields = [];
        var currentField = new Svsg.field(this.column, this.line);
        fields.push(currentField);

        for(var i = 0, direction = new Svsg.direction(Svsg.queenDirectionEnum);
            i < Object.keys(Svsg.queenDirectionEnum).length;
            i++,
            direction.next()){
                if(direction.currentDirection == Svsg.queenDirectionEnum.UP) {
                    fields.push.apply(fields,this.getUpFields());
                } else
                if(direction.currentDirection == Svsg.queenDirectionEnum.UPRIGHT) {
                    fields.push.apply(fields,this.getUpRightFields());
                } else
                if(direction.currentDirection == Svsg.queenDirectionEnum.RIGHT) {
                    fields.push.apply(fields,this.getRightFields());
                } else
                if(direction.currentDirection == Svsg.queenDirectionEnum.DOWNRIGHT) {
                    fields.push.apply(fields,this.getDownRightFields());
                } else
                if(direction.currentDirection == Svsg.queenDirectionEnum.DOWN) {
                    fields.push.apply(fields,this.getDownFields());
                } else
                if(direction.currentDirection == Svsg.queenDirectionEnum.DOWNLEFT) {
                    fields.push.apply(fields,this.getDownLeftFields());
                } else
                if(direction.currentDirection == Svsg.queenDirectionEnum.LEFT) {
                    fields.push.apply(fields,this.getLeftFields());
                } else
                if(direction.currentDirection == Svsg.queenDirectionEnum.UPLEFT) {
                    fields.push.apply(fields,this.getUpLeftFields());
                }                
         }        
         this.reach = fields;
         this.setHash();
    };
    
    this.fieldIds = [];
    this.setFieldIds = function(){
        var ids = [];
        this.reach.forEach(function(element) {
            ids.push(element.id);            
        }, this);

        for(var i = 1; i <= Svsg.global.maxFields; i++){
            this.fieldIds[i] = ids.indexOf(i) != -1;
        }        
    };
    this.displayFields = function(){
        var output = "";
        var repeat = (Svsg.global.size * Svsg.getSizeLength()) + Svsg.getSizeLength() + (Svsg.global.size * 1);
        output += "<div>"; 
        for(var line = Svsg.global.size; line > 0; line--){
            output += '_'.repeat(repeat); 
            output += "<br>"; 
            output += Svsg.formatNumberLength(line, Svsg.getSizeLength())  + "|";
            for(var column = 1; column <= Svsg.global.size; column++){
                var id = Svsg.ColumnLineToId(column, line);
              if(this.fieldIds[id]){
                output += 'x'.repeat(Svsg.getSizeLength()) + "|";
                }
                else {
                    output += 'o'.repeat(Svsg.getSizeLength()) + "|"; 
                }
            }
            output += "<br>"; 
        }
        output += '_'.repeat(repeat); 
        output += "<br>"; 
        output += Svsg.formatNumberLength(this.id, Svsg.getSizeLength())  + "|"; 
        for(var column = 1; column <= Svsg.global.size; column++){
            output += Svsg.formatNumberLength(column, Svsg.getSizeLength())  + "|";            
        }
        output += "</div>"; 
        return output;
    };
};

Svsg.go = function(size, outputFieldname) {

    Svsg.global.size = 1 * size;
    Svsg.global.maxFields = Svsg.global.size * Svsg.global.size;

    //Svsg.global.setSize(size);

    var fields = Svsg.global.maxFields;

    var queens = [];
    var output = "";
    var progres = document.getElementById("progres");

    // for( var maxColumn = Svsg.global.size * Svsg.global.size,    
    for( var maxColumn = Svsg.global.size * Svsg.global.size,
         id = 1;
         id <= maxColumn;
         id++ ) {
         var queen = new Svsg.queen(id);
            queen.idToColumnAndLine();
            queen.setReach();
            queen.setFieldIds();
            queens.push(queen);
            output += queen.displayFields();
            progres.value = id;
        }
        
    // var queen = new Svsg.queen(1);
    // queen.idToColumnAndLine();
    // queen.setReach();
    // queen.setFieldIds();
    // queens.push(queen);
    // output += queen.displayFields();
    Svsg.setOutput(outputFieldname, output);
};


