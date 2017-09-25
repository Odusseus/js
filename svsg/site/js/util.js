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

var SvsgUtil = {
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
    
    sortNumber : function(a,b) {
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
};

