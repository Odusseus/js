import React, { useState } from 'react';
import * as Constant from './constant';
import Common from './Common';
import Error from './Error';
import Fetch from 'unfetch';
import Info from './Info';
import ItemsList from './ItemsList';
import Message from './Message';
import Styles from '../css/cs.module.css';
import {useCookies} from 'react-cookie';

export default function MyApp() {
  const [showInfo, setShowInfo] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showItemsList, setShowItemsList] = useState(false);

  function info() {
    let show = showInfo;
    setShowInfo(!show);
  }

  function signIn() {
    let show = showSignIn;
    setShowSignIn(!show);
  }

  function listItems() {
    let show = showItemsList;
    setShowItemsList(!show);
  }

  const greeting = "Hello Voca-Quiz!";
  const myApp =
    <div className={Styles.event}>
      <nav>
        <button onClick={info}>Info</button>
        <button onClick={signIn}>Sign in</button>
        <button onClick={listItems}>Show Items List</button>
      </nav>
      <div className={Styles.group}>
        <h1>{greeting}</h1>
        <Info show={showInfo} />
        <SignIn show={showSignIn} />
        <ItemsList show={showItemsList} />
      </div>
    </div>
    ;

  return myApp;
}

function CreateAccount({ show }) {

  let displayInfo = show ? Styles.displayInitial : Styles.displayNone;

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
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        appname: Constant.AppName,
        nickname: nickname,
        password: password,
        email: email
      })
    };
    Fetch(`${Common.GetHost()}${Constant.UserCreateApi}`, requestOptions)
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
  }

  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={Styles.fieldset}>
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

  let displayInfo = show ? Styles.displayInitial : Styles.displayNone;

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isCookiePermanent, setIsCookiePermanent] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showNewAccount, setShowNewAccount] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies([Constant.Cookie]);

  function newAccount() {
    let show = showNewAccount;
    setError('');
    setMessage('');
    setShowNewAccount(!show);
  }
  
  function logOut() {
    setError('');
    removeCookie(Constant.Cookie);
    setMessage('You are logged out.');
    setNickname('');
    setPassword('');
    setIsCookiePermanent(false);
  }
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
        appname: Constant.AppName,
        nickname: nickname,
        password: password,
        iscookiepermanent: isCookiePermanent
      })
    };

    Fetch(`${Common.GetHost()}${Constant.UserLoginApi}`, requestOptions)
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
          let tokenTimeoutMilliSeconde = parseInt(data.tokenTimeoutSeconde, 10) * 1000;
          let expiresTime = new Date(tokenTimeoutMilliSeconde);
          setCookie(Constant.Cookie, data.token, { expires: expiresTime });
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
        setError(`There was an error : ${Common.GetHost()}${Constant.UserLoginApi}`);
      });
  }

  return (
    <div className={displayInfo}>
      <button onClick={newAccount}>New account</button>
      <button onClick={logOut}>Log out</button>
      <CreateAccount show={showNewAccount} />
      <form onSubmit={handelSubmit}>
        <fieldset className={Styles.fieldset}>
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

// function ItemLength({ show }) {

//   let displayInfo = show ? Styles.displayInitial : Styles.displayNone;

//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [cookies, setCookie, removeCookie] = useCookies([Constant.Cookie]);

//   const handelSubmit = (evt) => {
//     setError('');
//     setMessage('');
//     evt.preventDefault();
//     const requestOptions = {
//       method: 'GET',
//       credentials: 'include',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//       }
//     };
//     let token = Constant.SameOrigin ? '' : `&token=${cookies.token}`;
//     fetch(`${Environment.Host}${Constant.Itemlength}${token}`, requestOptions)
//       .then((response) => {
//         return response.json()
//       })
//       .then((data) => {
//         console.log(data);
//         if (data.statusCode === 200) {
//           setMessage(data.message);
//         }
//         else {
//           setError(data.message);
//         }
//       })
//       .catch(error => {
//         console.error('There was an error.', error);
//         setError(`There was an error : ${Environment.Host}${Constant.UserLoginApi}`);
//       });
//   }

//   return (
//     <div className={displayInfo}>
//       <form onSubmit={handelSubmit}>
//         <fieldset className={Styles.fieldset}>
//           <legend>Itemlength:</legend>
//           <div>
//             <input type="submit" value="Ok" />
//           </div>
//           <Message message={message} />
//           <Error error={error} />
//         </fieldset>
//       </form>
//     </div>
//   );
// }

// function SaveItem({ show }) {

//   let displayInfo = show ? Styles.displayInitial : Styles.displayNone;

//   const [item, setItem] = useState('');
//   const [version, setVersion] = useState(0);

//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [cookies, setCookie, removeCookie] = useCookies([Constant.Cookie]);

//   const handelSubmit = (evt) => {
//     setError('');
//     setMessage('');
//     evt.preventDefault();
//     const requestOptions = {
//       credentials: 'include',
//       method: 'POST',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//       },
//       body: JSON.stringify({
//         value: item,
//         version: version
//       })
//     };

//     let token = Constant.SameOrigin ? '' : `?token=${cookies.token}`;

//     fetch(`${Environment.Host}${Constant.SaveItem}${token}`, requestOptions)
//       .then((response) => {
//         return response.json()
//       })
//       .then((data) => {
//         console.log(data);
//         if (data.statusCode === 200) {
//           setMessage(data.message);
//         }
//         else {
//           setError(data.message);
//         }
//       })
//       .catch(error => {
//         console.error('There was an error.', error);
//         setError(`There was an error : ${Environment.Host}${Constant.UserLoginApi}`);
//       });
//   }

//   return (
//     <div className={displayInfo}>
//       <form onSubmit={handelSubmit}>
//         <fieldset className={Styles.fieldset}>
//           <legend>Save Item:</legend>
//           <div>
//             <label>
//               Version
//               <input
//                 type="number"
//                 value={version}
//                 onChange={e => setVersion(e.target.value)}
//                 placeholder="0"
//               />
//             </label>
//           </div>
//           <div>
//             <label>
//               Item
//               <input
//                 type="text"
//                 value={item}
//                 onChange={e => setItem(e.target.value)}
//                 placeholder="my text..."
//               />
//             </label>
//           </div>
//           <div>
//             <input type="submit" value="Ok" />
//           </div>
//           <Message message={message} />
//           <Error error={error} />
//         </fieldset>
//       </form>
//     </div>
//   );
// }


// function GetItem({ show }) {

//   let displayInfo = show ? Styles.displayInitial : Styles.displayNone;

//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [cookies, setCookie, removeCookie] = useCookies([Constant.Cookie]);

//   const handelSubmit = (evt) => {
//     setError('');
//     setMessage('');
//     evt.preventDefault();
//     const requestOptions = {
//       credentials: 'include',
//       method: 'GET',
//       headers: {
//         'content-type': 'application/x-www-form-urlencoded'
//       }
//     };

//     let token = Constant.SameOrigin ? '' : `?token=${cookies.token}`;

//     fetch(`${Environment.Host}${Constant.GetItem}${token}`, requestOptions)
//       .then((response) => {
//         return response.json()
//       })
//       .then((data) => {
//         console.log(data);
//         if (data.statusCode === 200) {
//           setMessage(data.message);
//         }
//         else {
//           setError(data.message);
//         }
//       })
//       .catch(error => {
//         console.error('There was an error.', error);
//         setError(`There was an error : ${Environment.Host}${Constant.UserLoginApi}`);
//       });
//   }

//   return (
//     <div className={displayInfo}>
//       <form onSubmit={handelSubmit}>
//         <fieldset className={Styles.fieldset}>
//           <legend>Item:</legend>
//           <div>
//             <input type="submit" value="Ok" />
//           </div>
//           <Message message={message} />
//           <Error error={error} />
//         </fieldset>
//       </form>
//     </div>
//   );
// }


// function Error({ error }) {

//   return (<div>
//     {error}
//   </div>)
// }

// function Message({ message }) {

//   return (<div>
//     {message}
//   </div>)
// }