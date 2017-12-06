// Author Pascal Boittin
// 25-10-2014
// chessmachine@odusseus.org

var si = si || {};

si.Constant = {
    LEFTBOARD : 20,
    RIGHTBOARD : 320,
    TOPBOARD : 30,
    FLOORBOARD : 350,
    VERSION : "1.0.6",
    DEFAULTTYPE : 0,
    DEFENDER : 1,
    INVADERTYPE : 2
};

si.Load = function() {
    this.infoDiv = document.getElementById("version");
    this.infoDiv.innerHTML = si.Constant.VERSION;
};

// (function() {
//     var lastTouch = 0;
//     function preventZoom(e) {
//         var t2 = e.timeStamp;
//         var t1 = lastTouch || t2;
//         var dt = t2 - t1;
//         var fingers = e.touches.length;
//         lastTouch = t2;

//         if (!dt || dt >= 300 || fingers > 1) {
//             return;
//         }
//         resetPreventZoom();
//         e.preventDefault();
//         e.target.click();
//     }
//     function resetPreventZoom() {
//         lastTouch = 0;
//     }

//     document.addEventListener('touchstart', preventZoom, false);
//     document.addEventListener('touchmove', resetPreventZoom, false);
// })();

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
            var topBottom = Array(text.length).join(top);
            var newText = topBottom + "<br>" + side + " " + text + " " + side + "<br>" + topBottom;
            this.messages.push(newText);
        }
    };

    this.FormatMessageOnOff = function(){
        this.FormatMessage(this.topOn, this.sideOn);
        this.FormatMessage(this.topOff, this.sideOff);
        return this;
    };
}

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

si.Vehicle = function (id, width, height, centerX, centerY, fireDirection, numberOfBullets, forms) {

    this.id = id;
    this.width = width;
    this.fireDirection = fireDirection;
    this.numberOfBullets = numberOfBullets;
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


    //this.leftUp = new si.Coordinate(this.getCoordinateXLeftUp(this.width, this.center.x), this.getCoordinateYLeftUp(this.height, this.center.y));
    //this.rightUp = new si.Coordinate(this.getCoordinateXRightUp(this.width, this.center.x), this.getCoordinateYRightUp(this.height, this.center.y));

    //this.leftDown = new si.Coordinate(this.getCoordinateXLeftDown(this.width, this.center.x), this.getCoordinateYLeftDown(this.height, this.center.y));
    //this.rightDown = new si.Coordinate(this.getCoordinateXRightDown(this.width, this.center.x), this.getCoordinateYRightDown(this.height, this.center.y));

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

    this.setForm = function (vehicle) {
        var div = document.getElementById(vehicle.id);
        div.innerHTML = vehicle.forms[vehicle.currentForm];
    };
};

page = new si.Page();

