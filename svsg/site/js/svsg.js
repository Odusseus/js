var Svsg = Svsg || {};

Svsg.global = new Svsg.Global.template().init();

Svsg.output = new Svsg.Util.outputTemplate();

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

    Svsg.global.queens.push(null);

    // var queens = [];
    // queens.push(null);

    // var output = "";

    // for( var maxColumn = Svsg.global.maxFields,
    //      id = 1;
    //      id <= maxColumn;
    //      id++ ) {
    //      var queen = new Svsg.Queen.queen().setId(id);
    //         queen.setReaches();
    //         queen.setFieldIds();
    //         queens.push(queen);
    //         //output += queen.displayFields();

    //         var progressValue = (id / Svsg.global.maxFields) * 100;

    //         Svsg.output.setProgressValue(progressValue);
    // }
    // Svsg.global.queens = queens;

    //Svsg.global.progressValue = progressValue;
    //Svsg.global.outputFieldname = outputFieldname;

    //         //output += queen.displayFields();
        //Svsg.output.setOutputFieldname(outputFieldname, output);


    if (!Svsg.global.goInitialization) {
        Svsg.global.initializationField = 1;
        Svsg.global.goInitialization = setInterval(function () { Svsg.goInitialization(); }, 1);
    }

};

Svsg.goInitialization = function(){
    
    if(Svsg.global.initializationField <= Svsg.global.maxFields)
    {
        var queen = new Svsg.Queen.queen().setId(Svsg.global.initializationField);
        queen.setReaches();
        queen.setFieldIds();
        Svsg.global.queens.push(queen);
        
        var progressValue = (Svsg.global.initializationField / Svsg.global.maxFields) * 100;
        
        Svsg.output.setProgressValue(progressValue);
    } else{
        clearInterval(Svsg.global.goInitialization);
        Svsg.global.goInitialization = undefined;
        Svsg.global.initializationReady = true;
     }
    Svsg.global.initializationField++;
};
    
    Svsg.goShadok = function(size, modulusOutput, outputFieldname, gibiOutputFieldname, checkShadokOutput, gibiCheckOutput, collisionOutput, gibiCollisionOutput, tryOutput, gibiTryOutput, progress) {
        if (!Svsg.global.initialization) {
            Svsg.initialization(size, modulusOutput, outputFieldname, gibiOutputFieldname, checkShadokOutput, gibiCheckOutput, collisionOutput, gibiCollisionOutput, tryOutput, gibiTryOutput, progress);
                    Svsg.global.initialization = true;
    }
   
    if (Svsg.global.initializationReady && !Svsg.global.shadok) {
     Svsg.global.shadok = setInterval(function () { Svsg.throwShadok(outputFieldname, checkShadokOutput, collisionOutput, tryOutput); }, 1);
    }

    if (Svsg.global.initializationReady && !Svsg.global.gibi) {
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
    var boardTarget = new Svsg.Board.board().init();

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
        queenIds.sort(Svsg.Util.sortNumber());
        var checkList = [
                            [6, 9, 21, 26, 40, 43, 55, 60],
                            [1, 14, 24, 27, 39, 44, 50, 61], 
                            [1, 13, 24, 30, 35, 47, 50, 60],
                            [2, 13, 23, 25, 35, 48, 54, 60],
                            [2, 14, 17, 31, 36, 48, 51, 61]
                        ];
        checkList.forEach(function(solution) {
            solution.sort(Svsg.Util.sortNumber());
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
    
    check = "<span style='color:red'>" + Svsg.Enum.status.NOTFOUND.text + "</span>";
    if(found){
        check = "<span style='color:green'>" + Svsg.Enum.status.FOUND.text + "</span>";
    }

    if( found || Svsg.global.try % Svsg.global.modulusOutput == 0 || Svsg.global.isRequestToStop){
        // Svsg.output.setOutputFieldname(outputFieldname, output)
        // .setCheckShadokOutput(checkOutput, check);
        Svsg.output.setCheckShadokOutput(checkOutput, check);
    }  
    return found;
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
   
     if( Svsg.global.statusGibi != Svsg.Enum.status.NOTFOUND ||
         Svsg.global.gibiTry % Svsg.global.modulusOutput == 0 ||
         Svsg.global.isGibiRequestToStop){

            var chainDisplay = Svsg.global.basisChain;
            var boardTarget = new Svsg.Board.board().init();
        
            while(chainDisplay != undefined && chainDisplay.id <= Svsg.global.size){  
                boardTarget.fields[chainDisplay.currentFieldId].piece = chainDisplay.queen;
                chainDisplay = chainDisplay.next;
            }   
        
            var output = boardTarget.display();

            var check = "";
            if(Svsg.global.statusGibi == Svsg.Enum.status.NOTFOUND){
                check = "<span style='color:red'>" + Svsg.Enum.status.NOTFOUND.text + "</span>";
            }

            if(Svsg.global.statusGibi == Svsg.Enum.status.NOSOLUTION){
                check = "<span style='color:purple'>" + Svsg.Enum.status.NOSOLUTION.text + "</span>";
            }

            if(Svsg.global.statusGibi == Svsg.Enum.status.FOUND){
                check = "<span style='color:green'>" + Svsg.Enum.status.FOUND.text + "</span>";
            }
        
            Svsg.output.setGibiOutputFieldname(gibiOutputFieldname, output)
            .setGibiTryOutput(gibiTryOutput, Svsg.global.gibiTry)
            .setGibiCheckOutput(gibiCheckOutput, check);

        }

        if(Svsg.global.statusGibi == Svsg.Enum.status.NOSOLUTION || 
           Svsg.global.statusGibi == Svsg.Enum.status.FOUND || 
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
            var field = new Svsg.Field.field().setId(i);
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
        this.queen = new Svsg.Queen.queen().setId(this.currentFieldId);
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
                this.queen = new Svsg.Queen.queen().setId(this.currentFieldId);
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
        Svsg.global.statusGibi = Svsg.Enum.status.NOSOLUTION;
    } else {

        
        chain.setNext();    
        var piece = chain.getOtherFieldPiece();    
        if(piece){
            if(chain.currentFieldId == chain.maxFieldId){
                if(chain.previous){
                    chain.previous.next = undefined;
                    chain.previous.down = true;
                } else {
                    Svsg.global.statusGibi = Svsg.Enum.status.NOSOLUTION;
                }
        }
        } else {
            if (chain.id == Svsg.global.size){
                Svsg.global.statusGibi = Svsg.Enum.status.FOUND;
            } else {
                var newChain = new Svsg.chain(chain); 
                chain.next = newChain;
            }
        }
    }
};
