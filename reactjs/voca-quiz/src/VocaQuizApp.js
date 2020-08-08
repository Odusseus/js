import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import fetch from 'unfetch';
import * as Constant from './constant';
import * as Environment from './environment';
import AppDataShow from './component/AppDataShow';
import ItemsList from './component/ItemsList';
import Item from './component/Item';
import styles from './css/cs.module.css';

//import ItemsEdit from './component/ItemsEdit';
//import ItemEdit from './component/ItemEdit';
//import ItemsShow from './component/ItemsShow';
//import Item from './component/Item';
//import Items from './component/Items';

// let newItems = new Items();    
//     let itemA = new Item('va', 'ca');
//     let itemB = new Item('vb', 'cb');
//     let itemC = new Item('vc', 'cc');
//     newItems.Add(itemA);
//     newItems.Add(itemB);
//     newItems.Add(itemC);  

export default function MyApp() {
  const [showInfo, setShowInfo] = useState(false);
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showItemLength, setShowItemLength] = useState(false);
  const [showSaveItem, setShowSaveItem] = useState("");
  const [showGetItem, setShowGetItem] = useState("");
  const [showItemsList, setShowItemsList] = useState(false);
  const [initialState, setInitialState] = useState([]);

  // useEffect ( () => {
  //   const newInitialState = initialState;
  //   newInitialState.push( new Item('va', 'ca'));
  //   newInitialState.push( new Item('vb', 'cb'));
  //   newInitialState.push( new Item('vc', 'cc')); 
  //   setInitialState(newInitialState);
  //  }, []);

  //const [showItemsEdit, setShowItemsEdit] = useState(false);
  //const [item, setItem] = useState(new Item('',''));
 // const [items, setItems] = useState(newItems);

  
    //useEffect ( () => {
    // let newItems = new Items();    
    // let itemA = new Item('va', 'ca');
    // let itemB = new Item('vb', 'cb');
    // let itemC = new Item('vc', 'cc');
    // newItems.Add(itemA);
    // newItems.Add(itemB);
    // newItems.Add(itemC);  
    //setItems(newItems);
    //}, [])
  
    
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

  // function editItems() {
  //   let show = showItemsEdit;
  //   setShowItemsEdit(!show);
  // }  

  function listItems() {
    let show = showItemsList;
    setShowItemsList(!show);
  }  

//   function parentFunction(id){
//     //alert(id);
//     let editItem = items.GetItem(id);
//     let newItem =  editItem[0];
//     setItem(newItem);
// }

  const greeting = "Hello Voca-Quiz!";
  const myApp =
    <div className={styles.event}>
      <nav>
        <button onClick={info}>Info</button>
        <button onClick={newAccount}>New account</button>
        <button onClick={signIn}>sign in</button>
        <button onClick={itemLength}>Item length</button>
        <button onClick={saveItem}>Save Item</button>
        <button onClick={getItem}>Get Item</button>
        {/* <button onClick={editItems}>Show Items</button> */}
        <button onClick={listItems}>Show Items List</button>
      </nav>
      <div className={styles.group}>
        <h1>{greeting}</h1>
        <Info show={showInfo} />
        <CreateAccount show={showNewAccount} />
        <SignIn show={showSignIn} />
        <ItemLength show={showItemLength} />
        <SaveItem show={showSaveItem} />
        <GetItem show={showGetItem} />        
        {/* <AppDataShow /> */}
        {/* <ItemsEdit show={true} /> */}
        <ItemsList show={showItemsList}/>
      </div>
    </div>
    ;

  return myApp;
}

function Info({ show }) {
  let displayInfo = show ? styles.displayInitial : styles.displayNone;
  return (
    <div className={displayInfo}>
      <h1>Item 1.0.2 8-8-2020 Save new item fixed.</h1>
      <h1>Item 1.0.1 8-8-2020 Basic version.</h1>
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
        appname: Environment.AppName,
        nickname: nickname,
        password: password,
        email: email
      })
    };
    fetch(`${Environment.Host}${Constant.UserCreateApi}`, requestOptions)
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
        appname: Environment.AppName,
        nickname: nickname,
        password: password,
        iscookiepermanent: isCookiePermanent
      })
    };

    fetch(`${Environment.Host}${Constant.UserLoginApi}`, requestOptions)
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
         let tokenTimeout = parseInt(data.tokenTimeout,10);
         setCookie(Constant.Cookie, data.token, {expires: new Date(Date.now() + tokenTimeout)});
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
        setError(`There was an error : ${Environment.Host}${Constant.UserLoginApi}`);
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
  const [cookies, setCookie, removeCookie] = useCookies([Constant.Cookie]);

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