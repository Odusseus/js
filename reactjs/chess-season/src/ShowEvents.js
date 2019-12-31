/*jshint esversion: 6 */
import React, { Component } from 'react';
import Moment from 'react-moment';
import EventDisplay from './EventDisplay';

import styles from './css/cs.module.css'
class ShowEvents extends Component {

    constructor(props) {
      super(props);

      this.state = {
        events: [],
        source: "",
        eventName: ""
      }

      this.onDismiss = this.onDismiss.bind(this);
      this.onChangeName = this.onChangeName.bind(this);
    }

    onDismiss(id){
      const isNotId = event => event.objectId !== id;
      const updatedEvents = this.state.events.filter(isNotId);
      this.setState({events: updatedEvents} );
    }

    onChangeName(event){
      this.setState({eventName: event.target.value});
    }

    componentDidMount() {
      let site = window.location.href;
      let urlBase = "https://www.odusseus.org/php/item";
      let key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
      let token = "DFAC7440-1A78-4612-AECD-E896759CD66D";
      if (true && site.includes("localhost")){
        urlBase = "http://localhost:9000";
        key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
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
            if(new Date(element.date) >= today){
              let eventDisplay = new EventDisplay(element);
              newEvents.push(eventDisplay);
            }            
          });
            newEvents.sort(
              (a, b) => 
              ( 
                new Date(a.date) - new Date(b.date)
                ));

            this.setState({ events: newEvents });
      })
      .catch(console.log)

    } 
  render() {
    let groupName = null;
    let groupNameDisplay = null;
    return (
      <>
        <div>Events v1.1.4 from {this.state.source}</div>
        <div>
          <form>
            <input 
              type="text"
              onChange={this.onChangeName}
              />
            </form>
        </div>
        <div>
            {
              this.state.events.map(
                event => {                  
                  if(groupName !== event.group){
                    groupName = event.group;
                    groupNameDisplay = `For ${event.group}`;
                  }
                  else
                  {
                    groupNameDisplay = '';
                  }

                  return (
                   <div className={styles.event} key={event.objectId}>
                    <div className={styles.group}>
                      {groupNameDisplay}
                    </div>
                    <div className={styles.id}>
                      {event.objectId}
                    </div>
                    <div className={styles.day}>
                      {event.day}
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
                    <div>
                      <button onClick={ () => this.onDismiss(event.objectId) }>Dismiss</button>

                    </div>
                  </div>
                  );
                }
              )
            }
        </div>
      </>
    );
  }
}

export default ShowEvents;