import React from 'react';
import styles from '../css/cs.module.css';

export default function ItemRow({ item, index, handleItemClick, handleRemoveClick }) {
  return (
    <div className={styles.group} key={item.id}>
      <div>
        {item.id}
      </div>
      <div className={styles.description}>
        Value: {item.value}
      </div>
      <div>
        Comment: {item.comment}
      </div>
      <div className={styles.button}>
        <button onClick={() => handleItemClick(index)}>Edit</button>
        <button onClick={() => handleRemoveClick(index)}>Delete</button>
      </div>
    </div>
  )
};