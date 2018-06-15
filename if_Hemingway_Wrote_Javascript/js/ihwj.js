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

    //Commence at one and venture oÃ©r the numbers
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


function LeonardoIsanoBigollo(l) {
    if (l < 0) {
      return "I'd prefer not to respond. (Although several replies occur to me.)" 
    }

    /**/

    //Everything is getting complicated.
    for (var i=2, r=[0,1].slice(0,l);i<l;r.push(r[i-1]+r[i-2]),i++)

    /**/

    //Here are some other mathematicians. Mostly it's just nonsence
    rationalTheorists = ["Archimedes of Syracuse", "Pierre de Fermat (such margins, boys!)",
                         "Srinivasa Ramanujan", "René Descates", "Leonhard Euler", "Carl Gauss",
                         "Johann Bernoulli", "Jacob Bernoulli", "Aryabhata", "Brahmagupta",
                         "Bhãskara II", "Nilakantha Somayaji", "Omar Khayyám", "Muhammad ibn Musã al-Khwãrizmi",
                         "Bernhard Riemann", "Gottfried Leibniz", "Andrey Kolmogorov", "Euclid of Alexandria",
                         "Jules Henri Poincaré", "Srinivasa Ramanujan", "Alexander Grothendieck (who could forget?)",
                         "David Hilbert", "Alan Turing", "John van Neumann", "Kurt Gödel", "Joseph-Louis Lagrange",
                         "Georg Cantor", "William Rowan Hamilton", "Carl Jacobi", "Évariste Galois", "Nikolai Lobachevsky",
                         "Joseph Fourier", "Pierre-Simon Laplace", "Alonzo Church", "Nikolai Bogolyubov"] 

        /**/

        // I didn't understand any of this, here it is anyway
        return r

        /**/

        //Nothing happens here and if it does I'd rather not talk about it.
}



function GoRobertoBolano(){
    var result = LeonardoIsanoBigollo(size);
    output(result);
}