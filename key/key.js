/*jshint esversion: 6 */

const isDebug = () =>{
  return false;
};
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
    var match = url.match(/([A-Za-z0-9]+\.)([A-Za-z0-9]+\.[A-Za-z0-9]+)|([A-Za-z0-9]+\.[A-Za-z0-9]+)/);
    if (match != null) {    
      let url = null;
      let i = match.length - 1;
      while (url == null && i > 0) {
        if (typeof match[i] === "string"){
          url = match[i];
        }
        i--;
      } 
      return url;
    }
    else {
        return null;
    }
};

const getVersion = (id) => {
  let field = document.getElementById(id);
    field.innerHTML = `My key<br>(v1.0.${VERSION})`;
};

const clean = () => {
    let fields = document.getElementsByClassName("clean");
    for (var i=0, len=fields.length|0; i<len; i=i+1|0) {
      fields[i].value = "";
      fields[i].innerHTML = "";
      display("copyButton" + (i+1), false);
  }
};

const display = (id, onOff) => {
  var x = document.getElementById(id);
  if (onOff === true) {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};

const showKey = (showKeyId) => {
  let showKeyElement = document.getElementById(showKeyId);
  if(showKeyElement.value == "Show"){
    showKeyElement.value = "Hide";
  }
  else {
    showKeyElement.value = "Show";
  }

  let elements = document.getElementsByClassName("password");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].type === "password") {
      elements[i].type = "text";
    } else {
      elements[i].type = "password";
    }
  }  
};

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
  if (isDebug()) {
    let debugId = document.getElementById("debugId");
    let innerHTML = debugId.innerHTML;
    debugId.innerHTML  = `${innerHTML} ${myKeyText} ${urltext} ${beginKey} ${names[beginKey]}${endKey}`;
  }

  return `${name}${endKey}${addKeyText}`;
};

const getKeys = (myKey, addKey, url) => {
  
  var myKeyText = document.getElementById(myKey).value;
  var addKeyText = document.getElementById(addKey).value;
  var urltext = getHostName(document.getElementById(url).value.toLowerCase());
 
  var key1 = "url is not valide";
  var key2 = key1;
  var key3 = key1;

  if(urltext){
     key1 = getKey(myKeyText , addKeyText, urltext);
     key2 = getKey(myKeyText + '2', addKeyText, urltext);
     key3 = getKey(myKeyText + '3', addKeyText, urltext);
  }

  
  var keyId = document.getElementById("key1Id");
  keyId.innerHTML  = key1;
  display("copyButton1", true);
  
  keyId = document.getElementById("key2Id");
  keyId.innerHTML  = key2;
  display("copyButton2", true);
  
  keyId = document.getElementById("key3Id");
  keyId.innerHTML  = key3;
  display("copyButton3", true);

  var debugId = document.getElementById("debugId");
  //debugId.innerHTML  = `${myKeyText} ${urltext} ${beginKey} ${names[beginKey]}${endKey}`;
};

const selectText = (containerid) => {
  let rang;

  if (document.selection) { // IE
      range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select();
  } else if (window.getSelection) {
      range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
  }
};

const copyKey = (keyId) => {
  selectText(keyId);
  document.execCommand("copy");
};


