/*jshint esversion: 6 */
import React, { Component } from 'react';
import Moment from 'react-moment';
import EventDisplay from './EventDisplay';
import Event from './Event';
import PostEvent from './PostEvent';
import styles from './css/cs.module.css';
import Keys from './Keys';

class ShowEvents extends Component {

    constructor(props) {
      super(props);

      this.state = {
        events: [],
        source: "",
        newGroup: "",
        newDate: "",
        newDescription: "",
        newType: "",
        key: "",
        token:"",
        isShowNewEvent: false,
        isShowDebug: false,
        isShowInfo: false
      }

      this.onDelete = this.onDelete.bind(this);
      this.onChangeGroup = this.onChangeGroup.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeType = this.onChangeType.bind(this);
      this.onChangeKey = this.onChangeKey.bind(this);
      this.onChangeToken = this.onChangeToken.bind(this);
      this.onAdd = this.onAdd.bind(this);
      this.onSave = this.onSave.bind(this);
      this.onReload = this.onReload.bind(this);
      this.setIsShowNewEvent = this.setIsShowNewEvent.bind(this);
      this.setIsShowDebug = this.setIsShowDebug.bind(this);
      this.setIsShowInfo = this.setIsShowInfo.bind(this);
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

    onChangeKey(event){
      this.setState({key: event.target.value});
    }

    onChangeToken(event){
      this.setState({token: event.target.value});
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
            const retrieveKeys = localStorage.getItem('keys');
            const keys = JSON.parse(retrieveKeys);
            let key = '';
            let token = '';
            if(keys && keys.key && keys.token){
              key = keys.key;
              token = keys.token;
            } else {
              if (site.includes("localhost")){
                key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
              }
            }
            
            let urlBase = "https://www.odusseus.org/php/item";
            if (true && site.includes("localhost")){
              urlBase = "http://localhost:9000";
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
              }
            ).then(res => res.json())
            .then((data)=> {
              let keys = new Keys(data.key, data.token);
              localStorage.setItem('keys', JSON.stringify(keys));
              this.setState({key: data.key, token: data.token});
            })
            .catch(console.log);
    }

    setIsShowNewEvent()
    {
      let isShowNewEvent = this.state.isShowNewEvent ? false : true;
      this.setState({isShowNewEvent: isShowNewEvent});
    }

    setIsShowDebug(){
      let isShowDebug = this.state.isShowDebug ? false : true;
      this.setState({isShowDebug: isShowDebug});
    }

    setIsShowInfo(){
      let isShowInfo = this.state.isShowInfo ? false : true;
      this.setState({isShowInfo: isShowInfo});
    }

    setKeys(){
      let keys = new Keys(this.state.key, this.state.token);
      localStorage.setItem('keys', JSON.stringify(keys));
    }

    onReload(){
      window.location.reload();
    }
    componentDidMount() {
      const retrieveKeys = localStorage.getItem('keys');
      const keys = JSON.parse(retrieveKeys);
      this.setState({key: keys.key, token: keys.token});
      let site = window.location.href;
      let key = '';
      let token = '';
      if(keys && keys.key && keys.token){
        key = keys.key;
        token = keys.token;
      } else {        
        if (site.includes("localhost")){
          key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
        }
      }
      let urlBase = "https://www.odusseus.org/php/item";
      if (site.includes("localhost")){
        urlBase = "http://localhost:9000";
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
    let displayNewEvent = this.state.isShowNewEvent ? styles.displayInitial : styles.displayNone;
    let displayDebug = this.state.isShowDebug ? styles.displayInitial : styles.displayNone;
    let displayInfo = this.state.isShowInfo ? styles.displayInitial : styles.displayNone;
    return (
      <>
        <nav>
          <ul>
            <li>
              <div className={styles.button}>
              <button onClick={ () => this.setIsShowNewEvent() }>New</button>
              </div>
            </li>
            <li>
            <div className={styles.button}>
              <button onClick={ () => this.setIsShowInfo() }>Info</button>
            </div>
            </li>            
          </ul>
        </nav>
        <div className={displayInfo}>
          <fieldset className={styles.fieldset}>
            <legend>Info</legend>
            <div>Events (23-102019) v1.2.0 from {this.state.source}</div>
            <div className={styles.button}>
              <button className={styles.button} onClick={ () => this.onReload() }>Reload</button>
            </div>
            <div className={styles.button}>
              <button onClick={ () => this.setIsShowDebug() }>Debug</button>
            </div>
            
            <div className={styles.inputField}>
              <label className={styles.inputFieldLabel}> 
                Key
              </label>
              <input className={styles.inputField} type="text" value={this.state.key} onChange={this.onChangeKey}/>
            </div>
            <div className={styles.inputField}>
              <label className={styles.inputFieldLabel}> 
                Token
              </label>
              <input className={styles.inputField} type="text" value={this.state.token} onChange={this.onChangeToken}/>
            </div>
            <div className={styles.button}>
              <button onClick={ () => this.setKeys() }>Set Keys</button>
            </div>
          </fieldset>
        </div>
        <div className={displayNewEvent}>
            <fieldset className={styles.fieldset}>
              <legend>New event</legend>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Group
                </label>
                <input className={styles.inputField} type="text" onChange={this.onChangeGroup}/>
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Date
                </label>
                <input className={styles.inputField} type="text" onChange={this.onChangeDate} />
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Description
                </label>
                <input className={styles.inputField} type="text" onChange={this.onChangeDescription} />
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Type
                </label>
                <input className={styles.inputField} type="text" onChange={this.onChangeType} />
               </div>
               <div className={styles.button}>
                  <button onClick={ () => this.onAdd() }>Add</button>
                </div>
                <div className={styles.button}>
                  <button onClick={ () => this.onSave() }>Save</button>
                </div>                   
              </fieldset>
            <div className={displayDebug}>
              <div>Group: {this.state.newGroup}</div>
              <div>Date: {this.state.newDate}</div>
              <div>Description: {this.state.newDescription}</div>
              <div>Type: {this.state.newType}</div>
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