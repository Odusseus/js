// Author Pascal Boittin
// 25-10-2014
// info@odusseus.org
/*jshint esversion: 6 */
// TODO regroup invaders


var si = si || {};

si.Constant = {
    LEFTBOARD : 20,
    RIGHTBOARD : 320,
    TOPBOARD : 30,
    FLOORBOARD : 370,
    VERSION : "1.0.30",
    DEFAULTTYPE : 0,
    DEFENDER : 1,
    INVADERTYPE : 2,
    TYPENOBULLET : 0,
    TYPEBULLET1 : 1,
    TYPEBULLET2 : 2,
    TYPEBULLET3 : 3,
    TYPEBULLET4 : 4,
    TYPEBULLET5 : 5,
    TYPEBULLETBIG : 100,
    AUDIOSHOT1 : 'audioShot1',
    AUDIOSHOT2 : 'audioShot2',
    AUDIOSHOT3 : 'audioShot3',
    AUDIOCRASH1 : 'audioCrash1',
    AUDIOCRASH2 : 'audioCrash2',
    AUDIOCRASH3 : 'audioCrash3',
    SOUNDINTERVAL : 10,
    HIGHSCOREEURLTEST : "http://localhost/hs/getJson.php",
    HIGHSCOREEURL : "http://js.odusseus.org/si/hs/getJson.php",
    HTTPURL : "http://rawgit.com/Odusseus/js/master/si/si.html"
};

si.Interval = [];
si.ClearInterval = function(){
    var interval = si.Interval.shift();
    clearInterval(interval);
};

si.PlaySound = function(soundId ){
    document.getElementById(soundId).play();
    si.ClearInterval();
};

si.CreateAudioElement = function(audioFile, id){
    var audio = document.createElement("AUDIO");
    audio.src = audioFile;
    audio.setAttribute("id", id);
    audio.setAttribute("type","audio/mp3");
    document.body.appendChild(audio);
};

si.Load = function() {
    
    if (window.location.protocol == "https:"){
        window.location = si.Constant.HTTPURL;
        return;
    }

    si.CreateAudioElement("sound/shot/215438__taira-komori__shoot02.mp3", si.Constant.AUDIOSHOT1);
    si.CreateAudioElement("sound/shot/28912__junggle__btn102.mp3", si.Constant.AUDIOSHOT2);
    si.CreateAudioElement("sound/shot/221441__jalastram__shoot014.mp3", si.Constant.AUDIOSHOT3);

    si.CreateAudioElement("sound/crash/12831__schluppipuppie__crash-03.mp3", si.Constant.AUDIOCRASH1);
    si.CreateAudioElement("sound/crash/369711__mrguff__hit-impact.mp3", si.Constant.AUDIOCRASH2);
    si.CreateAudioElement("sound/crash/12734__leady__dropping-a-gun.mp3", si.Constant.AUDIOCRASH3);
    
};

si.isSound = function(){
    return document.getElementById("soundCheckbox").checked;
};

si.Random = function(min, max){
    return Math.floor((Math.random() * max) +min);
};

si.MessageText = function(text, topOn, sideOn, topOff, sideOff ){
    
    this.text = text;
    this.topOn = topOn;
    this.sideOn = sideOn;
    this.topOff = topOff;
    this.sideOff = sideOff;

    this.messages = [];
    this.current = 0;

    this.FormatMessage = function(top, side){
        if(top == "" || side == ""){
            this.messages.push(this.text);
        } else{
            var topBottom = Array(text.length + 4).join(top);
            var newText = topBottom + "<br>" + side + " " + text + " " + side + "<br>" + topBottom;
            this.messages.push(newText);
        }
    };

    this.FormatMessageOnOff = function(){
        this.FormatMessage(this.topOn, this.sideOn);
        this.FormatMessage(this.topOff, this.sideOff);
        return this;
    };

    this.FormatMessageSimple = function(){
        this.messages.push(this.text);
        return this;
    };
};

si.Sequence = function() {
    this.id = undefined;
    this.next = function() {
        if (this.id == undefined)
        {
            this.id = 0;
        }
        else
        {
            this.id++;
        }
        return this.id;
    };
};

sequence = new si.Sequence();

si.Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
};

si.Vehicle = function (id, width, height, centerX, centerY, fireDirection, numberOfBullets, forms, typeOfBullets) {

    this.id = id;
    this.fireDirection = fireDirection;
    this.numberOfBullets = numberOfBullets;
    this.typeOfBullets = typeOfBullets;
    this.width = width;
    this.halfWidth = Math.ceil(width / 2);
    this.height = height;
    this.halfHeight = Math.ceil(height / 2);

    this.center = new si.Coordinate(centerX, centerY);

    this.forms = forms;
    this.currentForm = 2;

    this.nextCurrentForm = function () {
        if (this.currentForm == 0) {
            this.currentForm++;
            return;
        }

        if (this.currentForm == 1) {
            return;
        }

        this.currentForm ++;
        if( this.currentForm == this.forms.length ){
            this.currentForm = 2;
        }
    };


    this.getCoordinateXLeftUp = function (width, centerX) {
        return centerX - Math.ceil(width / 2);
    };

    this.getCoordinateYLeftUp = function (height, centerY) {
        return centerY - Math.ceil(height / 2);
    };

    this.getCoordinateXRightUp = function (width, centerX) {
        return centerX + Math.ceil(width / 2);
    };

    this.getCoordinateYRightUp = function (height, centerY) {
        return centerY - Math.ceil(height / 2);
    };

    this.getCoordinateXLeftDown = function (width, centerX) {
        return centerX - Math.ceil(width / 2);
    };

    this.getCoordinateYLeftDown = function (height, centerY) {
        return centerY + Math.ceil(height / 2);
    };

    this.getCoordinateXRightDown = function (width, centerX) {
        return centerX + Math.ceil(width / 2);
    };

    this.getCoordinateYRightDown = function (height, centerY) {
        return centerY + Math.ceil(height / 2);
    };

    this.leftUp = new si.Coordinate(0, 0);
    this.rightUp = new si.Coordinate(0, 0);

    this.leftDown = new si.Coordinate(0, 0);
    this.rightDown = new si.Coordinate(0, 0);


    this.setUpAndDown = function () {
        this.leftUp.x = this.getCoordinateXLeftUp(this.width, this.center.x);
        this.leftUp.y = this.getCoordinateYLeftUp(this.height, this.center.y);

        this.rightUp.x = this.getCoordinateXRightUp(this.width, this.center.x);
        this.rightUp.y = this.getCoordinateYRightUp(this.height, this.center.y);

        this.leftDown.x = this.getCoordinateXLeftDown(this.width, this.center.x);
        this.leftDown.y = this.getCoordinateYLeftDown(this.height, this.center.y);

        this.rightDown.x = this.getCoordinateXRightDown(this.width, this.center.x);
        this.rightDown.y = this.getCoordinateYRightDown(this.height, this.center.y);
    };

    this.setUpAndDown();
    
    this.setCenterUpAndDown = function (x, y) {
        this.nextCurrentForm();
        this.center.x = x;
        this.center.y = y;

        this.setUpAndDown();

    };
};

