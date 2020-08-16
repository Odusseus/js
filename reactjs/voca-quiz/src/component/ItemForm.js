import React, { useState, useEffect } from 'react';
import Error from './Error';
import Item from './class/Item';
import Message from './Message';
import Styles from '../css/cs.module.css';

export default function ItemForm({ item, addItem }) {
  const [id, setId] = useState(item.id);
  const [value, setValue] = useState(item.value);
  const [comment, setComment] = useState(item.comment);
  const [error] = useState('');
  const [message] = useState('');

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

  return (
    <form onSubmit={onFormSubmit}>
      <fieldset className={Styles.fieldset}>
        <legend>Edit Item:</legend>
        <div className={Styles.id}>
          <label className={Styles.inputFieldLabel}>
            id
          </label>
          <div>
            {id}
          </div>
        </div>
        <div className={Styles.inputField}>
          <label className={Styles.inputFieldLabel}>
            <div>Value</div>
            <input
              className={Styles.inputField}
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="my value..."
            />
          </label>
        </div>
        <div className={Styles.inputField}>
          <label className={Styles.inputFieldLabel}>
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
        <div className={Styles.button}>
          <input type="submit" value="Save" />
        </div>
        <Message message={message} />
        <Error error={error} />
      </fieldset>
    </form>
  )
}; 