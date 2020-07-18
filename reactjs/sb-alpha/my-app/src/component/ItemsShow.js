//import styles from '../css/cs.module.css';
import React, { useState } from 'react';
import Item from './Item';
import Items from './Items';

// TODO https://medium.com/coding-in-depth/reactjs-share-data-between-the-components-de492b129086#:~:text=React%20provide%20an%20easy%20way,to%20communicate%20between%20any%20component.

export default function ItemsShow({ show }) {
  let displayInfo = show ? styles.displayInitial : styles.displayNone;
  var items = new Items();

  let itemA = new Item('va', 'ca');
  let itemB = new Item('vb', 'cb');
  let itemC = new Item('vc', 'cc');
  items.Add(itemA);
  items.Add(itemB);
  items.Add(itemC);

  return (
    <ul>
      {
        items.list.map(item => {
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
              </div>
            </li>
          )
        })
      }
    </ul>
  );
}