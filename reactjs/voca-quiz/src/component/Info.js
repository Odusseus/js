import React, { useState, useReducer, useEffect } from 'react';
import * as Constant from './constant';
import * as Environment from './environment';
import AppData from './class/AppData';
import AppDataBuilder from './class/AppDataBuilder';
import Error from './Error';
import Message from './Message';
import Common from './Common';
import Checkbox from './Checkbox';
import {useCookies} from 'react-cookie';
import Styles from '../css/cs.module.css';

export default function Info({ show }) {
  let displayInfo = show ? Styles.displayInitial : Styles.displayNone;
  let appDataBuilder = new AppDataBuilder();

  const [showItemLength, setShowItemLength] = useState(false);
  const [showSaveItem, setShowSaveItem] = useState(false);
  const [showGetItem, setShowGetItem] = useState(false);
  const reducer = (state, action) => ({ ...state, ...action });
  const [appData, setAppData] = useReducer(reducer, appDataBuilder.appData);

  function itemLength() {
    let show = showItemLength;
    setShowItemLength(!show);
  }
  
  // useEffect(() => {
  //      let jsonData = window.localStorage.getItem(Constant.AppName);
  //      let newAppData = JSON.parse(jsonData);
  //      setAppData(newAppData);    
  //  }, []);

  useEffect(() => {
      window.localStorage.setItem(Constant.AppName, JSON.stringify(appData));
 }, [appData]);

  function saveItem() {
    let show = showSaveItem;
    setShowSaveItem(!show);
  }

  function getItem() {
    let show = showGetItem;
    setShowGetItem(!show);
  }  

  return (
    <div className={displayInfo}>
      <nav>
        <button onClick={itemLength}>Item length</button>
        <button onClick={saveItem}>Save Item</button>
        <button onClick={getItem}>Get Item</button>
      </nav>
      <div>
        <Checkbox 
        title="Local"
        fnChange={v => {setAppData({ local: v});
                       }}
        checked={appData.local}
        />
      </div>
      <div>
        <p>Item 1.0.5 16-8-2020 Refactoring info.</p>
        <p>Item 1.0.4 9-8-2020 Refresh item list when is showed.</p>
        <p>Item 1.0.3 9-8-2020 Timeout cookie is fixed.</p>
        <p>Item 1.0.2 8-8-2020 Save new item is fixed.</p>
        <p>Item 1.0.1 8-8-2020 Basic version.</p>
      </div>
      <div className={Styles.group}>
        <ItemLength show={showItemLength} />
        <SaveItem show={showSaveItem} />
        <GetItem show={showGetItem} />
      </div>
    </div>
  );
}

function ItemLength({ show }) {

  let displayInfo = show ? Styles.displayInitial : Styles.displayNone;

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [cookies] = useCookies([Constant.Cookie]);

  const handelSubmit = (evt) => {
    setError('');
    setMessage('');
    evt.preventDefault();
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    let token = Constant.SameOrigin ? '' : `&token=${cookies.token}`;
    fetch(`${Common.GetHost()}${Constant.Itemlength}${token}`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setMessage(data.message);
        }
        else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('There was an error.', error);
        setError(`There was an error : ${Common.GetHost()}${Constant.UserLoginApi}`);
      });
  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={Styles.fieldset}>
          <legend>Itemlength:</legend>
          <div>
            <input type="submit" value="Ok" />
          </div>
          <Message message={message} />
          <Error error={error} />
        </fieldset>
      </form>
    </div>
  );
}

function SaveItem({ show }) {

  let displayInfo = show ? Styles.displayInitial : Styles.displayNone;

  const [item, setItem] = useState('');
  const [version, setVersion] = useState(0);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies([Constant.Cookie]);

  const handelSubmit = (evt) => {
    setError('');
    setMessage('');
    evt.preventDefault();
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        value: item,
        version: version
      })
    };

    let token = Constant.SameOrigin ? '' : `?token=${cookies.token}`;

    fetch(`${Common.GetHost()}${Constant.SaveItem}${token}`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setMessage(data.message);
        }
        else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('There was an error.', error);
        setError(`There was an error : ${Common.GetHost()}${Constant.UserLoginApi}`);
      });
  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={Styles.fieldset}>
          <legend>Save Item:</legend>
          <div>
            <label>
              Version
              <input
                type="number"
                value={version}
                onChange={e => setVersion(e.target.value)}
                placeholder="0"
              />
            </label>
          </div>
          <div>
            <label>
              Item
              <input
                type="text"
                value={item}
                onChange={e => setItem(e.target.value)}
                placeholder="my text..."
              />
            </label>
          </div>
          <div>
            <input type="submit" value="Ok" />
          </div>
          <Message message={message} />
          <Error error={error} />
        </fieldset>
      </form>
    </div>
  );
}

function GetItem({ show }) {

  let displayInfo = show ? Styles.displayInitial : Styles.displayNone;

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [local, setLocal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([Constant.Cookie]);

  const handelSubmit = (evt) => {
    setError('');
    setMessage('');
    evt.preventDefault();
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    };

    let token = Constant.SameOrigin ? '' : `?token=${cookies.token}`;

    fetch(`${Common.GetHost()}${Constant.GetItem}${token}`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setMessage(data.message);
        }
        else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('There was an error.', error);
        setError(`There was an error : ${Common.GetHost()}${Constant.UserLoginApi}`);
      });
  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={Styles.fieldset}>
          <legend>Item:</legend>
          <div>
            <input type="submit" value="Ok" />
          </div>
          <Message message={message} />
          <Error error={error} />
        </fieldset>
      </form>
    </div>
  );
}