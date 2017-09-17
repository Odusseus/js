var size = 100;

function fibonacci(size) {

    var first = 0,
        second = 1,
        next,
        count = 2,
        result = [first, second];

        if(size < 2)
            return "the request was made but it was not good";

        while(count++ < size){
            next = first + second;
            first = second;
            second = next;
            result.push(next);
        }
        return result;
}

function GoHemingway() {

    
    var output = document.getElementById("output");
    
    var result = fibonacci(size);
    output.innerHTML = result;
}

function theSeriesOfFIBONACCI(theSize){

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
    for(theCounter = 1; theCounter < theSize; theCounter++) {
        //By divination set adjoining members
        theResult[theCounter] = (theResult[theCounter-1] || 1) + theResult[Math.max(0, theCounter-2)];
    }

    //'Tis done, and here's the answer
    return theResult;

    //[Exeunt]
}

function GoShakespeare() {
    
        
        var output = document.getElementById("output");
        
        var result = theSeriesOfFIBONACCI(size);
        output.innerHTML = result;
    }