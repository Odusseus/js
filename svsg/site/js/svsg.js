var Svsg = {};

Svsg.globalTemplate = function(){
    this.size = 1;
    this.maxFields = 1;
    this.queens = [];
    this.queensTarget = [];
    this.boardTarget = null;
    this.shadok = null;

    this.init = function(){
        this.size = 1;
        this.maxFields = this.size * this.size;
        this.queens = [];
        this.queensTarget = [];
        this.boardTarget = null;
        this.shadok = null;
        return this;
    };
};

Svsg.global = new Svsg.globalTemplate().init();

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

Svsg.colorEnum = {
 BLACK :  {value: 0, name: "Black", code: "B"},
 WHITE :  {value: 1, name: "White", code: "W"},
};

Svsg.pad = function(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
};

// Svsg.sleep = function(ms) {
//     return new Promise(resolve >= setTimeout(resolve, ms));
// };

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

// Svsg.field = function(column, line){
//     this.column = column;
//     this.line = line;
  
//     this.id = Svsg.ColumnLineToId(column, line); 
// };

Svsg.field = function(){
    this.column = 1;
    this.line = 1; 
    this.id = 1;
    this.piece = null;

    this.setColumn = function(column){
        this.column = column;
        return this;
    };

    this.setLine = function(line){
        this.line = line;
        return line;
    };

    this.setId = function(id){
        this.id = id;

        var columns = this.id;
        var line = 1;
        while(columns > Svsg.global.size){
            line++;
            columns-= Svsg.global.size;
        }
        this.line = line;
        this.column = columns;

        return this;
    };

    this.setPiece = function(piece){
        this.piece = piece;
        return this;
    };

    this.setColumnLineToId = function(column, line) {
        this.column = column;
        this.line = line;
        this.id = Svsg.ColumnLineToId(column, line); 
        return this;
    };

    this.getColor = function(){
        if((id % 2) == 0){
            return Svsg.colorEnum.BLACK;
        }
        return Svsg.colorEnum.WHITE;
    };
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

Svsg.queen = function() {
    this.id = 0;

    this.setId = function(id) {
        this.id = id;
        this.idToColumnAndLine();
        return this;
    };

    this.idToColumn = function(){
        var columns = this.id;
        while(columns > Svsg.global.size){
            columns-= Svsg.global.size;
        }
        return columns;
    };
    this.column = this.idToColumn();


    this.idToLine = function(){
        var columns = this.id;
        var line = 1;
        while(columns > Svsg.global.size){
            line++;
            columns-= Svsg.global.size;
        }
        return line;
    };
    this.line = this.idToLine();

    this.idToColumnAndLine = function(){
        var columns = this.id;
        var line = 1;
        while(columns > Svsg.global.size){
            line++;
            columns-= Svsg.global.size;
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
        for(var line = this.line + 1 ;
            line <= Svsg.global.size;
            line++) {
            var field = new Svsg.field().setColumnLineToId(this.column, line).setPiece(this);
            fields.push(field);
        }
        return fields;
    };

    this.getUpRightFields = function(){
        var fields = [];
        for(var column = this.column + 1,
            line = this.line + 1;
            column <= Svsg.global.size && line <= Svsg.global.size;
            column++,
            line++) {
            var field = new Svsg.field().setColumnLineToId(column, line).setPiece(this);
            fields.push(field);
        }
        return fields;
    };

    this.getRightFields = function(){
        var fields = [];        
        for(var column = this.column + 1;
            column <= Svsg.global.size; 
            column++) {
            var field = new Svsg.field().setColumnLineToId(column, this.line).setPiece(this);
            fields.push(field);
        }
        return fields;
    };

    this.getDownRightFields = function(){
        var fields = [];
        for( var column = this.column + 1, line = this.line - 1;
             column <= Svsg.global.size && line >= 1;
             column ++, 
             line--) {
            var field = new Svsg.field().setColumnLineToId(column, line).setPiece(this);
            fields.push(field);
        }
        return fields;
    };

    this.getDownFields = function(){
        var fields = [];
        for( var line = this.line - 1;
             line >= 1;
             line--) {
            var field = new Svsg.field().setColumnLineToId(this.column, line).setPiece(this);
            fields.push(field);
        }
        return fields;
    };

    this.getDownLeftFields = function(){
        var fields = [];
        for( var column = this.column - 1,  
             line = this.line - 1;
             column >= 1 && line >= 1;
             column--,
             line--) {
            var field = new Svsg.field().setColumnLineToId(column, line).setPiece(this);
            fields.push(field);
        }
        return fields;
    };

    this.getLeftFields = function(){
        var fields = [];
        for(var column = this.column - 1;
            column >= 1;
            column--) {
            var field = new Svsg.field().setColumnLineToId(column, this.line).setPiece(this);
            fields.push(field);
        }
        return fields;
    };

    this.getUpLeftFields = function(){
        var fields = [];
        for( var column = this.column - 1, 
             line = this.line + 1;
             column >= 1 && line <= Svsg.global.size;
             column--,
             line++) {
            var field = new Svsg.field().setColumnLineToId(column, line).setPiece(this);
            fields.push(field);
        }
        return fields;
    };

    // this.hash = 0;
  
    // this.setHash = function(){
    //     for(var i = 0; i < this.reaches.length; i++) {
    //         this.hash += this.reaches[i];
    //     }
    // };
    


    this.reaches = [];
    this.othersFieldsIds = [];
    this.othersFieldsIds.push(null);
    this.initOthersFieldsIds = function(){
        for(var i = 1; i <= Svsg.global.maxFields; i++){
            var field = new Svsg.field().setId(i);
            this.othersFieldsIds.push(field);
        }
        return this;
    };

    this.addOthersFieldsIds = function(queen){
        // if(!queen){
        //     console.log(" No queen ");
        //     return;
        // }

        if(queen.reaches){
            queen.reaches.forEach(function(field) {
                //console.log(field.id);
                this.othersFieldsIds[field.id].piece = field.piece;
            }, this);
        } 
        else {
            console.log(" No reaches " + queen.id);
        }
    };

    this.setReaches = function(){ 
        var fields = [];
        var currentField = new Svsg.field().setColumnLineToId(this.column, this.line).setPiece(this);
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
         this.reaches = fields;
         this.initOthersFieldsIds();
         //this.setHash();
    };
    
    this.fieldIds = [];
    this.setFieldIds = function(){
        var ids = [];

        this.reaches.forEach(function(element) {
            ids.push(element.id);            
        }, this);

        for(var i = 1; i <= Svsg.global.maxFields; i++){
            this.fieldIds[i] = ids.indexOf(i) != -1;
        }        
    };

    this.getOtherFieldPiece = function(){
        if(this.othersFieldsIds[this.id].piece){
            return this.othersFieldsIds[this.id].piece;
        }
        return null; 
    };

    this.displayFields = function(){
        var output = "";
        var repeat = (Svsg.global.size * Svsg.getSizeLength()) + Svsg.getSizeLength() + (Svsg.global.size * 0.5);
        output += "<div>"; 
        for(var line = Svsg.global.size; line > 0; line--){
            output += '_'.repeat(repeat); 
            output += "<br>"; 
            output += Svsg.formatNumberLength(line, Svsg.getSizeLength())  + "|";
            for(var column = 1; column <= Svsg.global.size; column++){
                var id = Svsg.ColumnLineToId(column, line);
              if(this.fieldIds[id]){
                output += '*'.repeat(Svsg.getSizeLength()) + "|";
                }
                else {
                    output += '_'.repeat(Svsg.getSizeLength()) + "|"; 
                }
            }
            output += "<br>"; 
        }
        output += '_'.repeat(repeat); 
        output += "<br>"; 
        output += Svsg.formatNumberLength(this.id, Svsg.getSizeLength())  + "|"; 
        for(var _column = 1; _column <= Svsg.global.size; _column++){
            output += Svsg.formatNumberLength(_column, Svsg.getSizeLength())  + "|";            
        }
        output += "</div>";
        output += "<div><br></div>";

        return output;
    };
};

Svsg.board = function(){
    this.fields = [];
    this.fields.push(null);

    this.init = function(){
        for(var i = 1; i <= Svsg.global.maxFields; i++){
            var field = new Svsg.field().setId(i);
            this.fields.push(field);
        }
        return this;
    };

    this.display = function(){
        var output = "";
        var repeat = (Svsg.global.size * Svsg.getSizeLength()) + Svsg.getSizeLength() + (Svsg.global.size * 1);
        output += "<div>"; 
        for(var line = Svsg.global.size; line > 0; line--){
            output += '_'.repeat(repeat); 
            output += "<br>"; 
            output += Svsg.formatNumberLength(line, Svsg.getSizeLength())  + "|";
            for(var column = 1; column <= Svsg.global.size; column++){
                var id = Svsg.ColumnLineToId(column, line);

                if(!this.fields[id].piece){
                    output += '_'.repeat(Svsg.getSizeLength()) + "|";
                }
                else {
                   // output += 'd'.repeat(Svsg.getSizeLength()) + "|"; 
                    output += Svsg.pad(Svsg.ColumnLineToId(column, line), Svsg.getSizeLength())  + "|"; 
                }
            }
            output += "<br>"; 
        }
        output += '_'.repeat(repeat); 
        output += "<br>"; 
        output += 'x'.repeat(Svsg.getSizeLength())  + "|"; 
        for(var _column = 1; _column <= Svsg.global.size; _column++){
            output += Svsg.formatNumberLength(_column, Svsg.getSizeLength())  + "|";            
        }
        output += "</div>"; 
        return output;
    };
};

Svsg.init = function(size, outputFieldname, tryOutput) {

    Svsg.global.init();

    Svsg.global.size = 1 * size;
    Svsg.global.maxFields = Svsg.global.size * Svsg.global.size;
    var fields = Svsg.global.maxFields;

    var queens = [];
    queens.push(null);
    var output = "";
    var progres = document.getElementById("progres");

    for( var maxColumn = Svsg.global.maxFields,
         id = 1;
         id <= maxColumn;
         id++ ) {
         var queen = new Svsg.queen().setId(id);
            queen.setReaches();
            queen.setFieldIds();
            // if(id > 5) {
            //     queen.reaches=[]; // TODO test
            // }
            queens.push(queen);
            //output += queen.displayFields();
            progres.value = id;         
        }
        Svsg.global.queens = queens;
       output += "ok";
    Svsg.setOutput(outputFieldname, output);
    Svsg.setOutput(tryOutput, "");    
};

Svsg.goShadok = function(outputFieldname, checkShadokOutput, colisionOutput, tryOutput) {
    Svsg.global.shadok = setInterval(Svsg.throwShadok(outputFieldname, checkShadokOutput, colisionOutput, tryOutput), 3000);
};

Svsg.stopShadok = function() {
    clearInterval(Svsg.global.shadok);
};

Svsg.throwShadok = function(outputFieldname, checkShadokOutput, colisionOutput, tryOutput) {

    Svsg.setOutput(outputFieldname, "");
    Svsg.setOutput(checkShadokOutput, "?");
    Svsg.setOutput(colisionOutput, "?");

    var tryFied = document.getElementById(tryOutput);
    var tryValue = Number(tryFied.innerHTML) + 1;
    Svsg.setOutput(tryOutput, tryValue);

    var queensTarget = [];
    queensTarget.push(null);
    var boardTarget = new Svsg.board().init();
    for(var i = 1, line = 1; i <= Svsg.global.size; i++, line++){
        var column = Math.floor(Math.random() * Svsg.global.size) + 1;
        var id = ((line - 1) * Svsg.global.size) + column;
        boardTarget.fields[id].piece = Svsg.global.queens[id];
        queensTarget.push(Svsg.global.queens[id]);
    }

    var output = boardTarget.display();
    Svsg.setOutput(outputFieldname, output);

    Svsg.global.queenTarget = queensTarget;
    Svsg.global.boardTarget = boardTarget;

    Svsg.checkShadok(colisionOutput, checkShadokOutput);
};

Svsg.checkShadok = function(outputFieldname, checkShadokOutput) {
    
        Svsg.setOutput(outputFieldname, "");
        Svsg.setOutput(checkShadokOutput, "?");
    
        for(var i = 1; i <= Svsg.global.size; i++){
            for(var j = 1; j <= Svsg.global.size; j++){
                if( i != j) {
                    Svsg.global.queenTarget[i].addOthersFieldsIds(Svsg.global.queenTarget[j]);                
                }
            }     
        }     
        
        var output = "";
        for( i = 1; i <= Svsg.global.size; i++){
            var piece = Svsg.global.queenTarget[i].getOtherFieldPiece();
            if(piece){
                output += "( queen : " + Svsg.global.queenTarget[i].id + ", " + piece.id +") ";
            }
        }
        
        checkShadok = "NOK";
        if( output == ""){
            checkShadok = "OK";
            Svsg.stopShadok();
        }

        Svsg.setOutput(outputFieldname, output);
        Svsg.setOutput(checkShadokOutput, checkShadok);
        
    };
