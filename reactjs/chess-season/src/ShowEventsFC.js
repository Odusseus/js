/*jshint esversion: 6 */
import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import EventDisplay from './EventDisplay';
import Event from './Event';
import PostEvent from './PostEvent';
import styles from './css/cs.module.css';
import Keys from './Keys';

const ShowEventsFC = () =>  {
  const [events, setEvents] = useState([]);
  const [source, setSource] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newType, setNewType] = useState("");
  const [key, setKey] = useState("");
  const [token, setToken] = useState("");
  const [isShowNewEvent, setIsShowNewEvent] = useState(false);
  const [isShowDebug, setIsShowDebug] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  
  let displayInfo = isShowInfo ? styles.displayInitial : styles.displayNone;
  let displayNewEvent = isShowNewEvent ? styles.displayInitial : styles.displayNone;
  let displayDebug = isShowDebug ? styles.displayInitial : styles.displayNone;
  let groupName = null;
  let groupNameDisplay = null;
    
  const site = window.location.href;
  let urlBase = "https://www.odusseus.org/php/item";
  if (site.includes("localhost")){
    urlBase = "http://localhost:9000";
  }

  const LocalMoment = (element) => {
    let newDate = new Date(element.date);
    return <Moment format = 'DD-MM-YYYY'>{newDate}</Moment>;
  }

  const onAdd = () => {
    let newHelpDate  = new Date();
    if( newDate !== '') {
      const parts = newDate.split('-');
      if(parts.length === 3){
        // save as UTC time
        newHelpDate = new Date(Date.UTC(parts[2], parts[1] - 1, parts[0]));
      }
    }
    newHelpDate.setHours(0,0,0,0);

    let newEvent = new Event(newGroup,
                             newHelpDate.toISOString(),
                             newDescription,
                            newType);
    let eventDisplay = new EventDisplay(newEvent);

    let newEvents = events.concat(eventDisplay);
    newEvents.sort(
      (a, b) => 
      ( 
        new Date(a.date) - new Date(b.date)
        ));
      
    setEvents(newEvents);
  }

  const onDelete = (id) => {
    const isNotId = event => event.objectId !== id;
    const updatedEvents = events.filter(isNotId);
    setEvents(updatedEvents);
  }

  const toggleShowDebug = () => {
    let newIsShowDebug = isShowDebug ? false : true;
    setIsShowDebug(newIsShowDebug);
  }

  const setKeys = () => {
    let keys = new Keys(key, token);
    localStorage.setItem('keys', JSON.stringify(keys));
  }

  const toggleIsShowInfo = () => {
    setSource(urlBase);

    let newIsShowInfo = isShowInfo ? false : true;
    setIsShowInfo(newIsShowInfo);
  };

  const toggleIsShowNewEvent = () => {
    let newIsShowNewEvent = isShowNewEvent ? false : true;
    setIsShowNewEvent(newIsShowNewEvent);
  }

  const onSave = () => {
    let site = window.location.href;
    const retrieveKeys = localStorage.getItem('keys');
    let keys = JSON.parse(retrieveKeys);
    if(!keys){
      keys = new Keys();
      if (site.includes("localhost")){
        keys.key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
        keys.token = "testToken";
      }
    }
    
    let urlBase = "https://www.odusseus.org/php/item";
    // Site run localy and you will use the local Api.
    const isApiLocal = true;
    if (site.includes("localhost") && isApiLocal){
      urlBase = "http://localhost:9000";
    }
    
    let url = urlBase + "/postitem.php";
    let value = JSON.stringify(events);
    let postEvent = new PostEvent(keys.key, keys.token, value);

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
      setKey(keys.key);
      setToken(keys.token);
    })
    .catch(console.log);
}

  useEffect(() => {
    const retrieveKeys = localStorage.getItem('keys');
    let keys = JSON.parse(retrieveKeys);
    if(!keys){
      keys = new Keys();
      if (site.includes("localhost")){
        keys.key = "4265AC3D-DD4B-427C-8BFD-6D7E7BB92C09";
        keys.token = "testToken";
      }
    }
    setKey(keys.key);
    setToken(keys.token);
    
    let urlBase = "https://www.odusseus.org/php/item";
    if (site.includes("localhost")){
      urlBase = "http://localhost:9000";
    }
    let url = urlBase + "/getitem.php?key=" + keys.key + "&token=" + keys.token;
    
    setSource(urlBase);
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

          setEvents(newEvents);
    })
    .catch(console.log);
  }, []); 

  return (
      <>
        <nav>
          <ul>
            <li>
            <div className={styles.button}>
              <button onClick={ () => toggleIsShowInfo() }>Info</button>
            </div>
            </li>
            <li>
              <div className={styles.button}>
              <button onClick={ () => toggleIsShowNewEvent() }>New</button>
              </div>
            </li>            
          </ul>
        </nav>
        <div className={displayInfo}>
          <fieldset className={styles.fieldset}>
            <legend>Info</legend>
            <div>Events (23-10-2019) v2.0.0 API = {source}</div>            
            <div className={styles.button}>
              <button onClick={ () => toggleShowDebug() }>Debug</button>
            </div>
            <div className={styles.button}>
              <button className={styles.button} onClick={ () => window.location.reload()}>Reload</button>
            </div>
            <div className={styles.inputField}>
              <label className={styles.inputFieldLabel}> 
                Key
              </label>
              <input className={styles.inputField} type="text" value={key} onChange={event => setKey(event.target.value)}/>
            </div>
            <div className={styles.inputField}>
              <label className={styles.inputFieldLabel}> 
                Token
              </label>
              <input className={styles.inputField} type="text" value={token} onChange={event => setToken(event.target.value)}/>
            </div>
            <div className={styles.button}>
              <button onClick={ () => setKeys() }>Set Keys</button>
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
                <input className={styles.inputField} type="text" value={newGroup} onChange={event => setNewGroup(event.target.value)}/>
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Date
                </label>
                <input className={styles.inputField} type="text" value={newDate} onChange={event => setNewDate(event.target.value)} />
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Description
                </label>
                <input className={styles.inputField} type="text" value={newDescription} onChange={event => setNewDescription(event.target.value)} />
              </div>
              <div className={styles.inputField}>
                <label className={styles.inputFieldLabel}> 
                  Type
                </label>
                <input className={styles.inputField} type="text" value={newType} onChange={event => setNewType(event.target.value)} />
               </div>
               <div className={styles.button}>
                  <button onClick={ () => onAdd() }>Add</button>
                </div>
                <div className={styles.button}>
                  <button onClick={ () => onSave() }>Save</button>
                </div>                   
              </fieldset>
        </div>
        <div className={displayDebug}>
          <fieldset className={styles.fieldset}>
            <legend>Debug</legend>
              <div>Info:</div>
          </fieldset>
        </div>
        <div>
            {
              events.map(
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
                      <button onClick={ () => onDelete(event.objectId) }>Delete</button>
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
  
export default ShowEventsFC;