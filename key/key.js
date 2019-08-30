
 String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

const getHostName = (url) => {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return url;
    }
}

const getVersion = (id) => {
  let field = document.getElementById(id);
    field.innerHTML = `My key (v${VERSION})`;
}

const clean = () => {
    let fields = document.getElementsByClassName("clean");
    for (var i=0, len=fields.length|0; i<len; i=i+1|0) {
      fields[i].value = "";
      fields[i].innerHTML = "";
      display("copyButton" + (i+1), false)
  }
}

const display = (id, onOff) => {
  var x = document.getElementById(id);
  if (onOff === true) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

const showKey = (id) => {
  let field = document.getElementById(id);
  if (field.type === "password") {
    field.type = "text";
  } else {
    field.type = "password";
  }
}

const showKeys = (id1, id2) => {
  showKey(id1);
  showKey(id2);
}

const getKey = (myKeyText, addKeyText, urlText) => {
  
  var myKeyTextHash = myKeyText.hashCode();
  var urlTextHash = urlText.hashCode();
  
  var keyValue = myKeyTextHash * urlTextHash;
  var beginKey = parseInt(String(keyValue).substring(0, 4), 10);
  if(beginKey > names.length){
    beginKey = parseInt(String(keyValue).substring(0, 3), 10);
  }
  var endKey = parseInt(String(keyValue).slice(-4), 10);
  
  
  var name = names[beginKey];
  return `${name}${endKey}${addKeyText}`;

  var debugId = document.getElementById("debugId");
  var innerHTML = debugId.innerHTML;
  debugId.innerHTML  = `${innerHTML} ${myKeyText} ${urltext} ${beginKey} ${names[beginKey]}${endKey}`;
}

const getKeys = (myKey, addKey, url) => {
  
  var myKeyText = document.getElementById(myKey).value;
  var addKeyText = document.getElementById(addKey).value;
  var urltext = getHostName(document.getElementById(url).value.toLowerCase());

  var key1 = getKey(myKeyText , addKeyText, urltext);
  var key2 = getKey(myKeyText + '2', addKeyText, urltext);
  var key3 = getKey(myKeyText + '3', addKeyText, urltext);

  
  var keyId = document.getElementById("key1Id");
  keyId.innerHTML  = key1;
  display("copyButton1", true);
  
  var keyId = document.getElementById("key2Id");
  keyId.innerHTML  = key2;
  display("copyButton2", true);
  
  var keyId = document.getElementById("key3Id");
  keyId.innerHTML  = key3;
  display("copyButton3", true);

  var debugId = document.getElementById("debugId");
  //debugId.innerHTML  = `${myKeyText} ${urltext} ${beginKey} ${names[beginKey]}${endKey}`;
}

const selectText = (containerid) => {
  if (document.selection) { // IE
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select();
  } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
  }
}

const copyKey = (keyId) => {
  selectText(keyId);
  document.execCommand("copy");
}


