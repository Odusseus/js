import React, { useState } from 'react';
import * as Constant from '../constant';
import * as Environment from '../environment';
import Error from './Error';
import Message from './Message';
import {useCookies} from 'react-cookie';
import Styles from '../css/cs.module.css';

export default function Info({ show }) {
  let displayInfo = show ? Styles.displayInitial : Styles.displayNone;
  const [showItemLength, setShowItemLength] = useState(false);
  const [showSaveItem, setShowSaveItem] = useState(false);
  const [showGetItem, setShowGetItem] = useState(false);
  const [debug, setDebug] = useState(false);


  function itemLength() {
    let show = showItemLength;
    setShowItemLength(!show);
  }

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
        
      </div>
      <div>
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
    fetch(`${Environment.Host}${Constant.Itemlength}${token}`, requestOptions)
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
        setError(`There was an error : ${Environment.Host}${Constant.UserLoginApi}`);
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

    fetch(`${Environment.Host}${Constant.SaveItem}${token}`, requestOptions)
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
        setError(`There was an error : ${Environment.Host}${Constant.UserLoginApi}`);
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

    fetch(`${Environment.Host}${Constant.GetItem}${token}`, requestOptions)
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
        setError(`There was an error : ${Environment.Host}${Constant.UserLoginApi}`);
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