si.Page = function () {

    this.leftBoard = si.Constant.LEFTBOARD;
    this.rightBoard = si.Constant.RIGHTBOARD;
    this.topBoard = si.Constant.TOPBOARD;
    this.floorBoard = si.Constant.FLOORBOARD;

    this.createDiv = function (vehicle) {
        var div = document.createElement("div");
        div.style.position = 'absolute';
        div.style.textAlign = "center";
        div.id = vehicle.id;
        document.body.appendChild(div);
        this.setDiv(vehicle);
    };

    this.setDiv = function (vehicle) {
        var div = document.getElementById(vehicle.id);
        if(div){
            div.style.left = vehicle.leftUp.x + "px";
            div.style.top = vehicle.leftUp.y + "px";
            div.innerHTML = vehicle.forms[vehicle.currentForm];
        }
    };

    this.removeDiv = function (id) {
        var div = document.getElementById(id);
        if(div){
            document.body.removeChild( div );
        }
    };

    this.setForm = function (vehicle) {
        var div = document.getElementById(vehicle.id);
        div.innerHTML = vehicle.forms[vehicle.currentForm];
    };
};

page = new si.Page();

si.Bullet = function (id, width, height, x, y, fireDirection, typeOfBullets) {

    this.typeOfBullets = typeOfBullets;
    this.forms = [];
    this.damage = -10;
    this.width = width;
    this.height = height;
    this.fireSoundId = si.Constant.AUDIOSHOT1;
    this.collisionSoundId = si.Constant.AUDIOCRASH1;

    if (typeOfBullets != si.Constant.TYPEBULLETBIG && typeOfBullets > 5){
        typeOfBullets = 5;
    }

    if(typeOfBullets == si.Constant.TYPEBULLET1){
       this.forms[0] = "";
       this.forms[1] = "+.+<br>+.+";
       this.forms[2] = "+";
       this.damage = -10;
       this.width = 20;
       this.fireSoundId = si.Constant.AUDIOSHOT1;
       this.collisionSoundId = si.Constant.AUDIOCRASH1;
       }

    if(typeOfBullets == si.Constant.TYPEBULLET2){
        this.forms[0] = "";
        this.forms[1] = "*.*<br>*.*";
        this.forms[2] = "*";
        this.damage = -5;
        this.width = 20;
        this.fireSoundId = si.Constant.AUDIOSHOT2;
        this.collisionSoundId = si.Constant.AUDIOCRASH2;
    }
    
    if(typeOfBullets == si.Constant.TYPEBULLET3){
        this.forms[0] = "";
        this.forms[1] = ".o.<br>.o.";
        this.forms[2] = "0";
        this.damage = -10;
        this.width = 25;
        this.fireSoundId = si.Constant.AUDIOSHOT3;
        this.collisionSoundId = si.Constant.AUDIOCRASH3;
    }

    if(typeOfBullets == si.Constant.TYPEBULLET4){
        this.forms[0] = "";
        this.forms[1] = "-x-<br>-x-";
        this.forms[2] = "(:)";
        this.damage = -15;
        this.width = 30;
        this.fireSoundId = si.Constant.AUDIOSHOT2;
        this.collisionSoundId = si.Constant.AUDIOCRASH2;
    }

    if(typeOfBullets == si.Constant.TYPEBULLET5){
        this.forms[0] = "";
        this.forms[1] = "v.v<br>v.v";
        this.forms[2] = "VV";
        this.damage = -20;
        this.width = 35;
        this.fireSoundId = si.Constant.AUDIOSHOT3;
        this.collisionSoundId = si.Constant.AUDIOCRASH3;
    }

    if(typeOfBullets == si.Constant.TYPEBULLETBIG){
        this.forms[0] = "";
        this.forms[1] = ".x..x.<br>.*..*.";
        this.forms[2] = "^##^<br>V##V";
        this.damage = -20;
        this.width = 40;
        this.fireSoundId = si.Constant.AUDIOSHOT3;
        this.collisionSoundId = si.Constant.AUDIOCRASH3;
    }

    this.vehicle = new si.Vehicle(id, this.width, this.height, x, y, fireDirection, undefined, this.forms, si.Constant.TYPENOBULLET);
    this.active = true;
    this.explosionState = 2;
    this.move = true;
    
    this.moveUp = function () {
        if (this.move == true) {
            var x = this.vehicle.center.x;
            var y = this.vehicle.center.y + (this.vehicle.fireDirection * 3 * this.vehicle.height);
            this.vehicle.setCenterUpAndDown(x, y);

            if (y < page.topBoard) {
                this.move = false;
                this.active = false;
                this.vehicle.currentForm = 0;
                this.setForm();
            }
            
            this.checkCollision();

            if (y > page.floorBoard) {
                this.move = false;
                this.active = false;
                this.vehicle.currentForm = 1;
                this.setForm();
                if(si.isSound()){
                    //var sound = document.getElementById( this.collisionSound);
                    //sound.play();
                    var soundId = this.collisionSoundId;
                    document.getElementById(soundId).play();
                    document.getElementById(soundId).pause();
                    var interval = setInterval(function() { si.PlaySound(soundId); } , si.Constant.SOUNDINTERVAL);
                    si.Interval.push(interval); 
                }
                return;
            }
        }
    };

    this.checkCollision = function (){
        if(!this.active){
            return;
        }
        
        var noCollision = true;
        var message = "";
        var i = 0;
        var messageText = "";

        if(noCollision){
            for ( i = 0; i < theBunkers.bunkers.length; i++) {
                var bunker = theBunkers.bunkers[i];
                if (bunker.active) {
                    if (
                        ((this.vehicle.leftDown.x >= bunker.vehicle.leftUp.x && this.vehicle.leftDown.x <= bunker.vehicle.rightUp.x) ||
                            (this.vehicle.rightDown.x <= bunker.vehicle.rightUp.x && this.vehicle.rightDown.x >= bunker.vehicle.leftUp.x)
                        ) &&
                        ( this.vehicle.leftDown.y >= bunker.vehicle.leftUp.y && this.vehicle.leftDown.y <= bunker.vehicle.leftDown.y)
                       ) 
                    {   
                        noCollision = false;
                        bunker.setLives(this.damage);
                        bunker.vehicle.currentForm = bunker.getCurrent();
                        page.setForm(bunker.vehicle);
            
                        // The bullet
                        this.active = false;
                        this.move = false;
                        this.vehicle.currentForm = 1;
                        this.setForm();
                        if(si.isSound()){
                            //var sound = document.getElementById( this.collisionSound);
                            //sound.play();
                            var soundId = this.collisionSoundId;
                            document.getElementById(soundId).play();
                            document.getElementById(soundId).pause();
                            var interval = setInterval(function() { si.PlaySound(soundId); } , si.Constant.SOUNDINTERVAL);
                            si.Interval.push(interval); 
                        }
                        return;
                    }
                 }
                }
        }
        
    if(noCollision){
        // if (
        //     (this.vehicle.center.x >= player.vehicle.leftUp.x && this.vehicle.center.x <= player.vehicle.rightUp.x) &&
        //     (this.vehicle.center.y >= player.vehicle.leftUp.y && this.vehicle.center.y <= player.vehicle.leftDown.y)
        //    )
        if (
            ((this.vehicle.leftDown.x >= player.vehicle.leftUp.x && this.vehicle.leftDown.x <= player.vehicle.rightUp.x) ||
                (this.vehicle.rightDown.x <= player.vehicle.rightUp.x && this.vehicle.rightDown.x >= player.vehicle.leftUp.x)
            ) &&
            ( this.vehicle.leftDown.y >= player.vehicle.leftUp.y && this.vehicle.leftDown.y <= player.vehicle.leftDown.y)
           ) 
        {
            noCollision = false;
            player.lives += this.damage;
            
            message = new si.MessageText(player.getHitMessage(), "-","|", "*","+").FormatMessageSimple(); //.FormatMessageOnOff();
            theMessages.new(player.vehicle, message);
            
            this.active = false;
            this.move = false;
            this.vehicle.currentForm = 1;
            this.setForm();
            if(si.isSound()){
                //document.getElementById( this.collisionSound).play();
                var soundId = this.collisionSoundId;
                document.getElementById(soundId).play();
                document.getElementById(soundId).pause();
                var interval = setInterval(function() { si.PlaySound(soundId); } ,si.Constant.SOUNDINTERVAL);
                si.Interval.push(interval); 
            }
            return;
        }
    }

    if (noCollision) {
        for ( i = 0; i < theInvaders.invaders.length; i++) {
            if (theInvaders.invaders[i].active) {
                var invader = theInvaders.invaders[i];
                if (((this.vehicle.leftUp.x >= invader.vehicle.leftDown.x && this.vehicle.leftUp.x <= invader.vehicle.rightDown.x) ||
                    (this.vehicle.rightUp.x <= invader.vehicle.rightDown.x && this.vehicle.rightUp.x >= invader.vehicle.leftDown.x)
                    ) && (this.vehicle.leftUp.y <= invader.vehicle.leftDown.y && this.vehicle.leftUp.y >= invader.vehicle.leftUp.y)
                    ) {
                        this.active = false;
                        this.move = false;
                        this.vehicle.currentForm = 1;
                        this.setForm();
                        if(si.isSound()){
                            //document.getElementById( this.collisionSound).play();
                            var soundId = this.collisionSoundId;
                            document.getElementById(soundId).play();
                            document.getElementById(soundId).pause();
                            var interval = setInterval(function() { si.PlaySound(soundId); } ,si.Constant.SOUNDINTERVAL);
                            si.Interval.push(interval); 
                            }
                        invader.active = false;
                        invader.vehicle.currentForm = 1;
                        invader.setForm();
                        invader.move = false;
                        game.total -= this.damage;
                        messageText = new si.MessageText(invader.getHitMessage(), "-","|", "*","+").FormatMessageSimple(); //.FormatMessageOnOff();
                        theMessages.new(invader.vehicle, messageText);
                        return;
                    }
                }
            }
        }

        if (noCollision) {
            if(theBigVaders){
                for(i = 0; i < theBigVaders.bigVaders.length; i++){
                    var bigVader = theBigVaders.bigVaders[i];
                    if (bigVader.active) {
                        if (((this.vehicle.leftUp.x >= bigVader.vehicle.leftDown.x && this.vehicle.leftUp.x <= bigVader.vehicle.rightDown.x) ||
                        (this.vehicle.rightUp.x <= bigVader.vehicle.rightDown.x && this.vehicle.rightUp.x >= bigVader.vehicle.leftDown.x)
                    ) && (this.vehicle.leftUp.y <= bigVader.vehicle.leftDown.y && this.vehicle.leftUp.y >= bigVader.vehicle.leftUp.y)
                    ) {
                        this.active = false;
                        this.move = false;
                        this.vehicle.currentForm = 1;
                        this.setForm();
                            if(si.isSound()){
                                //document.getElementById( this.collisionSound).play();
                                var soundId = this.collisionSoundId;
                                document.getElementById(soundId).play();
                                document.getElementById(soundId).pause();
                                var interval = setInterval(function() { si.PlaySound(soundId); } ,si.Constant.SOUNDINTERVAL);
                                si.Interval.push(interval); 
                            }
                            bigVader.setLives(this.damage);
                            bigVader.setForm();
                            game.total += - this.damage;
                            messageText = new si.MessageText(bigVader.getHitMessage(), "-","|", "*","+").FormatMessageSimple(); //.FormatMessageOnOff();
                            if(si.Random(1, 7) == 1 ){
                                theMessages.new(bigVader.vehicle, messageText);
                            }
                            return;
                        }
                    }   
                }
            }
        }
    };
    
    this.setForm = function () {
        page.setForm(this.vehicle);
    };
};


