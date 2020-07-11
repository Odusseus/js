import styles from './css/cs.module.css';
import React, { useState } from 'react';
import fetch from 'unfetch';
import * as Constant from './constant';
import * as Environment from './environment';

export default function MyApp() {

  const [showInfo, setShowInfo] = useState(false);
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showMaxlength, setShowMaxlength] = useState(false);
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

  function maxlength() {
    let show = showMaxlength;
    setShowMaxlength(!show);
  }

  const greeting = "Hello Voca-Quiz!";
  const myApp =
    <div>
      <nav>
        <button onClick={info}>Info</button>
        <button onClick={newAccount}>New account</button>
        <button onClick={signIn}>sign in</button>
        <button onClick={maxlength}>Max length</button>
      </nav>
      <div>
        <h1>{greeting}</h1>
        <Info show={showInfo} />
        <CreateAccount show={showNewAccount} />
        <SignIn show={showSignIn} />
        <Maxlength show={showMaxlength} />
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
      mode: 'no-cors',
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
          <input type="submit" value="Submit" />
        </div>
        <Message message={message} />
        <Error error={error} />
      </form>
    </div>
  );
}

function SignIn({ show }) {

  let displayInfo = show ? styles.displayInitial : styles.displayNone;
  
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
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
      mode: 'no-cors',
      body: JSON.stringify({
        appname: "test",
        nickname: nickname,
        password: password
      })
    };
    fetch(`${Environment.HostDebug}${Constant.UserLoginApi}`, requestOptions)
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
          <input type="submit" value="Submit" />
        </div>
        <Message message={message} />
        <Error error={error} />
      </form>
    </div>
  );
}

function Maxlength({ show }) {

  let displayInfo = show ? styles.displayInitial : styles.displayNone;
  
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handelSubmit = (evt) => {
    setError('');
    setMessage('');
    evt.preventDefault();
    const requestOptions = {
      method: 'GET',
      // headers: {
      //   //'Accept': 'application/json', 
      //   //'Content-Type': 'application/json'
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      mode: 'no-cors'
    };
    fetch(`${Environment.HostDebug}${Constant.Maxlength}`, requestOptions)
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
        <div>
          <input type="submit" value="Submit" />
        </div>
        <Message message={message} />
        <Error error={error} />
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