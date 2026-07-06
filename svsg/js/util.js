https://stackoverflow.com/questions/6229197/how-to-know-if-two-arrays-have-the-same-values/34566587
Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { //To test values in nested arrays
            if (!this[i].compare(testArr[i])) return false;
        }
        else if (this[i] !== testArr[i]) return false;
    }
    return true;
};

var Svsg = Svsg || {};

Svsg.Util = {
    outputElement : function(id, value){
        this.id = id;
        this.value = value;
    },

    pad : function(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },
    
    formatNumberLength : function(num, length) {
        var r = "" + num;
        while (r.length < length) {
            r = "0" + r;
        }
        return r;
    },
    
    sortNumber : function(a, b) {
        return a - b;
    },

    getSizeLength : function(size){
        var string = "" + (size * size);

        length = string.length;
        if(length < 2){
            length = 2;
        }
        return length;
    },

    getColumnLineToId : function(column, line, size){
        if(!size){
            size = 1;
        }
        var id = size * (line - 1) + column; 
        return id;
    },

    outputTemplate : function(){
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
            this.outputFieldname = new Svsg.Util.outputElement(id, value);
            this.setOutput(id, value);
            return this;
        };
        this.gibiOutputFieldname = undefined;
        this.setGibiOutputFieldname = function(id, value){
            this.gibiOutputFieldname = new Svsg.Util.outputElement(id, value);
            this.setOutput(id, value);
            return this;
        };
        this.progress = undefined;
        this.setProgress = function(id, value){
            this.progress = new Svsg.Util.outputElement(id, value);
            this.setProgressBarValue(id, value);
            return this;
        };
        this.setProgressValue = function(value){
            this.progress.value = value;
            this.setProgressBarValue(this.progress.id, value);
        };
        this.checkShadokOutput = undefined;
        this.setCheckShadokOutput = function(id, value){
            this.checkShadokOutput = new Svsg.Util.outputElement(id, value);
            this.setOutput(id, value);
            return this;
        };
        this.gibiCheckOutput = undefined;
        this.setGibiCheckOutput = function(id, value){
            this.gibiCheckOutput = new Svsg.Util.outputElement(id, value);
            this.setOutput(id, value);
            return this;
        };
        this.collisionOutput = undefined;
        this.setCollisionOutput = function(id, value){
            this.collisionOutput = new Svsg.Util.outputElement(id, value);
            this.setOutput(id, value);
            return this;
        };
        this.gibiCollisionOutput = undefined;
        this.setGibiCollisionOutput = function(id, value){
            this.gibiCollisionOutput = new Svsg.Util.outputElement(id, value);
            this.setOutput(id, value);
            return this;
        };
        this.tryOutput = undefined;
        this.setTryOutput = function(id, value){
            this.tryOutput = new Svsg.Util.outputElement(id, value);
            this.setOutput(id, value);
            return this;
        };
        this.gibiTryOutput = undefined;
        this.setGibiTryOutput = function(id, value){
            this.gibiTryOutput = new Svsg.Util.outputElement(id, value);
            this.setOutput(id, value);
            return this;
        };
    },
};

