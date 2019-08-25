
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


const clean = (id) => {
    let field = document.getElementById(id);
    field.value = "";
}

const getKey = (myKey,url) => {
  
  var myKeyText = document.getElementById(myKey).value;
  var urltext = getHostName(document.getElementById(url).value.toLowerCase());

  var myKeyTextHash = myKeyText.hashCode();
  var urltextHash = urltext.hashCode();
  
  var keyValue = myKeyTextHash * urltextHash;
  var beginKey = parseInt(String(keyValue).substring(0, 2), 10);
  var endKey = parseInt(String(keyValue).slice(-4), 10);
  
  
  var keyId = document.getElementById("keyId");
  keyId.innerHTML  = `${names[beginKey]}${endKey}`;

  var debugId = document.getElementById("debugId");
  //debugId.innerHTML  = `${myKeyText} ${urltext} ${beginKey} ${names[beginKey]}${endKey}`;
}


