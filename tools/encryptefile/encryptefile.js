
var ef = ef || {};


ef.SetCookie = function(id){
   var key = document.getElementById(id).value;
   localStorage.setItem('key', key);
}

ef.GetCookie = function(id){
    const key = localStorage.getItem('key')
    document.getElementById(id).value = key;
 }

ef.output = function(result) {
    var output = document.getElementById("output");
    output.innerHTML = result;
}

ef.Encrypte = function() {
    var key = document.getElementById("keyField").value;

    var input = document.getElementById("input");
    input.innerHTML = inputText;
    
    var x = input.innerHTML;
    var newInput = sjcl.encrypt(key, input.innerHTML);
    var output = document.getElementById("output");
    output.innerHTML = newInput;
}

ef.Decrypte = function(result) {
    var key = document.getElementById("keyField").value;
    var output = document.getElementById("output").innerHTML;
    var decryptedText = sjcl.decrypt(key,output);
    var newText = JSON.parse(decryptedText);
    
    var outputDecrypted = document.getElementById("outputDecrypted");
    outputDecrypted.innerHTML = decryptedText;
}