si.Bullets = function () {
    this.bullets = [];

    this.fire = function(vehicle) {
        for (var i = 0, x = vehicle.center.x + vehicle.halfWidth, y = vehicle.center.y + (vehicle.fireDirection * vehicle.height), width = 2, height = 2; i < vehicle.numberOfBullets; i++) {
        
            var newBullet = new si.Bullet(sequence.next(), width, height, x, y, vehicle.fireDirection, vehicle.typeOfBullets);
            this.bullets.push(newBullet);
            page.createDiv(newBullet.vehicle);

            y = y + (vehicle.fireDirection * (3 + i) * height);

            if(si.isSound()){
                var fireSoundId = newBullet.fireSoundId;
                document.getElementById(fireSoundId).play();
                document.getElementById(fireSoundId).pause();
                var interval = setInterval(function() { si.PlaySound(fireSoundId); } ,si.Constant.SOUNDINTERVAL);
                si.Interval.push(interval); 
            }
        }
    };

    this.move = function () {

        var newBullets = [];
        for (var ii = 0; ii < this.bullets.length; ii++) {

            if (this.bullets[ii].active == true) {
                this.bullets[ii].moveUp();
                page.setDiv(this.bullets[ii].vehicle);
                this.bullets[ii].checkCollision();
                newBullets.push(this.bullets[ii]);
            } else if(this.bullets[ii].explosionState > 0){
                this.bullets[ii].explosionState--;
                if(this.bullets[ii].explosionState == 0){
                    this.bullets[ii].vehicle.currentForm = 0;
                }
                page.setDiv(this.bullets[ii].vehicle);
                newBullets.push(this.bullets[ii]);
            } else {
                this.clean(this.bullets[ii]);
            }
        }
        this.bullets = newBullets;
    };

    this.cleanAll = function(){        
        for(var i = 0; i < this.bullets.length; i++){
            var bullet = this.bullets[i];
            page.removeDiv(bullet.vehicle.id);
        }
        this.bullets = [];
    };

    this.clean = function(bullet){       
            page.removeDiv(bullet.vehicle.id);
    };

};

