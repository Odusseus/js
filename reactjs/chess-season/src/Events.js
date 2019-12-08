import React, { Component } from 'react';
import Event from './Event.js';
import EventsJson from './EventsJson.js';
import Common from './common.js';

class Events extends Component{
    state = {
        events : []
    }

    constructor () {
        super();
        var sortBy = require('sort-by'),
                         eventsSort = [];
        this.events = [];
        //let eventsList = EventsJson.Events;
        let eventsJson = new EventsJson();
        let eventsList = eventsJson.getList();

        // for(let i = 0; i < EventsJson.Events.length; i++){
        //     let event = new Event(
        //         EventsJson.Events[i].group,
        //         new Date(Common.InverseDateString(EventsJson.Events[i].date)),
        //         EventsJson.Events[i].description,
        //         EventsJson.Events[i].type);
        //     this.events.push(event);
        // }
        for(let i = 0; i < eventsList.length; i++){
            let event = new Event(
                eventsList[i].group,
                new Date(Common.InverseDateString(eventsList[i].date)),
                eventsList[i].description,
                eventsList[i].type);
            this.events.push(event);
        }

        eventsSort = this.events;
        eventsSort.sort(sortBy('date'));
        // Does nothing, the array is a refence and is now al sort. 
        this.events = eventsSort;
        this.setState({events : this.events});
    }
}

export default Events;