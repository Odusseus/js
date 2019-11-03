/*jshint esversion: 6 */
import React, { Component } from 'react';
import Moment from 'react-moment';

import Events from './Events';
class ShowEvents extends Component {

  render() {
    var events = new Events().events;
    return (
      <>
        <div>Hello</div>
        <div>
          <ul>
            {
              events.map(
                function (events, index) {
                  return <li key={index}>
                    {
                      <Moment format='DD-MM-YYYY'>
                        {events.date}
                      </Moment>
                    } {events.description} {events.type}
                    </li>;
                }
              )
            }
          </ul>
        </div>
      </>
    );
  }
}

export default ShowEvents;