var Svsg = Svsg || {};

Svsg.Queen = {
    queen : function() {
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
                var field = new Svsg.Field.field().setColumnLineToId(this.column, line).setPiece(this);
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
                var field = new Svsg.Field.field().setColumnLineToId(column, line).setPiece(this);
                fields.push(field);
            }
            return fields;
        };
    
        this.getRightFields = function(){
            var fields = [];        
            for(var column = this.column + 1;
                column <= Svsg.global.size; 
                column++) {
                var field = new Svsg.Field.field().setColumnLineToId(column, this.line).setPiece(this);
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
                var field = new Svsg.Field.field().setColumnLineToId(column, line).setPiece(this);
                fields.push(field);
            }
            return fields;
        };
    
        this.getDownFields = function(){
            var fields = [];
            for( var line = this.line - 1;
                 line >= 1;
                 line--) {
                var field = new Svsg.Field.field().setColumnLineToId(this.column, line).setPiece(this);
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
                var field = new Svsg.Field.field().setColumnLineToId(column, line).setPiece(this);
                fields.push(field);
            }
            return fields;
        };
    
        this.getLeftFields = function(){
            var fields = [];
            for(var column = this.column - 1;
                column >= 1;
                column--) {
                var field = new Svsg.Field.field().setColumnLineToId(column, this.line).setPiece(this);
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
                var field = new Svsg.Field.field().setColumnLineToId(column, line).setPiece(this);
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
                var field = new Svsg.Field.field().setId(i);
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
            var currentField = new Svsg.Field.field().setColumnLineToId(this.column, this.line).setPiece(this);
            fields.push(currentField);
    
            for(var i = 0, direction = new Svsg.Direction.direction(Svsg.Enum.queenDirectionEnum);
                i < Object.keys(Svsg.Enum.queenDirectionEnum).length;
                i++,
                direction.next()){
                    if(direction.currentDirection == Svsg.Enum.queenDirectionEnum.UP) {
                        fields.push.apply(fields,this.getUpFields());
                    } else
                    if(direction.currentDirection == Svsg.Enum.queenDirectionEnum.UPRIGHT) {
                        fields.push.apply(fields,this.getUpRightFields());
                    } else
                    if(direction.currentDirection == Svsg.Enum.queenDirectionEnum.RIGHT) {
                        fields.push.apply(fields,this.getRightFields());
                    } else
                    if(direction.currentDirection == Svsg.Enum.queenDirectionEnum.DOWNRIGHT) {
                        fields.push.apply(fields,this.getDownRightFields());
                    } else
                    if(direction.currentDirection == Svsg.Enum.queenDirectionEnum.DOWN) {
                        fields.push.apply(fields,this.getDownFields());
                    } else
                    if(direction.currentDirection == Svsg.Enum.queenDirectionEnum.DOWNLEFT) {
                        fields.push.apply(fields,this.getDownLeftFields());
                    } else
                    if(direction.currentDirection == Svsg.Enum.queenDirectionEnum.LEFT) {
                        fields.push.apply(fields,this.getLeftFields());
                    } else
                    if(direction.currentDirection == Svsg.Enum.queenDirectionEnum.UPLEFT) {
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
            var repeat = (Svsg.global.size * Svsg.Util.getSizeLength(Svsg.global.size)) + Svsg.Util.getSizeLength(Svsg.global.size);
            output += "<div>"; 
            for(var line = Svsg.global.size; line > 0; line--){
                output += '_'.repeat(repeat); 
                output += "<br>"; 
                output += Svsg.Util.formatNumberLength(line, Svsg.Util.getSizeLength(Svsg.global.size))  + "|";
                for(var column = 1; column <= Svsg.global.size; column++){
                    var id = Svsg.Util.getColumnLineToId(column, line, Svsg.global.size);
                  if(this.fieldIds[id]){
                    output += '*'.repeat(Svsg.Util.getSizeLength(Svsg.global.size)) + "|";
                    }
                    else {
                        output += '_'.repeat(Svsg.Util.getSizeLength(Svsg.global.size)) + "|"; 
                    }
                }
                output += "<br>"; 
            }
            output += '_'.repeat(repeat); 
            output += "<br>"; 
            output += Svsg.Util.formatNumberLength(this.id, Svsg.Util.getSizeLength(Svsg.global.size))  + "|";
            for(var _column = 1; _column <= Svsg.global.size; _column++){
                output += Svsg.Util.formatNumberLength(_column, Svsg.Util.getSizeLength(Svsg.global.size))  + "|";
            }
            output += "</div>";
            output += "<div><br></div>";
    
            return output;
        };   
    }
};