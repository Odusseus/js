var Svsg = Svsg || {};
Svsg.Field = {
    field : function(){
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
            this.id = Svsg.Util.getColumnLineToId(column, line, Svsg.global.size); 
            return this;
        };
    
        this.getColor = function(){
            if((id % 2) == 0){
                return Svsg.Enum.colorEnum.BLACK;
            }
            return Svsg.Enum.colorEnum.WHITE;
        };
    }
};
    