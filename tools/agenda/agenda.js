
var ag = ag || {};


ag.SetCookie = function(id){
   var key = document.getElementById(id).value;
   localStorage.setItem('key', key);
}

ag.GetCookie = function(id){
    const key = localStorage.getItem('key')
    document.getElementById(id).value = key;
 }

ag.Event = function(date, event, description, url){
    this.date = date;
    this.dateSeconde = Math.round(date.getTime() / 1000);
    this.event = event;
    this.description = description;
    this.url = url;
}

ag.Events = function(event){
    this.list = []
}

ag.output = function(result) {
    var output = document.getElementById("output");
    output.innerHTML = result;
}

ag.ShowList = function (isAll) {

    var key = document.getElementById("keyField").value;
    var decryptedText = sjcl.decrypt(key,agendaList);

    //var agendas = JSON.parse(JSON.stringify(agendaList));
    var agendas = JSON.parse(decryptedText);
    var events = new ag.Events();

    var todayNow = new Date();
    var today = new Date(todayNow.getFullYear(),todayNow.getMonth(),todayNow.getDate());

    for (const [key, value] of Object.entries(agendas.agenda)) {
        //console.log(value.date)
        var eventDate = new Date(value.date);
        if (value.isEveryYear){
            eventDate.setFullYear(new Date().getFullYear());
        }

        if (eventDate >= today && (isAll || !value.isEveryYear)){
            var newEvent = new ag.Event(eventDate, value.event, value.description, value.url)
            var x = newEvent.date.ddmmyyyy();
            events.list.push(newEvent);
            }
    }

    events.list.sort((a,b)=>{
        return a.dateSeconde - b.dateSeconde;
    })

    var dayList = "<ul>";
    var month = undefined;
    var monthOld = undefined;
    for (const [key, value] of Object.entries(events.list)) {
        month = value.date.getMonth();
        if(monthOld == undefined){
            monthOld = month;
        }
        if(month != monthOld){
            monthOld = month;
            dayList += '<br/>';
        }
        var dateString = value.date.ddmmyyyy();
        dayList += '<li>';
        dayList += dateString+' '+value.event;
        if(value.description){
            dayList += ' '+value.description;
        }
        if(value.url){
            dayList += ' <a href="'+value.url+'" target="_blank">'+value.url;
            dayList += '</a>';
        }
        dayList += '</li>';
    }
    dayList += '<ul>' ;

    output(dayList);
}

ag.ShowDefault = function(){
    ag.GetCookie('keyField');
    ag.ShowList();
}

document.onload = ag.ShowDefault();
