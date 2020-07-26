import styles from '../css/cs.module.css';
import React, { useState, useEffect } from 'react';
import Item from './Item';
import ItemRow from './ItemRow';
import ItemForm from './ItemForm';


export default function ItemsList({show}) {
	
	let displayInfo = show ? styles.displayInitial : styles.displayNone;
  const newInitialState = [];
	
  if(newInitialState.length === 0) {
		
		newInitialState.push( new Item('va', 'ca'));
    newInitialState.push( new Item('vb', 'cb'));
    newInitialState.push( new Item('vc', 'cc'));
  } 
	
	const [items, setItems] = useState(newInitialState);
	const [item, setItem] = useState(new Item());
			
	useEffect ( () => {
//		alert(item.id);

      }, [item]);

			//https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
			function compareValues(key, order = 'asc') {
				return function innerSort(a, b) {
					if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
						// property doesn't exist on either object
						return 0;
					}
			
					const varA = (typeof a[key] === 'string')
						? a[key].toUpperCase() : a[key];
					const varB = (typeof b[key] === 'string')
						? b[key].toUpperCase() : b[key];
			
					let comparison = 0;
					if (varA > varB) {
						comparison = 1;
					} else if (varA < varB) {
						comparison = -1;
					}
					return (
						(order === 'desc') ? (comparison * -1) : comparison
					);
				};
			}

  //const addItem = ( value, comment ) => {
	const addItem = ( newItem ) => {
    //const localNewItem = newItem;
    //newItem.value = value;
		//newItem.comment = comment;
		let newList = items.filter( item => item.id !== newItem.id);
		const newInitialState = [ ...newList, newItem ];
		const newInitialStateSoort = newInitialState.sort(compareValues('value'));
		setItems( newInitialStateSoort );
		const resetItem = new Item();
		setItem(resetItem);
	};

	const handleRemoveClick = ( index ) => {
		// Get all todos array from state.
		const newItems = [ ...items ];

		// Remove the clicked item from the todos array
		newItems.splice( index, 1 );

		// Set State with the new array of todos with the updated value
		setItems( newItems );
	};

	const handleItemClick = ( index ) => {
		let item = items[index];
				setItem({...item});		
	};

  return (
    <div className={displayInfo}>      
			<h2>List</h2>
			<ItemForm item={item} addItem={addItem}/>
			<div>
				{ items.length ? (
					items.map( ( item, index ) => (
						<ItemRow
							key={item.id}
							item={item}
							index={index}			
							handleItemClick={handleItemClick}				
							handleRemoveClick={handleRemoveClick}
						/>
					) )
				) : '' }
			</div>
    </div>
  );
 
}; 