theBullets = new si.Bullets();

si.Message = function (id, x, y, message) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.message = message;
    this.state = si.Random(1, 100);

    this.createDiv = function () {
        var div = document.createElement("div");
        div.style.position = 'absolute';
        div.style.textAlign = "center";
        div.id = this.id;
        div.style.left = x + "px";
        div.style.top = y + "px";
        div.innerHTML = message.messages[message.current];
        document.body.appendChild(div);
    };

    this.cleanDiv = function(){
        var div;
        if(this.state > 0){
            this.state--;
            if( this.state % 15 == 0){

                div = document.getElementById(this.id);
                message.current++;
                if(message.current == message.messages.length){
                    message.current = 0;
                }
                div.innerHTML = message.messages[message.current];
            }
            return false;
        } else {
            div = document.getElementById(this.id);
            document.body.removeChild( div );
            return true;
        }
    };
};

si.Messages = function () {
    this.messages = [];

    this.new = function(vehicle, message) {
        var x = vehicle.center.x - si.Random(30,100);
        if( x < si.Constant.LEFTBOARD || x > si.Constant.RIGHTBOARD){
            x = vehicle.center.x;
        }
        var y = vehicle.center.y - si.Random(20,100);
        if( y < si.Constant.FLOORBOARD || y > si.Constant.TOPBOARD){
            y = vehicle.center.y;
        }
        
        var newMessage = new si.Message(sequence.next(), x, y, message);

        this.messages.push(newMessage);
        newMessage.createDiv();
    };

    this.cleanDiv = function(){
        newMessages = [];

        for(var i = 0; i < this.messages.length; i++){
            var element = this.messages[i];
            if(!element.cleanDiv()){
                newMessages.push(element);
            }
        }
        this.messages = newMessages;
    };
};

theMessages = new si.Messages();

