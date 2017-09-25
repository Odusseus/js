var Svsg = Svsg || {};

Svsg.globalTemplate = function(){
    this.init = undefined;
    this.size = 1;
    this.maxFields = 1;
    this.queens = [];
    this.queensTarget = [];
    this.boardTarget = null;
    this.shadok = undefined;
    this.try = 0;
    this.isRequestToStop = false;
    this.modulusOutput = 200;
    
    // Gibi
    this.gibi = undefined;
    this.basisChain = undefined;
    this.gibiTry = 0;
    this.isGibiRequestToStop = false;
    this.statusGibi = SvsgEnum.status.NOTFOUND;
    this.downCount = 0;
    //this.gibiBoardTarget = null;
    
    this.init = function(){
        this.size = 1;
        this.maxFields = this.size * this.size;
        this.queens = [];
        this.queensTarget = [];
        this.boardTarget = null;
        this.shadok = undefined;
        this.try = 0;
        
        this.gibi = undefined;
        this.basisChain =  undefined; 
        this.gibiTry = 0;    
        this.isGibiRequestToStop = false;    
        this.statusGibi = SvsgEnum.status.NOTFOUND;
        this.downCount = 0;
 
        return this;
    };
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
    this.outputFieldname = undefined;
    this.setOutputFieldname = function(id, value){
        this.outputFieldname = new SvsgUtil.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.gibiOutputFieldname = undefined;
    this.setGibiOutputFieldname = function(id, value){
        this.gibiOutputFieldname = new SvsgUtil.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.progress = undefined;
    this.setProgress = function(id, value){
        this.progress = new SvsgUtil.outputElement(id, value);
        this.setProgressBarValue(id, value);
        return this;
    };
    this.setProgressValue = function(value){
        this.progress.value = value;
        this.setProgressBarValue(this.progress.id, value);
    };
    this.checkShadokOutput = undefined;
    this.setCheckShadokOutput = function(id, value){
        this.checkShadokOutput = new SvsgUtil.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.gibiCheckOutput = undefined;
    this.setGibiCheckOutput = function(id, value){
        this.gibiCheckOutput = new SvsgUtil.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.collisionOutput = undefined;
    this.setCollisionOutput = function(id, value){
        this.collisionOutput = new SvsgUtil.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.gibiCollisionOutput = undefined;
    this.setGibiCollisionOutput = function(id, value){
        this.gibiCollisionOutput = new SvsgUtil.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.tryOutput = undefined;
    this.setTryOutput = function(id, value){
        this.tryOutput = new SvsgUtil.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
    this.gibiTryOutput = undefined;
    this.setGibiTryOutput = function(id, value){
        this.gibiTryOutput = new SvsgUtil.outputElement(id, value);
        this.setOutput(id, value);
        return this;
    };
};

Svsg.output = new Svsg.outputTemplate();

Svsg.field = function(){
    this.column = 1;
    this.line = 1; 
    this.id = 1;
    this.piece = null;
    this.pieces = [];

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
        this.id = SvsgUtil.getColumnLineToId(column, line, Svsg.global.size); 
        return this;
    };

    this.getColor = function(){
        if((id % 2) == 0){
            return SvsgEnum.colorEnum.BLACK;
        }
        return SvsgEnum.colorEnum.WHITE;
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
        this.setReaches();
        this.setFieldIds();
        this.initOthersFieldsIds();
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
    this.initOthersFieldsIds = function(){
        this.othersFieldsIds = [];
        this.othersFieldsIds.push(null);
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
                this.othersFieldsIds[field.id].pieces.push.apply(field.piece);
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

        for(var i = 0, direction = new Svsg.direction(SvsgEnum.queenDirectionEnum);
            i < Object.keys(SvsgEnum.queenDirectionEnum).length;
            i++,
            direction.next()){
                if(direction.currentDirection == SvsgEnum.queenDirectionEnum.UP) {
                    fields.push.apply(fields,this.getUpFields());
                } else
                if(direction.currentDirection == SvsgEnum.queenDirectionEnum.UPRIGHT) {
                    fields.push.apply(fields,this.getUpRightFields());
                } else
                if(direction.currentDirection == SvsgEnum.queenDirectionEnum.RIGHT) {
                    fields.push.apply(fields,this.getRightFields());
                } else
                if(direction.currentDirection == SvsgEnum.queenDirectionEnum.DOWNRIGHT) {
                    fields.push.apply(fields,this.getDownRightFields());
                } else
                if(direction.currentDirection == SvsgEnum.queenDirectionEnum.DOWN) {
                    fields.push.apply(fields,this.getDownFields());
                } else
                if(direction.currentDirection == SvsgEnum.queenDirectionEnum.DOWNLEFT) {
                    fields.push.apply(fields,this.getDownLeftFields());
                } else
                if(direction.currentDirection == SvsgEnum.queenDirectionEnum.LEFT) {
                    fields.push.apply(fields,this.getLeftFields());
                } else
                if(direction.currentDirection == SvsgEnum.queenDirectionEnum.UPLEFT) {
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
        if(this.othersFieldsIds[this.id].piece ){
            return this.othersFieldsIds[this.id].piece;
        }
        return null; 
    };

    this.displayFields = function(){
        var output = "";
        var repeat = (Svsg.global.size * SvsgUtil.getSizeLength(Svsg.global.size)) + SvsgUtil.getSizeLength(Svsg.global.size);
        output += "<div>"; 
        for(var line = Svsg.global.size; line > 0; line--){
            output += '_'.repeat(repeat); 
            output += "<br>"; 
            output += SvsgUtil.formatNumberLength(line, SvsgUtil.getSizeLength(Svsg.global.size))  + "|";
            for(var column = 1; column <= Svsg.global.size; column++){
                var id = SvsgUtil.getColumnLineToId(column, line, Svsg.global.size);
              if(this.fieldIds[id]){
                output += '*'.repeat(SvsgUtil.getSizeLength(Svsg.global.size)) + "|";
                }
                else {
                    output += '_'.repeat(SvsgUtil.getSizeLength(Svsg.global.size)) + "|"; 
                }
            }
            output += "<br>"; 
        }
        output += '_'.repeat(repeat); 
        output += "<br>"; 
        output += SvsgUtil.formatNumberLength(this.id, SvsgUtil.getSizeLength(Svsg.global.size))  + "|";
        for(var _column = 1; _column <= Svsg.global.size; _column++){
            output += SvsgUtil.formatNumberLength(_column, SvsgUtil.getSizeLength(Svsg.global.size))  + "|";
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
        var repeat = (Svsg.global.size * SvsgUtil.getSizeLength(Svsg.global.size));
        output += "<div>"; 
        for(var line = Svsg.global.size; line > 0; line--){
            output += '--'.repeat(repeat); 
            output += "<br>"; 
            output += SvsgUtil.formatNumberLength(line, SvsgUtil.getSizeLength(Svsg.global.size))  + "|";
            for(var column = 1; column <= Svsg.global.size; column++){
                var id = SvsgUtil.getColumnLineToId(column, line, Svsg.global.size);

                if(!this.fields[id].piece){
                    output += '&nbsp;&nbsp;'.repeat(SvsgUtil.getSizeLength(Svsg.global.size)) + "|";
                    // TEST
//                    output += SvsgUtil.pad(SvsgUtil.getColumnLineToId(column, line, Svsg.global.size), SvsgUtil.getSizeLength(Svsg.global.size))  + "|"; 
                }
                else {
                    output += SvsgUtil.pad(SvsgUtil.getColumnLineToId(column, line, Svsg.global.size), SvsgUtil.getSizeLength(Svsg.global.size))  + "|"; 
                }
            }
            output += "<br>"; 
        }
        output += '--'.repeat(repeat); 
        output += "<br>"; 
        output += '&nbsp;&nbsp;'.repeat(SvsgUtil.getSizeLength(Svsg.global.size))  + "|"; 
        for(var _column = 1; _column <= Svsg.global.size; _column++){
            output += SvsgUtil.formatNumberLength(_column, SvsgUtil.getSizeLength(Svsg.global.size))  + "|";            
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

    if (!Svsg.global.gibi) {
        Svsg.global.gibi = setInterval(function () { Svsg.goGibi(gibiOutputFieldname, gibiCheckOutput, gibiCollisionOutput, gibiTryOutput); }, 1);
    }
};

Svsg.requestStopGibi = function() {
    Svsg.global.isGibiRequestToStop = true;
};

Svsg.requestStopShadok = function() {
    Svsg.global.isRequestToStop = true;
    Svsg.requestStopGibi();
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

    if(Svsg.global.try > 0){

        for(var i = 1, line = 1; i <= Svsg.global.size; i++, line++){
            var column = Math.floor(Math.random() * Svsg.global.size) + 1;
            var id = ((line - 1) * Svsg.global.size) + column;
            Svsg.global.queens[id].initOthersFieldsIds();

            boardTarget.fields[id].piece = Svsg.global.queens[id];
            queensTarget.push(Svsg.global.queens[id]);
        }
        
    } else {

        //#region 1 known solution
        var testList = [1, 13, 24, 30, 35, 47, 50, 60];

        testList.forEach(function(id) {
            Svsg.global.queens[id].initOthersFieldsIds();
            boardTarget.fields[id].piece = Svsg.global.queens[id];
            queensTarget.push(Svsg.global.queens[id]);            
        }, this);       
        //#endregion 1 known solution             
    }      
    
    var found = Svsg.checkBoard(boardTarget, queensTarget, Svsg.global.try, collisionOutput, checkShadokOutput);

    if(!found){
        var queenIds = [];
        queensTarget.forEach(function(queen) {
            if(queen){
                queenIds.push(queen.id);            
            }
        }, this);
        queenIds.sort(SvsgUtil.sortNumber());
        var checkList = [
                            [6, 9, 21, 26, 40, 43, 55, 60],
                            [1, 14, 24, 27, 39, 44, 50, 61], 
                            [1, 13, 24, 30, 35, 47, 50, 60],
                            [2, 13, 23, 25, 35, 48, 54, 60],
                            [2, 14, 17, 31, 36, 48, 51, 61]
                        ];
        checkList.forEach(function(solution) {
            solution.sort(SvsgUtil.sortNumber());
            if(queenIds.compare(solution)){
               Svsg.stopShadok();
               throw solution + " is not found!";
            }
        }, this);
    }


    if( found || Svsg.global.try % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
        var output = boardTarget.display();

        Svsg.output.setOutputFieldname(outputFieldname, output)
        .setTryOutput(tryOutput, Svsg.global.try);
    }

    if(found || Svsg.global.isRequestToStop){
        Svsg.stopShadok();
    }
};

Svsg.goGibi = function(gibiOutputFieldname, gibiCheckOutput, gibiCollisionOutput, gibiTryOutput) {
     Svsg.global.gibiTry++;

    //  if(Svsg.global.gibiTry % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
    //      Svsg.output.setGibiOutputFieldname(gibiOutputFieldname, "")
    //      .setGibiCheckOutput(gibiCheckOutput, "?")
    //      .setGibiCollisionOutput(gibiCollisionOutput, "?")
    //      .setGibiTryOutput(gibiTryOutput, Svsg.global.gibiTry);
    //  }
    
     Svsg.searchGibi();
   
     if( Svsg.global.statusGibi != SvsgEnum.status.NOTFOUND ||
         Svsg.global.gibiTry % Svsg.global.modulusOutput == 0 ||
         Svsg.global.isGibiRequestToStop){

            var chainDisplay = Svsg.global.basisChain;
            var boardTarget = new Svsg.board().init();
        
            while(chainDisplay != undefined && chainDisplay.id <= Svsg.global.size){  
                boardTarget.fields[chainDisplay.currentFieldId].piece = chainDisplay.queen;
                chainDisplay = chainDisplay.next;
            }   
        
            var output = boardTarget.display();

            var check = "";
            if(Svsg.global.statusGibi == SvsgEnum.status.NOTFOUND){
                check = "<span style='color:red'>" + SvsgEnum.status.NOTFOUND.text + "</span>";
            }

            if(Svsg.global.statusGibi == SvsgEnum.status.NOSOLUTION){
                check = "<span style='color:purple'>" + SvsgEnum.status.NOSOLUTION.text + "</span>";
            }

            if(Svsg.global.statusGibi == SvsgEnum.status.FOUND){
                check = "<span style='color:green'>" + SvsgEnum.status.FOUND.text + "</span>";
            }
        
            Svsg.output.setGibiOutputFieldname(gibiOutputFieldname, output)
            .setGibiTryOutput(gibiTryOutput, Svsg.global.gibiTry)
            .setGibiCheckOutput(gibiCheckOutput, check);

        }

        if(Svsg.global.statusGibi == SvsgEnum.status.NOSOLUTION || 
           Svsg.global.statusGibi == SvsgEnum.status.FOUND || 
           Svsg.global.isGibiRequestToStop){
                Svsg.stopGibi();
        }
 };


Svsg.chain = function(previous){
    this.id = undefined;
    this.currentFieldId = undefined;
    this.minFieldId = undefined;
    this.maxFieldId = undefined;
    this.previous = previous;
    this.next = undefined;
    this.down = false;

    this.queen = undefined;
    this.othersFieldsIds = [];

    this.initOthersFieldsIds = function(){
        this.othersFieldsIds = [];
        this.othersFieldsIds.push(null);
        for(var i = 1; i <= Svsg.global.maxFields; i++){
            var field = new Svsg.field().setId(i);
            this.othersFieldsIds.push(field);
        }
        return this;
    };

    this.addOthersFieldsIds = function(previous){

        previous.queen.reaches.forEach(function(field) {
            this.othersFieldsIds[field.id].piece = field.piece;
            //this.othersFieldsIds[field.id].pieces.push.apply(field.piece);
        }, this);
            
        return this;
    };

    this.setOthersFieldsIds = function(){
        var previous = this.previous;
        while(previous != undefined){
            var chain = previous;
            this.addOthersFieldsIds(chain);
            previous = chain.previous;
        }
        return this;
    };

    this.resetId = function(){
        if(this.previous){
            this.id = this.previous.id + 1;
            this.minFieldId = this.previous.minFieldId + Svsg.global.size;
        } else {
            this.id = 1;
            this.minFieldId = 1;
        }

        this.currentFieldId = this.minFieldId;
        this.maxFieldId = this.minFieldId + Svsg.global.size - 1;
        return this;
    };

    this.setQueen = function(){
        this.resetId();
        this.queen = new Svsg.queen().setId(this.currentFieldId);
        this.initOthersFieldsIds();
        return this;
    };

    this.getOtherFieldPiece = function(){
        this.queen.othersFieldsIds = this.othersFieldsIds;
        return this.queen.getOtherFieldPiece();
    };

    this.setNext = function(){
        if(this.id) {    
            if(this.currentFieldId < this.maxFieldId){
                this.currentFieldId++;
                this.queen = new Svsg.queen().setId(this.currentFieldId);
            } else {
                if(this.previous){
                    this.previous.down = true;
                }
            }
        } else {
            this.setQueen().setOthersFieldsIds();
        }
        return this;
    };
};

Svsg.searchGibi = function() {
    Svsg.global.gibiTry++;   

    if(Svsg.global.basisChain == undefined) {
        Svsg.global.basisChain = new Svsg.chain();
    }

    var s1 = false;
    var s2 = false;
    var s3 = false;
    var s4 = false;
    var s5 = false;
    var s6 = false;

    var chain = Svsg.global.basisChain;

    if (chain.id == 1 && chain.currentFieldId == 2){
        s1 = true;
    }

    while(chain.next != undefined){  
        chain = chain.next;
       
        if (chain.id == 2 && chain.currentFieldId == 10){
            s2 = true;
        }
        if (chain.id == 3 && chain.currentFieldId == 18){
            s3 = true;
        }
        if (chain.id == 4 && chain.currentFieldId == 19){
            s4 = true;
        }
        if (chain.id == 5 && chain.currentFieldId == 27){
            s5 = true;
        }
        if (chain.id == 5 && chain.currentFieldId == 27){
            s5 = true;
        }
        if (chain.id == 6 && chain.currentFieldId == 35){
            s6 = true;
        }
        if(s1){
            if(s2){
                if(s3){
                    if(s4){
                        if(s5){
                            if(s6){
                                var t = true;
                            }
                        }
                    }
                }
            }
        }
    }        

    
    while(chain && chain.down) {
        Svsg.global.downCount++;
        chain.next = undefined;
        chain.down = false;
        if(chain.currentFieldId == chain.maxFieldId){
            if(chain.previous){
                chain.previous.down = true;
                chain = chain.previous;
            } else {
                chain = undefined;
            }
        }

    }

    if(chain == undefined || chain.down){
        Svsg.global.statusGibi = SvsgEnum.status.NOSOLUTION;
    } else {

        
        chain.setNext();    
        var piece = chain.getOtherFieldPiece();    
        if(piece){
            if(chain.currentFieldId == chain.maxFieldId){
                if(chain.previous){
                    chain.previous.next = undefined;
                    chain.previous.down = true;
                } else {
                    Svsg.global.statusGibi = SvsgEnum.status.NOSOLUTION;
                }
        }
        } else {
            if (chain.id == Svsg.global.size){
                Svsg.global.statusGibi = SvsgEnum.status.FOUND;
            } else {
                var newChain = new Svsg.chain(chain); 
                chain.next = newChain;
            }
        }
    }

    
};

Svsg.checkBoard = function(boardTarget, queensTarget, tryCount, outputFieldname, checkOutput) {
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
                if(tryCount % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
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

        if( found || Svsg.global.try % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
                Svsg.output.setOutputFieldname(outputFieldname, output)
                .setCheckShadokOutput(checkOutput, check);
        }  
        return found;
    };
