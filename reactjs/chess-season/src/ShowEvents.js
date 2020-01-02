/*jshint esversion: 6 */
import React, { Component } from 'react';
import Moment from 'react-moment';
import EventDisplay from './EventDisplay';
import Event from './Event';
import PostEvent from './PostEvent';
import styles from './css/cs.module.css';

class ShowEvents extends Component {

    constructor(props) {
      super(props);

      this.state = {
        events: [],
        source: "",
        newGroup: "",
        newDate: "",
        newDescription: "",
        newType: ""      }

      this.onDelete = this.onDelete.bind(this);
      this.onChangeGroup = this.onChangeGroup.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeType = this.onChangeType.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.onSave = this.onSave.bind(this);
    }

    onDelete(id){
      const isNotId = event => event.objectId !== id;
      const updatedEvents = this.state.events.filter(isNotId);
      this.setState({events: updatedEvents} );
    }

    onChangeGroup(event){
      this.setState({newGroup: event.target.value});
    }

    onChangeDate(event){
      this.setState({newDate: event.target.value});
    }

    onChangeDescription(event){
      this.setState({newDescription: event.target.value});
    }

    onChangeType(event){
      this.setState({newType: event.target.value});
    }

    onAdd(){
      let newDate  = new Date();
      if( this.state.newDate !== '') {
        const parts = this.state.newDate.split('-');
        if(parts.length === 3){
          // save as UTC time
          newDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
        }
      }
      newDate.setHours(0,0,0,0);

      let newEvent = new Event(this.state.newGroup,
                               newDate.toISOString(),
                               this.state.newDescription,
                              this.state.newType);
      let eventDisplay = new EventDisplay(newEvent);

      let newEvents = this.state.events.concat(eventDisplay);
      newEvents.sort(
        (a, b) => 
        ( 
          new Date(a.date) - new Date(b.date)
          ));
        
      this.setState({events: newEvents});
    }

    onSave(){
            let site = window.location.href;
            let urlBase = "https://www.odusseus.org/php/item";
            let key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
            let token = "DFAC7440-1A78-4612-AECD-E896759CD66D";
            if (true && site.includes("localhost")){
              urlBase = "http://localhost:9000";
              key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
              token = "591FFE3A-7EF6-4F16-BCB4-880555820D6C";
            }
            
            let url = urlBase + "/postitem.php";
            let value = JSON.stringify(this.state.events);
            let postEvent = new PostEvent(key, token, value);

            let myHeaders = new Headers();
            myHeaders.append('Accept', 'application/json');
            myHeaders.append('Content-Type', 'application/json');

            fetch(url, {
              method: 'POST', 
              body: JSON.stringify(postEvent)
            }).catch(console.log);
    }
    componentDidMount() {
      // if(this.state.events.length > 0 ) {
      //   return;
      // }
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
      .catch(console.log);
    } 
  render() {
    let groupName = null;
    let groupNameDisplay = null;
    return (
      <>
        <div>Events v1.1.4 from {this.state.source}</div>
        <div>
            <fieldset className={styles.inputField}>
              <legend>New event</legend>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Group
                </label>
                <input type="text" onChange={this.onChangeGroup}/>
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Date
                </label>
                <input type="text" onChange={this.onChangeDate} />
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Description
                </label>
                <input type="text" onChange={this.onChangeDescription} />
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Type
                </label>
                <input type="text" onChange={this.onChangeType} />
               </div>
               <div className={styles.button}>
                      <button onClick={ () => this.onAdd() }>Add</button>
                    </div>
                    <div className={styles.button}>
                      <button onClick={ () => this.onSave() }>save</button>
                    </div>
              </fieldset>
            <div className={styles.debug}>
              <div>{this.state.newGroup}</div>
              <div>{this.state.newDate}</div>
              <div>{this.state.newDescription}</div>
              <div>{this.state.newType}</div>
            </div>
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
                    <div className={styles.id} >
                      {event.objectId}
                    </div>
                    <div className={styles.day}>
                      {event.day}
                    </div>
                    <div className={styles.date}>
                    {
                      <LocalMoment date={event.date} />
                    }
                    </div>
                    <div className={styles.description}>
                      {event.description}
                    </div>
                    <div className={styles.type}>
                      {event.type}
                    </div>
                    <div className={styles.button}>
                      <button onClick={ () => this.onDelete(event.objectId) }>Delete</button>
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
  
  function LocalMoment(element) {
    let newDate = new Date(element.date);
    return <Moment format = 'DD-MM-YYYY'>{newDate}</Moment>;
  }
  
export default ShowEvents;