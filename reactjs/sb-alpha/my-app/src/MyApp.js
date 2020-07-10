import React, { useState } from 'react';
import fetch from 'unfetch';

export default function MyApp() {

  const greeting = "Hello Voca-Quiz!";
  const myApp =
    <div> <h1>{greeting}</h1>
      <CreateAccount />
    </div>
    ;

  return myApp;
}

function CreateAccount(props) {

  return <CreatAccount />;
}

function CreatAccount(props) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handelSubmit = (evt) => {
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
    fetch('http://local.elpida.odusseus.org/UserCreateApi.php', requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        console.log("ready");
        if (data.statusCode = 200) {
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

    alert(`Submitting name ${nickname} ${password}`);

  }

  return (
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
      <div>
        {message}
      </div>
      <div>
        {error}
      </div>
    </form>
  );
}