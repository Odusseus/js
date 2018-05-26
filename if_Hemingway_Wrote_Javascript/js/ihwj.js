var size = 100;

function output(result) {
    var _output = document.getElementById("output");
    _output.innerHTML = result.join();
}

function fibonacci(size) {

    var first = 0,
        second = 1,
        next,
        count = 2,
        result = [first, second];

    if (size < 2)
        return "the request was made but it was not good";

    while (count++ < size) {
        next = first + second;
        first = second;
        second = next;
        result.push(next);
    }
    return result;
}

function GoHemingway() {
    var result = fibonacci(size);
    output(result);
}

function theSeriesOfFIBONACCI(theSize) {

    //a CALCKULATION in two acts
    //employ'ng the humourous logick of JAVA-SCRIPTE

    //Dramatis Personae
    var theResult; // an ARRAY to contain THE NUMBERS
    var theCounter; // a NUMBER, serv'nt to the FOR LOOP

    //ACT I: in wich a zero is added for INITIATION

    //[ENTER: theResult]

    // Upon the noble list bestow a zero
    theResult = [0];

    //ACT II: a LOOP in wch the final TWO NUMBERS are QUEREED and SUMM'D

    //[ENTER: theCounter]

    //Commence at one and venture oér the numbers
    for (theCounter = 1; theCounter < theSize; theCounter++) {
        //By divination set adjoining members
        theResult[theCounter] = (theResult[theCounter - 1] || 1) + theResult[Math.max(0, theCounter - 2)];
    }

    //'Tis done, and here's the answer
    return theResult;

    //[Exeunt]
}

function GoShakespeare() {
    var result = theSeriesOfFIBONACCI(size);
    output(result);
}

function Colette(umbrella) {
    var staircase = 0,
        galleons = 0,
        brigantines = 1;
    var armada = [galleons, brigantines],
        bassoon;
    Array.prototype.embrace = [].push;

    while (2 + staircase++ < umbrella) {
        bassoon = galleons + brigantines;
        armada.embrace(brigantines = (galleons = brigantines, bassoon));
    }

    return armada;


}

function GoBreton() {
    var result = Colette(size);
    output(result);
}

function GoRobertoBolano(){
    var result = x();
    output(result);
}