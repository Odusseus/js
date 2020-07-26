import styles from '../css/cs.module.css';
import React, { useState } from 'react';
import Item from './Item';
import Items from './Items';

// TODO https://medium.com/coding-in-depth/reactjs-share-data-between-the-components-de492b129086#:~:text=React%20provide%20an%20easy%20way,to%20communicate%20between%20any%20component.
// https://itnext.io/passing-data-between-sibling-components-in-react-using-context-api-and-react-hooks-fce60f12629a
// https://www.robinwieruch.de/react-update-item-in-list
export default function ItemsShow({ show, items, callback }) {
  let displayInfo = show ? styles.displayInitial : styles.displayNone;
  const [list, setList] = useState(items.list);

  const deleteItem = (id) => {
    items.Delete(id);
    setList(items.list);
  }

  const editItem = (id) =>{
    callback(id)
  }

  return (
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
  );
}