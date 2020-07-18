import styles from '../css/cs.module.css';
import React, { useState } from 'react';
import Item from './Item';

export default function ItemEdit({ show }) {
  let displayInfo = show ? styles.displayInitial : styles.displayNone;

  let item = new Item();
  const [id, setId] = useState(item.id);
  const [value, setValue] = useState(item.value);
  const [comment, setComment] = useState(item.comment);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handelSubmit = (evt) => {
    item.value = value;
    item.comment = comment;
    alert(item.value)
  }
  
  return (
    <div className={displayInfo}>
      <form onSubmit={handelSubmit}>
        <fieldset className={styles.fieldset}>
          <legend>Edit Item:</legend>
          <div>
            <label>
              Value
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="my value..."
              />
            </label>
          </div>
          <div>
            <label>
              comment
          <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="my comment..."
              />
            </label>
          </div>          
          <div>
            <input type="submit" value="Save" />
          </div>
          <Message message={message} />
          <Error error={error} />
        </fieldset>
      </form>
    </div>
  );

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
}