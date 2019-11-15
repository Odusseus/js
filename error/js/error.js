var size = 100000000000000000000000;

function output(result) {
    var output = document.getElementById("output");
    output.innerHTML = result;
}

function showDateTime() {
    var now = new Date();
    //now.format("dd/MM/yyyy hh:mm TT");
    output(now);
}

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

function fibonacci(size) {

    var first = 0,
        second = 1,
        next,
        count = 2,
        result = [first, second];

    if (size < 2)
        return "the request was made but it was not good";

    while (count++ <= result.length) {
        wait(1000); 
        next = first + second;
        first = second;
        second = next;
        result.push(next);
    }
    return result;
}

function GoTimer() {
    var timer = setInterval(showDateTime, 1000);
}

function GoError() {
    var result = fibonacci(size);
    clearTimeout(result);
    output(result);
}