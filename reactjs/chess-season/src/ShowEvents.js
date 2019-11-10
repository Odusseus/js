/*jshint esversion: 6 */
import React, { Component } from 'react';
import Moment from 'react-moment';

import Events from './Events';
import styles from './css/cs.module.css'
class ShowEvents extends Component {

  render() {
    var events = new Events().events;
    let groupName = null;
    let groupNameDisplay = null;
    let newLineDisplay = '';
    return (
      <>
        <div>Events</div>
        <div>
            {
              events.map(
                function (event, index) {                  
                  if(groupName != event.group){
                    groupName = event.group;
                    groupNameDisplay = `For ${event.group}`;
                  }
                  else
                  {
                    groupNameDisplay = '';
                  }

                  return <div className={styles.event} key={index}>
                    <div className={styles.group}>
                      {groupNameDisplay}
                    </div>
                    <div className={styles.date}>
                    {
                        <Moment format='DD-MM-YYYY'>
                          {event.date}
                        </Moment>
                    }
                    </div>
                    <div className={styles.description}>
                      {event.description}
                    </div>
                    <div className={styles.type}>
                      {event.type}
                    </div>
                  </div>;

                }
              )
            }
        </div>
      </>
    );
  }
}

export default ShowEvents;