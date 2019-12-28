import Common from './common.js';

function maxId() {

  if( typeof maxId.counter == 'undefined' ) {
      maxId.counter = 0;
  }
  maxId.counter++;
  return maxId.counter;
}

class EventDisplay {
  constructor(event) {
    this.id = maxId();
    this.group = event.group;
    this.date = event.date;
    this.description = event.description;
    this.type = event.type;
    let eventDate = new Date(event.date);
    this.day = Common.GetDay(eventDate);
  }
}

export default EventDisplay;