si.Player = function (id, width, height, x, y, forms) {

    this.active = true;
    this.explosionState = 3;
    this.lives = 100;
    this.vehicle = new si.Vehicle(id, width, height, x, y, -1, 2, forms, si.Constant.TYPEBULLET1);
    this.lastKeyPress = undefined;
    this.runOld = 0;

    page.createDiv(this.vehicle);
    
    this.move = function () {
        switch (this.lastKeyPress) {
            case 32:
                this.fire();
                break;
            case 37:
                this.moveLeft();
                break;
            case 38:
                //this.moveUp();
                break;
            case 39:
                this.moveRight();
                break;
            case 40:
                //this.moveDown();
                break;
        }
        this.lastKeyPress = undefined;

    };

    this.moveNow = function(){

        page.setDiv(this.vehicle);
    };

    this.moveRight = function () {

        var x = this.vehicle.center.x + this.vehicle.halfWidth;
        var y = this.vehicle.center.y;

        if(x < page.rightBoard){
            this.vehicle.setCenterUpAndDown(x, y);
            this.moveNow();
        }
        this.checkCollision();
    };

    this.moveLeft = function () {

        var x = this.vehicle.center.x - this.vehicle.halfWidth;
        var y = this.vehicle.center.y;

        if(x > page.leftBoard){
            this.vehicle.setCenterUpAndDown(x, y);
            this.moveNow();
        }
        this.checkCollision();
    };

    this.moveUp = function () {

        var x = this.vehicle.center.x;
        var y = this.vehicle.center.y - this.vehicle.halfHeight;

        this.vehicle.setCenterUpAndDown(x, y);

        this.moveNow();
        this.checkCollision();
    };

    this.moveDown = function () {

        var x = this.vehicle.center.x;
        var y = this.vehicle.center.y + this.vehicle.halfHeight;

        this.vehicle.setCenterUpAndDown(x, y);

        this.moveNow();
        this.checkCollision();
    };

    this.checkCollision = function () {

        for (var i = 0; i < theInvaders.invaders.length; i++) {

            if (theInvaders.invaders[i].active) {

                var invader = theInvaders.invaders[i];

                if (((this.vehicle.leftUp.x <= invader.vehicle.leftDown.x && this.vehicle.leftUp.x >= invader.vehicle.center.x) ||
                        (this.vehicle.rightUp.x >= invader.vehicle.rightDown.x && this.vehicle.rightUp.x <= invader.vehicle.center.x)
                    ) && (this.vehicle.leftUp.y >= invader.vehicle.leftDown.y && this.vehicle.leftUp.y <= invader.vehicle.center.y)
                ) {
                    invader.active = false;
                    invader.move = false;
                    invader.vehicle.currentForm = 1;
                    game.total += invader.lives;
                    invader.setForm();
                }
            }
        }
    };

    this.fire = function () {
        if(game.run < this.runOld){
            return;
        }

        this.runOld = game.run + 10;

        if (game.run % 4 == 0) {
            theBullets.fire(this.vehicle);
        } else {
            if(game.run % 7 == 0){
                var message = new si.MessageText("Gun to warm!", "-","|", "*","+").FormatMessageSimple(); //.FormatMessageOnOff();
                theMessages.new(player.vehicle, message);
            }
        }
    };

    this.setForm = function () {
        page.setForm(this.vehicle);
    };

    this.getHitMessage = function(){
        var messages = ["Je suis touché!", "I am hit!", "Me han dado!", "Shit!", "Scheiße!","Bonzai!","Merdre!", "Mierda", "A dieu.", "KxT???", "Maman?", "Vader?", "Damned", "Maldicion"];

        var id = si.Random(0, messages.length) ;

        return messages[id];
    };
};

var playerForms = [];

playerForms[0] = "";
playerForms[1] = "X * X<br>x x<br>+<br>x x<br>X * X";
playerForms[2] = "/ \\<br>[..]";
playerForms[3] = "/ \\<br>[**]";


var player = new si.Player(sequence.next(), 20, 20, Math.ceil(page.rightBoard / 2), page.floorBoard, playerForms);

si.Invader = function (id, width, height, x, y, lives, forms, level ) {
    this.vehicle = new si.Vehicle(id, width, height, x, y, 1, 1, forms, level);
    this.direction = 1;
    this.explosionState = 3;
    this.active = true;
    this.move = true;
    this.lives = lives;
    this.switchDirection = function() {
        this.direction = this.direction * -1;
    };

    this.moveLeftAndRight = function () {
        if (this.move == true) {

            var x = this.vehicle.center.x + (this.direction * this.vehicle.halfWidth);
            var y = this.vehicle.center.y;
            this.vehicle.setCenterUpAndDown(x, y);

            if (x > page.rightBoard) {
                return true;
            }

            if (x < page.leftBoard) {
                return true;
            }
            this.checkCollision();
            return false;
        }
    };

    this.moveDown = function () {
        if (this.move == true) {

            var x = this.vehicle.center.x;
            var y = this.vehicle.center.y + this.vehicle.halfHeight;
            this.vehicle.setCenterUpAndDown(x, y);

            // if (y > page.floorBoard) {

            //     return this.checkFloor();
            // }

            this.checkCollision();
            return false;
        }
    };

    this.setForm = function() {
        page.setForm(this.vehicle);
    };

    this.checkCollision = function () {

        if (this.vehicle.center.y >= si.Constant.FLOORBOARD ||
            ((this.vehicle.leftDown.x >= player.vehicle.leftUp.x && this.vehicle.leftDown.x <= player.vehicle.rightUp.x) ||
                        (this.vehicle.rightDown.x <= player.vehicle.rightUp.x && this.vehicle.rightDown.x >= player.vehicle.leftUp.x)
                    ) && (this.vehicle.leftDown.y >= player.vehicle.leftUp.y && this.vehicle.leftDown.y <= player.vehicle.leftDown.y)
                ) {
                    player.active = false;
                    player.lives = 0;
                }
    };

    this.fire = function () {

        var fireTime = si.Random(1, 10);
        if (fireTime == 1) {

            var isPlaceToFire = true;
            for(var i = 0; i < theInvaders.invaders.length; i++ )
            {
                if (this.id != theInvaders.invaders[i]) {
                    if (this.vehicle.leftDown.y <= theInvaders.invaders[i].vehicle.leftUp.y) {
                        if ((this.vehicle.leftDown.x >= theInvaders.invaders[i].vehicle.leftUp.x &&
                            this.vehicle.leftDown.x <= theInvaders.invaders[i].vehicle.rightUp.x) ||
                           (this.vehicle.rightDown.x <= theInvaders.invaders[i].vehicle.rightUp.x &&
                            this.vehicle.rightDown.x >= theInvaders.invaders[i].vehicle.leftUp.x)
                           ) {
                            isPlaceToFire = false;
                            break;
                        }
                    }
                }
             }
            
            if (isPlaceToFire) {
                theBullets.fire(this.vehicle);
            }
        }
    };

    this.getHitMessage = function(){
        var messages = ["Merdre!", "Shit!", "Scheiße!","Mierda", "Bonzai!","F*ck!","A dieu.", "Malicion", "KxT???", "Maman?", "Darth Vader?", "Damned", "Mama!", "Mutti", "Me quemo!"];

        var id = si.Random(0, messages.length) ;

        return messages[id];
    };

    this.setLives = function(lives){
        this.lives += lives;
        if(this.lives <= 0){
            this.active = false;
            this.move = false;
            this.vehicle.currentForm = 1;
        }
    };
};

