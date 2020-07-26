import React from 'react';

export default function ItemRow({ item, index, handleItemClick, handleRemoveClick }) {
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
      <button onClick={() => handleItemClick(index)}>Edit</button>
      <button onClick={() => handleRemoveClick(index)}>Delete</button>
    </div>
  </li>
  )
};