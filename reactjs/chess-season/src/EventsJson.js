 const EventsJsonMock = {
  'Events':[
    {'group' : '2019-2020', 'date' : '17-01-2020', 'description' : 'Hot-Spirit', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '07-11-2019', 'description' : 'John', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '20-11-2019', 'description' : 'MEC Jan Timman', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '23-11-2019', 'description' : 'Lekstroom 2 - OZU', 'type' : 'Wedstrijd' }, 
    {'group' : '2019-2020', 'date' : '02-12-2019', 'description' : 'Ger', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '12-12-2019', 'description' : 'John', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '25-01-2020', 'description' : 'Wijk aan zee', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '04-11-2019', 'description' : 'Ger', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '14-12-2019', 'description' : 'OZU-Almere 4', 'type' : 'Wedstrijd' },
    {'group' : '2019-2020', 'date' : '20-12-2019', 'description' : 'Hot-Spirit', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '25-12-2019', 'description' : '2512 toernooi', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '21-02-2020', 'description' : 'Hot-Spirit', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '23-01-2020', 'description' : 'John', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '07-03-2020', 'description' : 'OZU-ASV 6', 'type' : 'Wedstrijd' },
    {'group' : '2019-2020', 'date' : '02-03-2020', 'description' : 'Ger', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '28-03-2020', 'description' : 'Magnus 2 - OZU', 'type' : 'Wedstrijd' },
    {'group' : '2019-2020', 'date' : '16-04-2020', 'description' : 'John', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '15-11-2019', 'description' : 'Hot-Spirit', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '24-01-2020', 'description' : 'Wijk aan zee', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '01-02-2020', 'description' : 'En Passant 3 - OZU', 'type' : 'Wedstrijd' },
    {'group' : '2019-2020', 'date' : '03-02-2020', 'description' : 'Ger', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '20-02-2020', 'description' : 'John', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '20-03-2020', 'description' : 'Hot-Spirit', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '06-04-2020', 'description' : 'Ger', 'type' : 'Training' },
    {'group' : '2019-2020', 'date' : '17-04-2020', 'description' : 'Hot-Spirit', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '18-04-2020', 'description' : 'OZU-Wageningen 4', 'type' : 'Wedstrijd' },
    {'group' : '2019-2020', 'date' : '15-05-2020', 'description' : 'Hot-Spirit', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '05-06-2020', 'description' : 'OKU', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '06-06-2020', 'description' : 'OKU', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '07-06-2020', 'description' : 'OKU', 'type' : 'Toernooi' },
    {'group' : '2019-2020', 'date' : '19-06-2020', 'description' : 'Hot-Spirit', 'type' : 'Toernooi' }
  ]  
}

class EventsJson{
  constructor(){

  }

  getList(){
    const userAction = async () => {
      const response = await fetch('http://localhost:9000/getitem.php?key=4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09&token=B038D9EB-3ABB-4E9D-B19C-FB973451C7D0');
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      return myJson.Events;
    }
    
    return EventsJsonMock.Events;
  }
}


export default EventsJson;

