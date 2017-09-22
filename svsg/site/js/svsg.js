var Svsg = {};

Svsg.globalTemplate = function(){
    this.init = undefined;
    this.size = 1;
    this.maxFields = 1;
    this.queens = [];
    this.queensTarget = [];
    this.gibiQueensTarget = [];
    this.boardTarget = null;
    this.gibiBoardTarget = null;
    this.shadok = undefined;
    this.gibi = undefined;
    this.try = 0;
    this.gibiTry = 0;
    this.isRequestToStop = false;
    this.isGibiRequestToStop = false;
    this.modulusOutput = 200;

    this.init = function(){
        this.size = 1;
        this.maxFields = this.size * this.size;
        this.queens = [];
        this.queensTarget = [];
        this.boardTarget = null;
        this.shadok = undefined;
        this.gibi = undefined;
        this.try = 0;
        this.gibiTry = 0;
        return this;
    };
};

Svsg.outputElement = function(id, value){
    this.id = id;
    this.value = value;
};

Svsg.global = new Svsg.globalTemplate().init();

Svsg.outputTemplate = function(){
    this.setOutput = function(id, value) {
        var outputField = document.getElementById(id);
        outputField.innerHTML = value;
    };
    this.setProgressBarValue = function(id, value) {
        var outputField = document.getElementById(id);
        outputField.value = value;
    };
    this.outputFieldname;
    this.setOutputFieldname = function(id, value){
        this.outputFieldname = new Svsg.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.gibiOutputFieldname;
    this.setGibiOutputFieldname = function(id, value){
        this.gibiOutputFieldname = new Svsg.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.progress;
    this.setProgress = function(id, value){
        this.progress = new Svsg.outputElement(id, value);
        this.setProgressBarValue(id, value);
        return this;
    };
    this.setProgressValue = function(value){
        this.progress.value = value;
        this.setProgressBarValue(this.progress.id, value);
    };
    this.checkShadokOutput;
    this.setCheckShadokOutput = function(id, value){
        this.checkShadokOutput = new Svsg.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.gibiCheckOutput;
    this.setGibiCheckOutput = function(id, value){
        this.gibiCheckOutput = new Svsg.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.collisionOutput;
    this.setCollisionOutput = function(id, value){
        this.collisionOutput = new Svsg.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.gibiCollisionOutput;
    this.setGibiCollisionOutput = function(id, value){
        this.gibiCollisionOutput = new Svsg.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.tryOutput;
    this.setTryOutput = function(id, value){
        this.tryOutput = new Svsg.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.gibiTryOutput;
    this.setGibiTryOutput = function(id, value){
        this.gibiTryOutput = new Svsg.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
};

Svsg.output = new Svsg.outputTemplate();

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
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
};

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

            length = string.length;
            if(length < 2){
                length = 2;
            }
            return length;
        };

Svsg.ColumnLineToId = function(column, line){
    if(!Svsg.global.size){
        Svsg.global.size = 1;
    }
    var id = Svsg.global.size * (line - 1) + column; 
    return id;
};

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
        //     //console.log(" No queen ");
        //     return;
        // }

        if(queen.reaches){
            queen.reaches.forEach(function(field) {
                ////console.log(field.id);
                this.othersFieldsIds[field.id].piece = field.piece;
            }, this);
        } 
        else {
            //console.log(" No reaches " + queen.id);
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
        var repeat = (Svsg.global.size * Svsg.getSizeLength()) + Svsg.getSizeLength();
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
        var repeat = (Svsg.global.size * Svsg.getSizeLength());
        output += "<div>"; 
        for(var line = Svsg.global.size; line > 0; line--){
            output += '--'.repeat(repeat); 
            output += "<br>"; 
            output += Svsg.formatNumberLength(line, Svsg.getSizeLength())  + "|";
            for(var column = 1; column <= Svsg.global.size; column++){
                var id = Svsg.ColumnLineToId(column, line);

                if(!this.fields[id].piece){
                    output += '&nbsp;&nbsp;'.repeat(Svsg.getSizeLength()) + "|";
                }
                else {
                    output += Svsg.pad(Svsg.ColumnLineToId(column, line), Svsg.getSizeLength())  + "|"; 
                }
            }
            output += "<br>"; 
        }
        output += '--'.repeat(repeat); 
        output += "<br>"; 
        output += '&nbsp;&nbsp;'.repeat(Svsg.getSizeLength())  + "|"; 
        for(var _column = 1; _column <= Svsg.global.size; _column++){
            output += Svsg.formatNumberLength(_column, Svsg.getSizeLength())  + "|";            
        }
        output += "</div>"; 
        return output;
    };
};

Svsg.initialization = function(size, modulusOutput, outputFieldname, gibiOutputFieldname, checkShadokOutput, gibiCheckOutput, collisionOutput, gibiCollisionOutput, tryOutput, gibiTryOutput, progress) {

    Svsg.global.init();
    Svsg.output.setOutputFieldname(outputFieldname, "")
    .setGibiOutputFieldname(gibiOutputFieldname, "")
    .setCheckShadokOutput(checkShadokOutput, "")
    .setGibiCheckOutput(gibiCheckOutput, "")
    .setCollisionOutput(collisionOutput, "")
    .setGibiCollisionOutput(gibiCollisionOutput, "")
    .setTryOutput(tryOutput, "")
    .setGibiTryOutput(gibiTryOutput, "")
    .setProgress(progress,0);

    Svsg.global.size = 1 * size;
    Svsg.global.maxFields = Svsg.global.size * Svsg.global.size;
    var fields = Svsg.global.maxFields;

    Svsg.global.modulusOutput = 1 * modulusOutput;

    var queens = [];
    queens.push(null);

    var output = "";

    for( var maxColumn = Svsg.global.maxFields,
         id = 1;
         id <= maxColumn;
         id++ ) {
         var queen = new Svsg.queen().setId(id);
            queen.setReaches();
            queen.setFieldIds();
            queens.push(queen);
            //output += queen.displayFields();

            var progressValue = (id / Svsg.global.maxFields) * 100;

            Svsg.output.setProgressValue(progressValue);
    }
    Svsg.global.queens = queens;

    Svsg.output.setOutputFieldname(outputFieldname, output);
};

Svsg.goShadok = function(size, modulusOutput, outputFieldname, gibiOutputFieldname, checkShadokOutput, gibiCheckOutput, collisionOutput, gibiCollisionOutput, tryOutput, gibiTryOutput, progress) {
    if (!Svsg.global.initialization) {
        Svsg.initialization(size, modulusOutput, outputFieldname, gibiOutputFieldname, checkShadokOutput, gibiCheckOutput, collisionOutput, gibiCollisionOutput, tryOutput, gibiTryOutput, progress);
        Svsg.global.initialization = true;
    }
   
    if (!Svsg.global.shadok) {
     Svsg.global.shadok = setInterval(function () { Svsg.throwShadok(outputFieldname, checkShadokOutput, collisionOutput, tryOutput); }, 1);
    }

    // if (!Svsg.global.gibi) {
    //     Svsg.global.gibi = setInterval(function () { Svsg.searchGibi(gibiOutputFieldname, gibiCheckOutput, gibiCollisionOutput, gibiTryOutput); }, 1);
    //    }
};

Svsg.requestStopShadok = function() {
    Svsg.global.isRequestToStop = true;
    Svsg.requestStopGibi();
};

Svsg.requestStopGibi = function() {
    Svsg.global.isGibiRequestToStop = true;
};

Svsg.stopShadok = function() {
    clearInterval(Svsg.global.shadok);
    Svsg.global.shadok = undefined;
    Svsg.global.isRequestToStop = false;
};

Svsg.stopGibi = function() {
    clearInterval(Svsg.global.gibi);
    Svsg.global.gibi = undefined;
    Svsg.global.isGibiRequestToStop = false;
};


Svsg.throwShadok = function(outputFieldname, checkShadokOutput, collisionOutput, tryOutput) {
    Svsg.global.try++;

    if(Svsg.global.try % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){        
        Svsg.output.setOutputFieldname(outputFieldname, "")
        .setCheckShadokOutput(checkShadokOutput, "?")
        .setCollisionOutput(collisionOutput, "?")
        .setTryOutput(tryOutput, Svsg.global.try);
    }

    var queensTarget = [];
    queensTarget.push(null);
    var boardTarget = new Svsg.board().init();
    for(var i = 1, line = 1; i <= Svsg.global.size; i++, line++){
        var column = Math.floor(Math.random() * Svsg.global.size) + 1;
        var id = ((line - 1) * Svsg.global.size) + column;
        boardTarget.fields[id].piece = Svsg.global.queens[id];
        queensTarget.push(Svsg.global.queens[id]);
    }
    
    //#region 1 known solution
    // boardTarget.fields[6].piece = Svsg.global.queens[6];
    // queensTarget.push(Svsg.global.queens[6]);

    // boardTarget.fields[9].piece = Svsg.global.queens[9];
    // queensTarget.push(Svsg.global.queens[9]);

    // boardTarget.fields[21].piece = Svsg.global.queens[21];
    // queensTarget.push(Svsg.global.queens[21]);

    // boardTarget.fields[26].piece = Svsg.global.queens[26];
    // queensTarget.push(Svsg.global.queens[26]);

    // boardTarget.fields[40].piece = Svsg.global.queens[40];
    // queensTarget.push(Svsg.global.queens[40]);

    // boardTarget.fields[43].piece = Svsg.global.queens[43];
    // queensTarget.push(Svsg.global.queens[43]);

    // boardTarget.fields[55].piece = Svsg.global.queens[55];
    // queensTarget.push(Svsg.global.queens[55]);

    // boardTarget.fields[60].piece = Svsg.global.queens[60];
    // queensTarget.push(Svsg.global.queens[60]);
    //#endregion 1 known solution

    //Svsg.global.queenTarget = queensTarget;
    //Svsg.global.boardTarget = boardTarget;
    
    var found = Svsg.checkboard("shadok", boardTarget, queensTarget, Svsg.global.try, collisionOutput, checkShadokOutput);
   
    if( found || Svsg.global.try % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
        var output = boardTarget.display();

        Svsg.output.setOutputFieldname(outputFieldname, output)
        .setTryOutput(tryOutput, Svsg.global.try);
    }

    if(found || Svsg.global.isRequestToStop){
        Svsg.stopShadok();
    }
};

// Svsg.searchGibi = function(gibiOutputFieldname, gibiCheckOutput, gibiCollisionOutput, gibiTryOutput) {
//     Svsg.global.gibiTry++;

//     if(Svsg.global.gibiTry % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
//         Svsg.output.setGibiOutputFieldname(gibiOutputFieldname, "")
//         .setGibiCheckOutput(gibiCheckOutput, "?")
//         .setGibiCollisionOutput(gibiCollisionOutput, "?")
//         .setGibiTryOutput(gibiTryOutput, Svsg.global.gibiTry);
//     }

//     var queensTarget = [];
//     queensTarget.push(null);
//     var boardTarget = new Svsg.board().init();
//     for(var i = 1, line = 1; i <= Svsg.global.size; i++, line++){
//         var column = Math.floor(Math.random() * Svsg.global.size) + 1;
//         var id = ((line - 1) * Svsg.global.size) + column;
//         boardTarget.fields[id].piece = Svsg.global.queens[id];
//         queensTarget.push(Svsg.global.queens[id]);
//     }

//     //Svsg.global.gibiQueenTarget = queensTarget;
//     //Svsg.global.gibiBoardTarget = boardTarget;
    
//     var found = Svsg.checkboard("gibi", boardTarget, queensTarget, Svsg.global.gibiTry, gibiCollisionOutput, gibiCheckOutput);
   
//     if( found || Svsg.global.gibiTry % Svsg.global.modulusOutput == 0 || Svsg.global.isGibiRequestToStop){
//         var output = boardTarget.display();

//         Svsg.output.setGibiOutputFieldname(gibiOutputFieldname, output)
//         .setGibiTryOutput(gibiTryOutput, Svsg.global.gibiTry);
//     }

//     if(found || Svsg.global.isGibiRequestToStop){
//         Svsg.stopGibi();
//     }
// };


Svsg.chain = function(previous){
    this.previous = previous;
    this.next = undefined;
    this.queen = undefined;
    this.minId = 0;
    this.maxId = 0;
    this.currentId = 0;

    this.setOthersFieldsIds = function(){
        var previous = this.previous;
        while(previous){
            var chain = previous;
            this.queen.addOthersFieldsIds(chain.queen);
            previous = chain.previous;
        }
    };

    this.setMinId = function(){
        // TODO
    }
};

Svsg.searchGibi = function(gibiOutputFieldname, gibiCheckOutput, gibiCollisionOutput, gibiTryOutput) {
    Svsg.global.gibiTry++;

    if(Svsg.global.gibiTry % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
        Svsg.output.setGibiOutputFieldname(gibiOutputFieldname, "")
        .setGibiCheckOutput(gibiCheckOutput, "?")
        .setGibiCollisionOutput(gibiCollisionOutput, "?")
        .setGibiTryOutput(gibiTryOutput, Svsg.global.gibiTry);
    }

    
    var basisChain = new chain(); 
    var id = 1;
    basisChain.queen = new queen.setId(id);
    basisChain.try = queen.id; 
    basisChain.queen.reaches = Svsg.queen[id].reaches;
    basisChain.queen.fieldIds = Svsg.queen[id].fieldIds;
    basisChain.setOthersFieldsIds();
    var piece = queensTarget[i].getOtherFieldPiece();
    var search = true;
    if(!piece){
        search = false;       
    }

    while(search){
        
        var lastChain = basisChain;
        while(lastChain.next){
            lastChain = lastChain.next;
        }


    };


    var queensTarget = [];
    queensTarget.push(null);
    var boardTarget = new Svsg.board().init();
    for(var i = 1, line = 1; i <= Svsg.global.size; i++, line++){
        var column = Math.floor(Math.random() * Svsg.global.size) + 1;
        var id = ((line - 1) * Svsg.global.size) + column;
        boardTarget.fields[id].piece = Svsg.global.queens[id];
        queensTarget.push(Svsg.global.queens[id]);
    }

    //Svsg.global.gibiQueenTarget = queensTarget;
    //Svsg.global.gibiBoardTarget = boardTarget;
    
    var found = Svsg.checkboard("gibi", boardTarget, queensTarget, Svsg.global.gibiTry, gibiCollisionOutput, gibiCheckOutput);
   
    if( found || Svsg.global.gibiTry % Svsg.global.modulusOutput == 0 || Svsg.global.isGibiRequestToStop){
        var output = boardTarget.display();

        Svsg.output.setGibiOutputFieldname(gibiOutputFieldname, output)
        .setGibiTryOutput(gibiTryOutput, Svsg.global.gibiTry);
    }

    if(found || Svsg.global.isGibiRequestToStop){
        Svsg.stopGibi();
    }
};


Svsg.checkboard = function(typePlayer, boardTarget, queensTarget, trycount, outputFieldname, checkOutput) {
        for(var i = 1; i <= Svsg.global.size; i++){
            for(var j = 1; j <= Svsg.global.size; j++){
                if( i != j) {
                    queensTarget[i].addOthersFieldsIds(queensTarget[j]);
                }
            }     
        }     
        
        var output = "";
        var found = true;
        for( i = 1; i <= Svsg.global.size; i++){
            var piece = queensTarget[i].getOtherFieldPiece();
            if(piece){
                found = false;
                if(trycount % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
                    output += "( " + queensTarget[i].id + " and " + piece.id +") ";
                }
            }
        }

        //Test found
        // if( Svsg.global.try == 350){
        //     found = true;
        // } 
        
        check = "<span style='color:red'>Not found!!!</span>";
        if(found){
            check = "<span style='color:green'>FOUND !!!</span>";
        }

        if(typePlayer == "shadok"){
            if( found || Svsg.global.try % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
                Svsg.output.setOutputFieldname(outputFieldname, output)
                .setCheckShadokOutput(checkOutput, check);
            }
        } else{
            if( found || Svsg.global.gibiTry % Svsg.global.modulusOutput == 0 || Svsg.global.isGibiRequestToStop){
                Svsg.output.setGibiOutputFieldname(outputFieldname, output)
                .setGibiCheckOutput(checkOutput, check);
            }
        }

        
        
        return found;
    };