si.Bullet = function (id, width, height, x, y, fireDirection) {
    this.forms = [];
    this.forms[0] = "";
    this.forms[1] = "*.*<br>*.*";
    this.forms[2] = "*";
    
    if(fireDirection < 0) {
       this.forms[0] = "";
       this.forms[1] = "+.+<br>+.+";
       this.forms[2] = "+";
       }
    this.vehicle = new si.Vehicle(id, width, height, x, y, fireDirection, undefined, this.forms);
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

    this.checkCollision = function () {

        var noCollision = true;

       
        if (((this.vehicle.leftDown.x >= player.vehicle.leftUp.x && this.vehicle.leftDown.x <= player.vehicle.rightUp.x) ||
             (this.vehicle.rightDown.x <= player.vehicle.rightUp.x && this.vehicle.rightDown.x >= player.vehicle.leftUp.x)
             ) &&
             (this.vehicle.leftDown.y >= player.vehicle.leftUp.y && this.vehicle.leftDown.y <= player.vehicle.leftDown.y)
            )
        {
            noCollision = false;
            player.lives -= 10;

            this.active = false;
            this.move = false;
            this.vehicle.currentForm = 1;
            this.setForm();

        }

        if (noCollision) {
            
            for (var i = 0; i < theInvaders.invaders.length; i++) {

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
                        invader.active = false;
                        invader.vehicle.currentForm = 1;
                        invader.setForm();
                        invader.move = false;
                        game.total += invader.lives;
                        break;
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
    this.numberOfBullets = 0;
    this.bullets = [];

    this.fire = function(vehicle) {
        for (var i = 0, x = vehicle.center.x, y = vehicle.center.y + (vehicle.fireDirection * vehicle.height), width = 2, height = 2; i < vehicle.numberOfBullets; i++, this.numberOfBullets++) {
            this.bullets[this.numberOfBullets] = new si.Bullet(sequence.next(), width, height, x, y, vehicle.fireDirection, this.forms);
            page.createDiv(this.bullets[this.numberOfBullets].vehicle);

            y = y + (vehicle.fireDirection * (3 + i) * height);
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
    this.state = 60;

    this.createDiv = function () {
        var div = document.createElement("div");
        div.style.position = 'absolute';
        div.style.textAlign = "center";
        div.id = this.id;
        div.style.left = x + 10 + "px";
        div.style.top = y + "px";
        div.innerHTML = message.messages[message.current];
        document.body.appendChild(div);
    };

    this.cleanDiv = function(){
        if(this.state > 0){
            this.state--;
            if( this.state % 20 == 0){

                var div = document.getElementById(this.id);
                message.current++;
                if(message.current == message.messages.length){
                    message.current = 0;
                }
                div.innerHTML = message.messages[message.current];
            }
            return false;
        } else {
            var div = document.getElementById(this.id);
            document.body.removeChild( div );
            return true;
        }
    };
};

si.Messages = function () {
    this.numberOfMessages = 0;
    this.messages = [];

    this.new = function(vehicle, message) {
        this.messages[this.numberOfMessages] = new si.Message(sequence.next(), vehicle.center.x, vehicle.center.y, message);
        this.messages[this.numberOfMessages].createDiv();
        this.numberOfMessages++;
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

    // this.cleanDiv = function(){
    //     this.messages.forEach(element => {
    //         if(element.state >= 0){
    //             element.cleanDiv();
    //         }
    //     });
        
    // };
};

theMessages = new si.Messages();

si.Player = function (id, width, height, x, y, forms) {

    this.active = true;
    this.explosionState = 3;
    this.lives = 100;
    this.vehicle = new si.Vehicle(id, width, height, x, y, -1, 2, forms);
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
                    invader.setForm();
                    game.total += invader.lives;
                }
            }
        }
    };

    this.fire = function () {

        //var fireTime = Math.floor(Math.random() * 2) + 1;
        if (game.run % 3 == 0) {
            theBullets.fire(this.vehicle);
        } else {
            var message = new si.MessageText("Gun to warm!", "-","|", "*","+").FormatMessageOnOff();
            theMessages.new(player.vehicle, message);
        }
    };

    this.setForm = function () {        
        page.setForm(this.vehicle);
    };
};

var playerForms = [];

playerForms[0] = "";
playerForms[1] = "X * X<br>x x<br>+<br>x x<br>X * X";
playerForms[2] = "/ \\<br>[..]";
playerForms[3] = "/ \\<br>[**]";


var player = new si.Player(sequence.next(), 20, 20, Math.ceil(page.rightBoard / 2), page.floorBoard, playerForms);



si.Invader = function (id, width, height, x, y, lives, forms ) {

    //this.id = id;
    //this.centerName = "center" + this.id.toString();
    this.vehicle = new si.Vehicle(id, width, height, x, y, 1, 1, forms);
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

            if (y > page.floorBoard) {
                return true;
            }

            this.checkCollision();
            return false;
        }
    };

    this.setForm = function() {        
        page.setForm(this.vehicle);
    };

    this.checkCollision = function () {

        if (((this.vehicle.leftDown.x >= player.vehicle.leftUp.x && this.vehicle.leftDown.x <= player.vehicle.rightUp.x) ||
                        (this.vehicle.rightDown.x <= player.vehicle.rightUp.x && this.vehicle.rightDown.x >= player.vehicle.leftUp.x)
                    ) && (this.vehicle.leftDown.y >= player.vehicle.leftUp.y && this.vehicle.leftDown.y <= player.vehicle.leftDown.y)
                ) {
                    player.active = false;
                    player.lives -= 10;
                }
    };

    this.fire = function () {

        var fireTime = Math.floor(Math.random() * 10) + 1;
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
};

si.Invaders = function() {

    this.numberOfInvaders = 0;
    this.invaders = [];
    this.forms = [];

    this.forms[0] = "";
    this.forms[1] = "+ * + * <br> +*+ <br> + * + *";
    this.forms[2] = "{x}";
    this.forms[3] = "{XX}";
    
    for (var i = 0, x = page.leftBoard, y = page.topBoard, width = 20, height = 7; i < 4; i++, x = page.leftBoard) {
        for (var j = 0; j < height; j++, this.numberOfInvaders++) {
            this.invaders[this.numberOfInvaders] = new si.Invader(sequence.next(), width, height, x, y, 10, this.forms);
            page.createDiv(this.invaders[this.numberOfInvaders].vehicle);
                 
            x = x + (2 * width);
            //break;
        }
        //break;
        y = y + (2 * height);
    }

    // this.invaders[0] = new si.Invader(sequence.next(), 20, 10, 0, 0, 10, this.forms);
    // page.createDiv(this.invaders[this.numberOfInvaders].vehicle);
    // this.invaders[1] = new si.Invader(sequence.next(), 20, 10, 50, 0, 10, this.forms);
    // page.createDiv(this.invaders[this.numberOfInvaders].vehicle);
                 


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
        player.move();

        if (this.velocity > 5 && this.run % 100 == 0)
        {
            this.velocity -= 1;
        }

        if (this.run % this.velocity == 0) {
            theInvaders.move();
        }
         
        if (this.run % 7 == 0) {
            theBullets.move();
        }

        theMessages.cleanDiv();

        this.run++;

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
        for (var i = 0; i < theInvaders.invaders.length; i++) {
            if (theInvaders.invaders[i].active) {
                isInvader = true;
                break;
            }
        }

        // for (i = 0; i < theInvaders.invaders.length; i++) {
        //     if (theInvaders.invaders[i].active == false &&
        //         theInvaders.invaders[i].vehicle.currentForm == 0) {
        //         theInvaders.invaders[i].vehicle.currentForm = 1;
        //         theInvaders.invaders[i].setForm();
        //     }
        // }

        if (isInvader == false) {
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

