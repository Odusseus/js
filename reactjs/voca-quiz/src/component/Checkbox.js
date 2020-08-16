import React from "react";

//https://codesandbox.io/s/8w9v2?file=/src/index.js

export default function Checkbox({ fnChange, title = "", checked = false }) {
  return (
    <label>
      <input
        onChange={e => {
          fnChange(e.target.checked);
        }}
        type="checkbox"
        checked={checked}
      />
      {title}
  </label>

  )

}