si.Invaders = function(level) {
    this.invaders = [];
    this.forms = [];

    if(!level){
        level = 0;
    }

    var modulus = level % 5;

    if(modulus==0){
        this.forms[0] = "";
        this.forms[1] = "+ * + * <br> +*+ <br> + * + *";
        this.forms[2] = "{x}";
        this.forms[3] = "{XX}";
    }

    if(modulus == 1){
        this.forms[0] = "";
        this.forms[1] = "+ X + X <br> +x+ <br> + X + X";
        this.forms[2] = "[o]";
        this.forms[3] = "]00[";
    }

    if(modulus == 2){
        this.forms[0] = "";
        this.forms[1] = "@ - @ - <br> -$- <br> - @ - @";
        this.forms[2] = "!#!";
        this.forms[3] = "{--}";
    }

    if(modulus == 3){
        this.forms[0] = "";
        this.forms[1] = "a . u . <br> .X. <br> . u . a";
        this.forms[2] = "/U&#92;";
        this.forms[3] = "&#92;AA/";
    }

    if(modulus == 4){
        this.forms[0] = "";
        this.forms[1] = "o - o - <br> -O- <br> - o - o";
        this.forms[2] = "+O+";
        this.forms[3] = "-oo-";
    }

    for (var i = 0, x = page.leftBoard, y = page.topBoard, width = 20, height = 7; i < 4; i++, x = page.leftBoard) {
        for (var j = 0; j < height; j++) {
            var typeOfBullets = level + 1;
            var newInvader = new si.Invader(sequence.next(), width, height, x, y, 10, this.forms, typeOfBullets);
            this.invaders.push(newInvader);
            page.createDiv(newInvader.vehicle);
                 
            x = x + (2 * width);
            //break;
        }
        //break;
        y = y + (2 * height);
    }

    this.cleanAll = function(){
        for(var i = 0; i < this.invaders.length; i++){
            var invader = this.invaders[i];
            page.removeDiv(invader.vehicle.id);
        }
        this.invaders = [];
    };

    this.clean = function(invader){       
            page.removeDiv(invader.vehicle.id);
    };

    this.move = function () {

        var switchdirection = false;
        var stopMove = false;
        var newInvaders = [];

        for (var i = 0; i < this.invaders.length; i++) {

            if (this.invaders[i].active == true) {
                this.invaders[i].fire();
                switchdirection = this.invaders[i].moveLeftAndRight() || switchdirection;
                page.setDiv(this.invaders[i].vehicle);
                newInvaders.push(this.invaders[i]);
            } else if (this.invaders[i].explosionState > 0) {
                    this.invaders[i].explosionState--;
                    if(this.invaders[i].explosionState == 0){
                        this.invaders[i].vehicle.currentForm = 0;
                    }
                    page.setDiv(this.invaders[i].vehicle);
                    newInvaders.push(this.invaders[i]);
                }
        }

        this.invaders = newInvaders;

            if (switchdirection) {
                for (j = 0; j < this.invaders.length; j++) {
                    if (this.invaders[j].active == true) {
                        this.invaders[j].switchDirection();
                        stopMove = this.invaders[j].moveDown() || stopMove;
                    }
                }
                switchdirection = false;
            }

            if (stopMove) {
                for (j = 0; j < this.invaders.length; j++) {
                    if (this.invaders[j].active == true) {
                        this.invaders[j].move = false;
                    }
                }
            }
    };
};

theInvaders = new si.Invaders(0);

//*****************************************
si.BigVader = function (id, width, height, x, y, lives, forms ) {
    this.vehicle = new si.Vehicle(id, width, height, x, y, 1, 1, forms, si.Constant.TYPEBULLETBIG);
    this.direction = -1;
    this.explosionState = 3;
    this.active = true;
    this.move = true;
    this.lives = lives;
    this.switchDirection = function() {
        this.direction = this.direction * -1;
    };

    this.moveLeftAndRight = function () {
        if (this.move == true) {

            var x = this.vehicle.center.x + (this.direction * 5);
            var y = this.vehicle.center.y;
            this.vehicle.setCenterUpAndDown(x, y);

            if (x + this.vehicle.halfWidth > page.rightBoard) {
                return true;
            }

            if (x - this.vehicle.halfWidth < page.leftBoard) {
                return true;
            }
            //this.checkCollision();
            return false;
        }
    };    

    this.setForm = function() {
        page.setForm(this.vehicle);
    };

    this.fire = function () {

        var fireTime = si.Random(1, 20);
        if (fireTime == 1) {

            var isPlaceToFire = true;
            for(var i = 0; i < theInvaders.invaders.length; i++ )
            {
                if (this.id != theInvaders.invaders[i]) {
                    if (this.vehicle.leftDown.y <= theInvaders.invaders[i].vehicle.leftUp.y) {
                        if ((this.vehicle.leftDown.x >= theInvaders.invaders[i].vehicle.leftUp.x &&
                            this.vehicle.leftDown.x <= theInvaders.invaders[i].vehicle.rightUp.x) ||
                           (this.vehicle.rightDown.x <= theInvaders.invaders[i].vehicle.rightUp.x &&
                            this.vehicle.rightDown.x >= theInvaders.invaders[i].vehicle.leftUp.x)
                           ) {
                            isPlaceToFire = false;
                            break;
                        }
                    }
                }
             }
            
            if (isPlaceToFire) {
                theBullets.fire(this.vehicle);
            }
        }
    };

    this.getHitMessage = function(){
        var messages = ["Merdre!", "Shit!", "Scheiße!","Bonzai!","F*ck!","A dieu.", "KxT???", "Maman?", "Vader?", "Damned", "Mama!", "Mutti"];

        var id = si.Random(0, messages.length) ;

        return messages[id] + " Live:" + this.lives;
    };

    this.setLives = function(lives){
        this.lives += lives;
        if(this.lives <= 0){
            this.active = false;
            this.move = false;
            this.vehicle.currentForm = 1;
        }
    };
};

