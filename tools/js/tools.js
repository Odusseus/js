function output(result) {
    var output = document.getElementById("output");
    output.innerHTML = result;
}

Date.prototype.ddmmyyyy = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    var dateFormated =
           [(dd>9 ? '' : '0') + dd,
            (mm>9 ? '' : '0') + mm,
            this.getFullYear(),
           ].join('-');

    var days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    var dayName = days[this.getDay()];

    return dayName + " " + dateFormated;
  };

function GoListOfDays(startDateName, endDateName, onlyDayId, endTextName) {
    var startDateText = document.getElementsByName(startDateName)[0].value;
    var endDateText = document.getElementsByName(endDateName)[0].value;
    var onlyDayIdSelected = document.getElementById(onlyDayId);
    var onlyDayIdText = onlyDayIdSelected.options[onlyDayIdSelected.selectedIndex].value;
    var onlyDay = Number(onlyDayIdText);
    var endTextText = document.getElementsByName(endTextName)[0].value;

    if(startDateText == "" || endDateText == ""){
        output("Please select a date.");
        return;
    }

    if(startDateText == ""){
        output("Please select a start date.");
        return;
    }

    if(endDateText == ""){
        output("Please select a end date.");
        return;
    }

    var startDate = new Date(startDateText);
    var endDate = new Date(endDateText);


    var listOfDays = "";

    var currentDate = startDate;

    var oldMonth = startDate.getMonth();

    while(currentDate <= endDate){
        if(currentDate.getDay() == onlyDay){
            var currentMonth = currentDate.getMonth();
            if(currentMonth != oldMonth){
                listOfDays += "<br>";
                oldMonth = currentMonth;
            }
            listOfDays += "<li>" + currentDate.ddmmyyyy() + " " +endTextText +"</li>";
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    listOfDays = "<ol style='list-style-type:none'>" + listOfDays + "</ol>";

    output(listOfDays);
}