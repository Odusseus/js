import styles from '../css/cs.module.css';
import React, { useState, useEffect } from 'react';
import Item from './Item';
import Items from './Items';

export default function ItemsEdit({ show }) {
  const [items, setItems] = useState(new Items());
  const [list, setList] = useState([]);
  const [item, setItem] = useState('');
  const [id, setId] = useState(0);
  const [value, setValue] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  let displayInfo = show ? styles.displayInitial : styles.displayNone;
  
  const handelSubmit = (evt) => {
    let newItem = new Item();
    newItem.value = value;
    newItem.comment = comment;
    let newItems = items;
    newItems.Add(newItem);
    setItems(newItems);
    setList(items.list);
  }

  useEffect(() => {
    if(items.list.length === 0)
    {

      let newItems = items;
      let itemA = new Item('va', 'ca');
      let itemB = new Item('vb', 'cb');
      let itemC = new Item('vc', 'cc');
      newItems.Add(itemA);
    newItems.Add(itemB);
    newItems.Add(itemC);
    setItems(newItems);
    setList(items.list);
    
    //setItem(new Item());
    //setId(item.id);
    //setValue(item.value);
    //setComment(item.comment);
  }
  return () => console.warn( 'unmounted: Do Something( Unsuscribe, Remove Event )' );
  }, []);

  
  const deleteItem = (id) => {
    items.Delete(id);
    setList(items.list);
  }

  const editItem = (id) => {
    alert("Edit Item");
  }

  return (
    <div>
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
      <div>
        <ul>
          {
            list.map(item => {
              return (
                <li key={item.id}>
                  <div>

                    <div>
                      {item.id}
                    </div>
                    <div>
                      {item.value}
                    </div>
                    <div>
                      {item.comment}
                    </div>
                    <button onClick={() => deleteItem(item.id)}>Delete</button>
                    <button onClick={() => editItem(item.id)}>Edit</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
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
