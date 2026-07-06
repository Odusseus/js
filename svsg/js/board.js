var Svsg = Svsg || {};
Svsg.Board = {
    board : function(){
        this.fields = [];
        this.fields.push(null);
    
        this.init = function(){
            for(var i = 1; i <= Svsg.global.maxFields; i++){
                var field = new Svsg.Field.field().setId(i);
                this.fields.push(field);
            }
            return this;
        };
    
        this.display = function(){
            var output = "";
            var repeat = (Svsg.global.size * Svsg.Util.getSizeLength(Svsg.global.size));
            output += "<div>"; 
            for(var line = Svsg.global.size; line > 0; line--){
                output += '--'.repeat(repeat); 
                output += "<br>"; 
                output += Svsg.Util.formatNumberLength(line, Svsg.Util.getSizeLength(Svsg.global.size))  + "|";
                for(var column = 1; column <= Svsg.global.size; column++){
                    var id = Svsg.Util.getColumnLineToId(column, line, Svsg.global.size);
    
                    if(!this.fields[id].piece){
                        output += '&nbsp;&nbsp;'.repeat(Svsg.Util.getSizeLength(Svsg.global.size)) + "|";
                        // TEST
    //                    output += Svsg.Util.pad(Svsg.Util.getColumnLineToId(column, line, Svsg.global.size), Svsg.Util.getSizeLength(Svsg.global.size))  + "|"; 
                    }
                    else {
                        output += Svsg.Util.pad(Svsg.Util.getColumnLineToId(column, line, Svsg.global.size), Svsg.Util.getSizeLength(Svsg.global.size))  + "|"; 
                    }
                }
                output += "<br>"; 
            }
            output += '--'.repeat(repeat); 
            output += "<br>"; 
            output += '&nbsp;&nbsp;'.repeat(Svsg.Util.getSizeLength(Svsg.global.size))  + "|"; 
            for(var _column = 1; _column <= Svsg.global.size; _column++){
                output += Svsg.Util.formatNumberLength(_column, Svsg.Util.getSizeLength(Svsg.global.size))  + "|";            
            }
            output += "</div>"; 
            return output;
        };
    }
};