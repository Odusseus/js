import Event from './Event.js';

class Events {
    constructor () {
        this.events = [];

        let event = new Event(new Date('2019-01-01'), 'Ger', 'Training');
        this.events.push(event);
        
        event = new Event(new Date('2019-01-05'), 'John', 'Training');
        this.events.push(event);

        event = new Event(new Date('2019-01-10'), 'Timman', 'Training');
        this.events.push(event);
    }
}

export default Events;