function output(result) {
    var output = document.getElementById("output");
    output.innerHTML = result;
}

function GoPlusEen() {
    var timer = setInterval(ShowPlusEen, 10);
}

var teller = 0;

function ShowPlusEen() {
    teller ++;
    output(teller);
}