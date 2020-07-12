import styles from './css/cs.module.css';
import React, { useState } from 'react';
import fetch from 'unfetch';
import * as Constant from './constant';
import * as Environment from './environment';

export default function MyApp() {

  const [showInfo, setShowInfo] = useState(false);
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showItemLength, setShowItemLength] = useState(false);
  const [showSaveItem, setShowSaveItem] = useState("");
  const [showGetItem, setShowGetItem] = useState("");

  function info() {
    let show = showInfo;
    setShowInfo(!show);
  }

  function newAccount() {
    let show = showNewAccount;
    setShowNewAccount(!show);
  }

  function signIn() {
    let show = showSignIn;
    setShowSignIn(!show);
  }

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

  const greeting = "Hello Voca-Quiz!";
  const myApp =
    <div>
      <nav>
        <button onClick={info}>Info</button>
        <button onClick={newAccount}>New account</button>
        <button onClick={signIn}>sign in</button>
        <button onClick={itemLength}>Item length</button>
        <button onClick={saveItem}>Save Item</button>
        <button onClick={getItem}>Get Item</button>
      </nav>
      <div>
        <h1>{greeting}</h1>
        <Info show={showInfo} />
        <CreateAccount show={showNewAccount} />
        <SignIn show={showSignIn} />
        <ItemLength show={showItemLength} />
        <SaveItem show={showSaveItem} />
        <GetItem show={showGetItem} />
      </div>
    </div>
    ;

  return myApp;
}

function Info({ show }) {
  let displayInfo = show ? styles.displayInitial : styles.displayNone;
  return (
    <div className={displayInfo}>
      <h1>Item 1.0</h1>
    </div>
  );
}

function CreateAccount({ show }) {

  let displayInfo = show ? styles.displayInitial : styles.displayNone;

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');



  const handelSubmit = (evt) => {
    setError('');
    setMessage('');
    evt.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        //'Accept': 'application/json', 
        //'Content-Type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      //mode: 'no-cors',
      body: JSON.stringify({
        appname: "test",
        nickname: nickname,
        password: password,
        email: email
      })
    };
    fetch(`${Environment.HostDebug}${Constant.UserCreateApi}`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        console.log("ready");
        if (data.statusCode === 200) {
          setMessage(data.message);
        }
        else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('There was an error.', error);
        setError('There was an error with UserCreateApi.');
      });

    //alert(`Submitting name ${nickname} ${password}`);
    //setMessage(`Submitting name ${nickname} ${password}`);

  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={styles.fieldset}>
          <legend>New account:</legend>
          <div>
            <label>
              Nickname
          <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="my nickname"
              />
            </label>
          </div>
          <div>
            <label>
              Password
          <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="my password"
              />
            </label>
          </div>
          <div>
            <label>
              Email
          <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="my@mail.org"
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

function SignIn({ show }) {

  let displayInfo = show ? styles.displayInitial : styles.displayNone;

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isCookiePermanent, setIsCookiePermanent] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
        appname: Environment.AppName,
        nickname: nickname,
        password: password,
        iscookiepermanent: isCookiePermanent
      })
    };

    fetch(`${Environment.HostDebug}${Constant.UserLoginApi}`, requestOptions)
      .then((response) => {
        try {
          return response.json();
        }
        catch {
          return response.text();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setMessage(data.message);
        }
        else {
          if (data.statusCode !== undefined) {
            setError(data.message);
          }
          else {
            setError(data);
          }
        }
      })
      .catch(error => {
        console.error('There was an error.', error);
        setError(`There was an error : ${Environment.HostDebug}${Constant.UserLoginApi}`);
      });
  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={styles.fieldset}>
          <legend>Login:</legend>
          <div>
            <label>
              Nickname
          <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="my nickname"
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="my password"
              />
            </label>
          </div>
          <div>
            <label>
              Remember me?
              <input
                type="checkbox"
                defaultChecked={isCookiePermanent}
                onChange={e => setIsCookiePermanent(e.target.checked)}
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

function ItemLength({ show }) {

  let displayInfo = show ? styles.displayInitial : styles.displayNone;

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handelSubmit = (evt) => {
    setError('');
    setMessage('');
    evt.preventDefault();
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    };
    fetch(`${Environment.HostDebug}${Constant.Itemlength}`, requestOptions)
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
        setError(`There was an error : ${Environment.HostDebug}${Constant.UserLoginApi}`);
      });
  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={styles.fieldset}>
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

  let displayInfo = show ? styles.displayInitial : styles.displayNone;

  const [item, setItem] = useState('');
  const [version, setVersion] = useState(0);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
    fetch(`${Environment.HostDebug}${Constant.SaveItem}`, requestOptions)
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
        setError(`There was an error : ${Environment.HostDebug}${Constant.UserLoginApi}`);
      });
  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={styles.fieldset}>
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

  let displayInfo = show ? styles.displayInitial : styles.displayNone;
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
    fetch(`${Environment.HostDebug}${Constant.GetItem}`, requestOptions)
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
        setError(`There was an error : ${Environment.HostDebug}${Constant.UserLoginApi}`);
      });
  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={styles.fieldset}>
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


function Error({ error }) {

  return (<div>
    {error}
  </div>)
}

function Message({ message }) {

  return (<div>
    {message}
  </div>)
}