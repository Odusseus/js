/*jshint esversion: 6 */
import React, { Component } from 'react';
import Moment from 'react-moment';

import styles from './css/cs.module.css'
class ShowEvents extends Component {

    state = {
      events : [],
      source: ""
    }

    componentDidMount() {
      let site = window.location.href;
      let urlBase = "https://www.odusseus.org/php/item";
      let key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
      let token = "DFAC7440-1A78-4612-AECD-E896759CD66D";
      if (true && site.includes("localhost")){
        urlBase = "http://localhost:9000";
        key = "D51981B6-32B0-4678-95DC-AB1D922C52DC";
        token = "591FFE3A-7EF6-4F16-BCB4-880555820D6C";
      }
      let url = urlBase + "/getitem.php?key=" + key + "&token=" + token;
      this.setState({ source: urlBase });
      fetch(url)
      .then(res => res.json())
      .then((data) => {
          let values = JSON.parse(data.value);
          let newEvents = [];
          let today = new Date();
          today.setHours(0,0,0,0);
          values.forEach(element => {
            if(Date.parse(element.date) >= today){
              newEvents.push(element);
            }            
          });
            this.setState({ events: newEvents });
      })
      .catch(console.log)

    } 
  render() {
    let groupName = null;
    let groupNameDisplay = null;
    let newLineDisplay = '';
    return (
      <>
        <div>Events v1.1.3 from {this.state.source}</div>
        <div>
            {
              this.state.events.map(
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