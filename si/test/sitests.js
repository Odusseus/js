QUnit.module("Coordinate");

QUnit.test("x coordinate is set", function () {

    var coordinate = new si.Coordinate(100, 50);

    equal(coordinate.x, 100);

});

QUnit.test("y coordinate is set", function () {

    var coordinate = new si.Coordinate(100, 50);

    equal(coordinate.y, 50);

});

// function (id, width, height, centerX, centerY, fireDirection, numberOfBullets, forms)

QUnit.module("Object");
QUnit.test("Object width is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.width, 10);

});

QUnit.test("Object height is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.height, 20);

});


QUnit.module("Object center");

QUnit.test("Object x is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.center.x, 100);

});

QUnit.test("Object y is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.center.y, 50);

});


QUnit.module("Object up");

QUnit.test("Object leftUp.x is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.leftUp.x, 95);

});

QUnit.test("Object leftUp.y is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.leftUp.y, 40);

});

QUnit.test("Object rightUp.x is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.rightUp.x, 105);

});

QUnit.test("Object rightUp.y is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.rightUp.y, 40);

});


QUnit.module("Object down");
QUnit.test("Object downUp.x is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.leftDown.x, 95);

});

QUnit.test("Object leftDown.y is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.leftDown.y, 60);

});

QUnit.test("Object rightDown.x is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.rightDown.x, 105);

});

QUnit.test("Object rightDown.y is set", function () {

    var object = new si.Vehicle(0, 10, 20, 100, 50, 0, 0, "X");

    equal(object.rightDown.y, 60);

});

QUnit.module("Sequence");
QUnit.test("first sequence is 0", function () {

    var sequence = new si.Sequence();

    var first = sequence.next(); 

    equal(first, 0);

});

QUnit.test("seconde sequence is 1", function () {

    var sequence = new si.Sequence();

    var first = sequence.next();
    first = sequence.next();

    equal(first, 1);

});
