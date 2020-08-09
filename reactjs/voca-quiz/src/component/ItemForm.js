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

    const newItem = new Item(id, value, comment);
    addItem(newItem);

    const nextItem = new Item(0, '', '');
    setId(nextItem.id);
    setValue(nextItem.value);
    setComment(nextItem.comment);
  };

  const handleOnChange = (event) => {
    return setValue(event.target.value);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <fieldset className={styles.fieldset}>
        <legend>Edit Item:</legend>
        <div className={styles.id}>
          <label className={styles.inputFieldLabel}>
            id
          </label>
          <div>
            {id}
          </div>
        </div>
        <div className={styles.inputField}>
          <label className={styles.inputFieldLabel}>
            <div>Value</div>
            <input
              className={styles.inputField}
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="my value..."
            />
          </label>
        </div>
        <div className={styles.inputField}>
          <label className={styles.inputFieldLabel}>
            <div>Comment</div>
            <textarea
              rows="5"
              cols="40"
              name="comment"
              value={comment}
              placeholder="my comment..."
              onChange={e => setComment(e.target.value)}>
            </textarea>
          </label>
        </div>
        <div className={styles.button}>
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