si.BigVaders = function() {
    this.bigVaders = [];
    this.forms = [];
    this.level = 0;

    this.new = function(level){
        this.clean();
        if(this.bigVaders.length == 0){
            this.lives = 200;
            this.level = level;
            this.setForms();
            var newBigVader = new si.BigVader(sequence.next(), this.width, this.height, this.x, this.y, this.lives, this.forms);
            this.bigVaders.push(newBigVader);
            page.createDiv(newBigVader.vehicle);
        }
        return this;
    };

    this.setForms = function(){
    
        var modulus = this.level % 2;
        if(modulus==0){
            this.forms[0] = "";
            this.forms[1] = " &#92; &#92; &#92; &#92; <br> &gt; o &lt; <br> / / / /";
            this.forms[2] = "/(^.^)/";
            this.forms[3] = "&#92;^o_o^&#92;";
            this.width = 35; // 5 for 1 character
            this.height = 7;
            this.x = si.Constant.RIGHTBOARD - (this.width / 2);
            this.y = si.Constant.TOPBOARD;
            this.lives = 200;
        }

        if(modulus==1){
            this.forms[0] = "";
            this.forms[1] = "+ * + * <br> +*+ <br> + * + *";
            this.forms[2] = "{+==0=0==+}";
            this.forms[3] = "-X==o=o==X-";
            this.width = 55;
            this.height = 7;
            this.x = si.Constant.RIGHTBOARD - (this.width / 2);
            this.y = si.Constant.TOPBOARD;
            this.lives = 200;
        }
    };

    this.clean = function(){
        if(this.bigVaders.length == 0){
            return;
        }

        var newBigVaders = [];
        for(var i = 0; i < this.bigVaders.length; i++){
            var element = this.bigVaders[i];

            if (element.active){
               newBigVaders.push(element);
               } else {
                    page.removeDiv(element.vehicle.id);
            }
        }

        this.bigVaders = newBigVaders;
    };

    this.move = function () {

        var switchdirection = false;
        var stopMove = false;
        var i = 0;

        for (i = 0; i < this.bigVaders.length; i++) {

            if (this.bigVaders[i].active == true) {
                this.bigVaders[i].fire();
                switchdirection = this.bigVaders[i].moveLeftAndRight() || switchdirection;
                page.setDiv(this.bigVaders[i].vehicle);
            } else if (this.bigVaders[i].explosionState > 0) {
                    this.bigVaders[i].explosionState--;
                    if(this.bigVaders[i].explosionState == 0){
                        this.bigVaders[i].vehicle.currentForm = 0;
                    }
                    page.setDiv(this.bigVaders[i].vehicle);
                }
        }
        
        if (switchdirection) {
            for (j = 0; j < this.bigVaders.length; j++) {
                if (this.bigVaders[j].active == true) {
                    this.bigVaders[j].switchDirection();
                }
            }
            switchdirection = false;
        }

        if (stopMove) {
            for(i = 0; i < this.bigVaders.length;i++){
                var element = this.bigVaders[i];
                if (element.active == true) {
                    element.move = false;
                }
            }
        }    
    };
};

theBigVaders = undefined;

si.Bunker = function(id, width, height, centerX, centerY){

    this.direction = 0;
    this.active = true;
    this.move = true;
    this.lives = 100;
    
    this.forms = [];
    this.forms[0] = "";
    this.forms[1] = "....<br>...<br>..";
    this.forms[2] = "----<br>----";
    this.forms[3] = "====<br>====";
    this.forms[4] = "####<br>####";
    this.forms[5] = "####<br>####<br>####";
    
    // function (id, width, height, centerX, centerY, fireDirection, numberOfBullets, forms) 
    this.vehicle = new si.Vehicle(id, width, height, centerX, centerY, 0, 0, this.forms, si.Constant.TYPENOBULLET);

    this.setLives = function(damage){
        this.lives += damage;
        if(this.lives <= 0){
            this.active = false;
        } 
    };

    this.getCurrent = function(){
        
        if(this.lives > 80){
             return 5;
        }

        if(this.lives > 50){
            return 4;
        }

        if(this.lives > 30){
            return 3;
        }
        
        if(this.lives > 10){
            return 2;
        }

        return 0;
    };

    this.vehicle.currentForm = this.getCurrent();
};

si.Bunkers = function(){
    this.bunkers = [];
    //id, width, height, centerX, centerY
    this.bunkers.push(new si.Bunker(sequence.next(), 40, 7, 50, 290));
    this.bunkers.push(new si.Bunker(sequence.next(), 40, 7, 150, 290));
    this.bunkers.push(new si.Bunker(sequence.next(), 40, 7, 250, 290));

    for(var i = 0; i < this.bunkers.length;i++){
        var element = this.bunkers[i];
        page.createDiv(element.vehicle);
    }

    this.cleanAll = function(){
        for(var i = 0; i < this.bunkers.length; i++){
            var bunker = this.bunkers[i];
            page.removeDiv(bunker.vehicle.id);
        }
        this.bunkers = [];
    };
    
};

theBunkers = new si.Bunkers();


