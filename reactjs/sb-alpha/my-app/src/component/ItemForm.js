import styles from '../css/cs.module.css';
import React, { useState, useEffect } from 'react';
import Item from './Item';

export default function ItemForm({ item, addItem }) {
  const [id, setId] = useState(item.id);
  const [value, setValue] = useState(item.value);
  const [comment, setComment] = useState(item.comment);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setId(item.id);
    setValue(item.value);
    setComment(item.comment);
  }, [item]);

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    if (!value) return;

    const newItem = new Item();

    newItem.id = item.id;
    newItem.value = value;
    newItem.comment = comment;
    setId('');
    setValue('');
    setComment('');    
    addItem(newItem);
  };

  const handleOnChange = (event) => {
    return setValue(event.target.value);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <fieldset className={styles.fieldset}>
        <legend>Edit Item:</legend>
        <div>
          <label>
            id
          </label>
          <di>
            {id}
          </di>
        </div>
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
};
