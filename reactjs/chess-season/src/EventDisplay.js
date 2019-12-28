import Common from './common.js';

class EventDisplay {
  constructor(event) {
    this.group = event.group;
    this.date = event.date;
    this.description = event.description;
    this.type = event.type;
    let eventDate = new Date(event.date);
    this.day = Common.GetDay(eventDate);
  }
}

export default EventDisplay;