si.Game = function () {
    this.runnerInterval = undefined;
    this.velocity = 50;

    this.run = 0;
    
    this.total = 0;
    this.totalDiv = document.getElementById("total");

    this.level = 1;
    this.levelDiv = document.getElementById("level");
    this.levelDiv.innerHTML = this.level;

    this.lives = 0;
    this.livesDiv = document.getElementById("lives");

    this.Runner = function ()
    {
        this.run++;

        player.move();

        if (this.velocity > 5 && this.run % 100 == 0)
        {
            this.velocity -= 1;
        }

        if (this.run % this.velocity == 0) {
            theInvaders.move();
        }

        if(this.run % 2000 == 0){
            if(!theBigVaders){
                theBigVaders = new si.BigVaders().new(this.level);
            } else {
                theBigVaders.new(this.level);
            }
        }

        if ( this.run % 20 == 0 && theBigVaders) {
            theBigVaders.move();
        }

         
        if (this.run % 7 == 0) {
            theBullets.move();
        }

        theMessages.cleanDiv();

        // Info message
        //this.infoDiv = document.getElementById("errormessage");
        //this.infoDiv.innerHTML = this.run;

        if(player.lives < 0){
            player.lives = 0;
        }
        this.livesDiv.innerHTML = player.lives;
        this.totalDiv.innerHTML = this.total;

        if (player.lives <= 0) {
            player.vehicle.currentForm = 1;
            player.setForm();
            si.Stop();
            this.resultDiv = document.getElementById("result");
            this.resultDiv.innerHTML = "GAME OVER";
            si.HighScore(this.total);
        }

        var isInvader = false;
        var i = 0;
        for (i = 0; i < theInvaders.invaders.length; i++) {
            if (theInvaders.invaders[i].active) {
                isInvader = true;
                break;
            } else {
                theInvaders.clean(theInvaders.invaders[i]);
            }
        }

        var isBigVader = false;
        if(theBigVaders){
            for (i = 0; i < theBigVaders.bigVaders.length; i++) {
                if (theBigVaders.bigVaders[i].active) {
                    isBigVader = true;
                    break;
                }
            }
        }

        if (!isInvader && !isBigVader) {
            si.Stop();
            //this.resultDiv = document.getElementById("result");
            //this.resultDiv.innerHTML = "YOU WIN";

            this.level++;
            this.velocity = 50 - (this.level * 3);
            player.lives += this.level * 10;
            theInvaders.cleanAll();
            theBullets.cleanAll();
            theBunkers.cleanAll(); 
            this.levelDiv.innerHTML = this.level;
            theInvaders = new si.Invaders(this.level);
            theBunkers = new si.Bunkers();
            si.Start();
        }
    };
};

var game = new si.Game();

si.Start = function () {
    document.activeElement.blur();
    if (game.runnerInterval == undefined) {
        game.runnerInterval = setInterval(function () { game.Runner(); }, 10);
    }
};

si.Stop = function () {
    clearTimeout(game.runnerInterval);
    game.runnerInterval = undefined;
};

document.onkeydown = function (e) {
    player.lastKeyPress = e.keyCode;
};

si.Left = function(){
    player.lastKeyPress = 37;
};

si.Right = function(){
    player.lastKeyPress = 39;
};

si.Fire = function(){
    player.lastKeyPress = 32;
};

//https://stackoverflow.com/questions/9838812/how-can-i-open-a-json-file-in-javascript-without-jquery
si.LoadJSON = function(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
};

si.HighScore = function(score){

    var url = si.Constant.HIGHSCOREEURL;
    if (window.location.protocol == "file:"){
        url = si.Constant.HIGHSCOREEURLTEST;
    }

    if(score && score > 0){
        url += "?score=" + score;
    }
    si.LoadJSON(url,
         function(data) { si.SetHighScore(data, score); },
         function(xhr) { si.SetHighScoreError(xhr); }
    );

    document.getElementById("overlayHighScore").style.display = "block";
};

si.SetHighScore = function(highscore, hsscore){
    if(highscore && highscore.list.length > 0){
        var output = "";
        for (var i = 0; i <  highscore.list.length; i++){
            var score = highscore.list[i];
            output += "<div class='hsrow'>" + "<div class='hsscore hselement'>" +score.score + "</div>" + "<div class='hsname hselement'>" + score.name + "</div>" + "<div class='hscountry  hselement'>" + score.country + "</div>" + "<div class='hstimestamp  hselement'>" + score.timestamp + "</div>" + "</div>" ;
        }
        document.getElementById("highscoreList").innerHTML = output;
    }
    
    if(highscore && highscore.token != null){
       document.getElementById("enterHighscore").style.display = "inline";
       document.getElementById("hsToken").value = highscore.token;
       document.getElementById("hsScore").value = hsscore;
    }
};

si.SetHighScoreError = function(message){
   document.getElementById("highscoreList").innerHTML = "ERROR : no connection with Highscore server.";
   var errormessage = document.getElementById("errormessage");
   errormessage.innerHTML += " " + message;
};

si.HighScoreSend = function(){
    document.getElementById("overlayHighScore").style.display = "none";
    document.getElementById("enterHighscore").style.display = "none";
    var name = document.getElementById("hsInputName").value;
    var country = document.getElementById("hsInputCountry").value;
    var token = document.getElementById("hsToken").value;
    var score = document.getElementById("hsScore").value;

    var request = new XMLHttpRequest();
    var url = "http://js.odusseus.org/si/hs/highscore.php";
    if (window.location.protocol == "file:"){
        url = "http://localhost/hs/highscore.php";
    }
    request.open('POST', url, true);    
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8;');
    var data = "name=" + name + "&score=" + score + "&country=" + country + "&token=" + token ;
    request.send(data);
};

si.HighScoreCancel = function(){
    document.getElementById("overlayHighScore").style.display = "none";
};

si.Info = function(){
    document.getElementById("version").innerHTML = si.Constant.VERSION;
    document.getElementById("overlayInfo").style.display = "block";
};

si.InfoCancel = function(){
    document.getElementById("overlayInfo").style.display = "none";
};

window.onload = si.Load();
