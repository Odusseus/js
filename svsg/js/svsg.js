var Svsg = {};

Svsg.SetOutput = function(outputFieldname, value) {
    
    var outputField = document.getElementById(outputFieldname);
    outputField.innerHTML = value;
};

Svsg.Queen = function(id) {
    this.id = id;
};

Svsg.Go = function(size, outputFieldname) {
    var fields = size * size;

    var queens = [];
    
    for(i = 0; i < size; i++){
        queens.push(new Svsg.Queen(i));
    }
    
    var queensMessage = "";
    queens.forEach(function(element) {
      queensMessage += element.id + ",";
  }, this); 

   var output = fields + " : " + queensMessage;

    Svsg.SetOutput(outputFieldname, output);
};


