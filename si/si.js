// Author Pascal Boittin
// 25-10-2014
// chessmachine@odusseus.org
/*jshint esversion: 6 */
// TODO regroup invaders
// High score

var si = si || {};

si.Constant = {
    LEFTBOARD : 20,
    RIGHTBOARD : 320,
    TOPBOARD : 30,
    FLOORBOARD : 350,
    VERSION : "1.0.12",
    DEFAULTTYPE : 0,
    DEFENDER : 1,
    INVADERTYPE : 2,
    TYPENOBULLET : 0,
    TYPEBULLET1 : 1,
    TYPEBULLET2 : 2,
    TYPEBULLET3 : 3,
    AUDIOSHOT1 : 'audioShot1',
    AUDIOSHOT2 : 'audioShot2',
    AUDIOSHOT3 : 'audioShot3',
    AUDIOCRASH1 : 'audioCrash1',
    AUDIOCRASH2 : 'audioCrash2',
    AUDIOCRASH3 : 'audioCrash3',
};

si.CreateAudioElement = function(audioFile, id){
    var audio = document.createElement("AUDIO");
    audio.src = audioFile;
    audio.setAttribute("id", id);
    document.body.appendChild(audio);
};

si.Load = function() {
    this.infoDiv = document.getElementById("version");
    this.infoDiv.innerHTML = si.Constant.VERSION;

    si.CreateAudioElement("sound/shot/215438__taira-komori__shoot02.mp3", si.Constant.AUDIOSHOT1);
    si.CreateAudioElement("sound/shot/28912__junggle__btn102.wav", si.Constant.AUDIOSHOT2);
    si.CreateAudioElement("sound/shot/221441__jalastram__shoot014.mp3", si.Constant.AUDIOSHOT3);

    si.CreateAudioElement("sound/crash/12831__schluppipuppie__crash-03.wav", si.Constant.AUDIOCRASH1);
    si.CreateAudioElement("sound/crash/369711__mrguff__hit-impact.wav", si.Constant.AUDIOCRASH2);
    si.CreateAudioElement("sound/crash/12734__leady__dropping-a-gun.wav", si.Constant.AUDIOCRASH3);
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
        //var text = this.text + " !!!";
        //this.messages.push(text);
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
        div.style.left = vehicle.leftUp.x + "px";
        div.style.top = vehicle.leftUp.y + "px";
        div.innerHTML = vehicle.forms[vehicle.currentForm];
    };

    this.removeDiv = function (id) {
        var div = document.getElementById(id);
        document.body.removeChild( div );
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
    this.fireSound = si.Constant.AUDIOSHOT1;
    this.collisionSound = si.Constant.AUDIOCRASH1;

    // var sound = document.getElementById( newBullet.fireSound);
    //         sound.play();

    if(typeOfBullets == si.Constant.TYPEBULLET1){
       this.forms[0] = "";
       this.forms[1] = "+.+<br>+.+";
       this.forms[2] = "+";
       this.damage = -10;
       this.width = 20;
       this.fireSound = si.Constant.AUDIOSHOT1;
       this.collisionSound = si.Constant.AUDIOCRASH1;
       }

    if(typeOfBullets == si.Constant.TYPEBULLET2){
        this.forms[0] = "";
        this.forms[1] = "*.*<br>*.*";
        this.forms[2] = "*";
        this.damage = -5;
        this.width = 20;
        this.fireSound = si.Constant.AUDIOSHOT2;
        this.collisionSound = si.Constant.AUDIOCRASH2;
    }
    
    if(typeOfBullets == si.Constant.TYPEBULLET3){
        this.forms[0] = "";
        this.forms[1] = "@..@<br>$..$";
        this.forms[2] = "#$$#<br>$##$";
        this.damage = -20;
        this.width = 40;
        this.fireSound = si.Constant.AUDIOSHOT3;
        this.collisionSound = si.Constant.AUDIOCRASH3;
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
                this.vehicle.currentForm = 0;
                this.setForm();
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
                            var sound = document.getElementById( this.collisionSound);
                            sound.play();
                        }
                        return;
                    }
                 }
                }
        }
        
    if(noCollision){
        if (
            (this.vehicle.center.x >= player.vehicle.leftUp.x && this.vehicle.center.x <= player.vehicle.rightUp.x) &&
            (this.vehicle.center.y >= player.vehicle.leftUp.y && this.vehicle.center.y <= player.vehicle.leftDown.y)
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
                var sound = document.getElementById( this.collisionSound);
                sound.play();
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
                            document.getElementById( this.collisionSound).play();
                        }
                        invader.active = false;
                        invader.vehicle.currentForm = 1;
                        invader.setForm();
                        invader.move = false;
                        game.total -= this.damage;
                        var messageText = new si.MessageText(invader.getHitMessage(), "-","|", "*","+").FormatMessageSimple(); //.FormatMessageOnOff();
                        theMessages.new(invader.vehicle, messageText);
                        return;
                    }
                }
            }
        }

        if (noCollision) {
            if(theBigVaders){
                theBigVaders.bigVaders.forEach(bigVader => {
                    if (bigVader.active) {
                        if (((this.vehicle.leftUp.x >= bigVader.vehicle.leftDown.x && this.vehicle.leftUp.x <= bigVader.vehicle.rightDown.x) ||
                            (this.vehicle.rightUp.x <= bigVader.vehicle.rightDown.x && this.vehicle.rightUp.x >= bigVader.vehicle.leftDown.x)
                            ) && (this.vehicle.leftUp.y <= bigVader.vehicle.leftDown.y && this.vehicle.leftUp.y >= bigVader.vehicle.leftUp.y)
                           )   {
                            this.active = false;
                            this.move = false;
                            this.vehicle.currentForm = 1;
                            this.setForm();
                            if(si.isSound()){
                                document.getElementById( this.collisionSound).play();
                            }
                            bigVader.setLives(this.damage);
                            bigVader.setForm();
                            game.total += - this.damage;
                            var messageText = new si.MessageText(bigVader.getHitMessage(), "-","|", "*","+").FormatMessageSimple(); //.FormatMessageOnOff();
                            theMessages.new(bigVader.vehicle, messageText);
                            return;
                        }
                    }
                });
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
        for (var i = 0, x = vehicle.center.x, y = vehicle.center.y + (vehicle.fireDirection * vehicle.height), width = 2, height = 2; i < vehicle.numberOfBullets; i++) {
        
            var newBullet = new si.Bullet(sequence.next(), width, height, x, y, vehicle.fireDirection, vehicle.typeOfBullets);
            this.bullets.push(newBullet);
            page.createDiv(newBullet.vehicle);

            y = y + (vehicle.fireDirection * (3 + i) * height);

            if(si.isSound()){
                var sound = document.getElementById( newBullet.fireSound);
                sound.play();
            }
        }
    };

    this.move = function () {

        for (var ii = 0; ii < this.bullets.length; ii++) {

            if (this.bullets[ii].active == true) {
                this.bullets[ii].moveUp();
                page.setDiv(this.bullets[ii].vehicle);
                this.bullets[ii].checkCollision();
            } else if(this.bullets[ii].explosionState > 0){
                this.bullets[ii].explosionState--;
                if(this.bullets[ii].explosionState == 0){
                    this.bullets[ii].vehicle.currentForm = 0;
                }
                page.setDiv(this.bullets[ii].vehicle);
            }
        }

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
        this.messages.forEach(element => {
            if(!element.cleanDiv()){
                newMessages.push(element);
            }
        });
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
    }

    this.fire = function () {

        //var fireTime = Math.floor(Math.random() * 2) + 1;
        if (game.run % 3 == 0) {
            theBullets.fire(this.vehicle);
        } else {
            if(game.run % 5 == 0){
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

si.Invader = function (id, width, height, x, y, lives, forms ) {
    this.vehicle = new si.Vehicle(id, width, height, x, y, 1, 1, forms, si.Constant.TYPEBULLET2);
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

si.Invaders = function() {
    this.invaders = [];
    this.forms = [];

    this.forms[0] = "";
    this.forms[1] = "+ * + * <br> +*+ <br> + * + *";
    this.forms[2] = "{x}";
    this.forms[3] = "{XX}";
    
    for (var i = 0, x = page.leftBoard, y = page.topBoard, width = 20, height = 7; i < 4; i++, x = page.leftBoard) {
        for (var j = 0; j < height; j++) {
            var newInvader = new si.Invader(sequence.next(), width, height, x, y, 10, this.forms);
            this.invaders.push(newInvader);
            page.createDiv(newInvader.vehicle);
                 
            x = x + (2 * width);
            //break;
        }
        //break;
        y = y + (2 * height);
    }

    this.move = function () {

        var switchdirection = false;
        var stopMove = false;

        for (var i = 0; i < this.invaders.length; i++) {

            if (this.invaders[i].active == true) {
                this.invaders[i].fire();
                switchdirection = this.invaders[i].moveLeftAndRight() || switchdirection;
                page.setDiv(this.invaders[i].vehicle);
            } else if (this.invaders[i].explosionState > 0) {
                    this.invaders[i].explosionState--;
                    if(this.invaders[i].explosionState == 0){
                        this.invaders[i].vehicle.currentForm = 0;
                    }
                    page.setDiv(this.invaders[i].vehicle);
                }
        }
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

theInvaders = new si.Invaders();

//*****************************************
si.BigVader = function (id, width, height, x, y, lives, forms ) {
    this.vehicle = new si.Vehicle(id, width, height, x, y, 1, 1, forms, si.Constant.TYPEBULLET3);
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

    this.forms[0] = "";
    this.forms[1] = "+ * + * <br> +*+ <br> + * + *";
    this.forms[2] = "{+==0=0==+}";
    this.forms[3] = "-X==o=o==X-";
    this.width = 55;
    this.height = 7;
    this.x = si.Constant.RIGHTBOARD - (this.width / 2);
    this.y = si.Constant.TOPBOARD;
    this.lives = 500;

    this.new = function(){
        this.clean();
        if(this.bigVaders.length == 0){
            this.lives = 500;
            var newBigVader = new si.BigVader(sequence.next(), this.width, this.height, this.x, this.y, this.lives, this.forms);
            this.bigVaders.push(newBigVader);
            page.createDiv(newBigVader.vehicle);
        }
        return this;
    };

    this.clean = function(){
        if(this.bigVaders.length == 0){
            return;
        }

        var newBigVaders = [];
        this.bigVaders.forEach(element => {
            if(element.active){
                newBigVaders.push(element);
            } else {
                page.removeDiv(element.vehicle.id);
            }
        });
        this.bigVaders = newBigVaders;
    };

    this.move = function () {

        var switchdirection = false;
        var stopMove = false;

        for (var i = 0; i < this.bigVaders.length; i++) {

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
                        //stopMove = this.invaders[j].moveDown() || stopMove;
                    }
                }
                switchdirection = false;
            }

            if (stopMove) {
                bigVaders.forEach(element => {
                    if (element.active == true) {
                        element.move = false;
                    }
                });
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

    this.bunkers.forEach(element => {
        page.createDiv(element.vehicle);
    });
    
};

theBunkers = new si.Bunkers();


si.Game = function () {
    this.runnerInterval = undefined;
    this.velocity = 50;

    this.run = 0;
    

    this.total = 0;
    this.totalDiv = document.getElementById("total");

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
                theBigVaders = new si.BigVaders().new();
            } else {
                theBigVaders.new();
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
        //this.infoDiv = document.getElementById("info");
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
        }

        var isInvader = false;
        var i = 0;
        for (i = 0; i < theInvaders.invaders.length; i++) {
            if (theInvaders.invaders[i].active) {
                isInvader = true;
                break;
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
            this.resultDiv = document.getElementById("result");
            this.resultDiv.innerHTML = "YOU WIN";
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