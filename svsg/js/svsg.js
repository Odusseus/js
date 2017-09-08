var Svsg = {};

Svsg.Globals = function(){
    this.size = 0;
};

Svsg.SetOutput = function(outputFieldname, value) {
    
    var outputField = document.getElementById(outputFieldname);
    outputField.innerHTML = value;
};

Svsg.GetColumn = function(){
    var column = 0;

    column = Math.floor(Math.random() * Svsg.Globals.size);

    return column;
};

Svsg.Queen = function(id) {
    this.id = id;
    this.line = this.id;
    this.GetColumn = function(){
        var column = 0;        
        column = Math.floor(Math.random() * Svsg.Globals.size);
        return column;
    };

    this.GetReach = function(){       
        return 0;
    };
    this.column = this.GetColumn();
    this.reach = this.GetReach();
};

Svsg.Go = function(size, outputFieldname) {

    Svsg.Globals.size = size;

    var fields = Svsg.Globals.size * Svsg.Globals.size;

    var queens = [];
    
    for(i = 0; i < Svsg.Globals.size; i++){
        queens.push(new Svsg.Queen(i));
    }
    
    var queensMessage = "";
    queens.forEach(function(element) {
      queensMessage += "(" + element.id + "," +element.line +","+ element.column + "),";
  }, this); 

   var output = fields + " : " + queensMessage;

    Svsg.SetOutput(outputFieldname, output);
};


