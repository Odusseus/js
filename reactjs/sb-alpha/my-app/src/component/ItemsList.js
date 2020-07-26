import styles from '../css/cs.module.css';
import React, { useState, useEffect } from 'react';
import Item from './Item';
import ItemRow from './ItemRow';
import ItemForm from './ItemForm';
import * as Constant from '../constant';
import * as Environment from '../environment';



export default function ItemsList({ show }) {

	let displayInfo = show ? styles.displayInitial : styles.displayNone;
	// const newInitialState = [];

	//  if (newInitialState.length === 0) {

	//  	newInitialState.push(new Item('va', 'ca'));
	//  	newInitialState.push(new Item('vb', 'cb'));
	//  	newInitialState.push(new Item('vc', 'cc'));
	//  }

	const [items, setItems] = useState([]);
	const [item, setItem] = useState(new Item());
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [version, setVersion] = useState(0);
	const [save, setSave] = useState(false);

  useEffect(() => {
    setError('');
    setMessage('');    
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
    };
    fetch(`${Environment.HostDebug}${Constant.GetItem}`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
					setMessage(data.message);		
					let itemsValue = [];
					let messageVersion = 0
					if(data.message) {
						let message = JSON.parse(data.message);
						itemsValue = JSON.parse(message.value);
						messageVersion = message.version;
					}
					setItems(itemsValue);
					setVersion(messageVersion);
        }
        else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('There was an error.', error);
        setError(`There was an error : ${Environment.HostDebug}${Constant.GetItem}`);
      });
	}, []);

	useEffect(() => {
		if(save) {
			saveItem();
			setSave(true);
		}

	}, [save]);
	const saveItem = () => {
    setError('');
		setMessage('');
		
		let itemsValue = JSON.stringify(items);

    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        value: itemsValue,
        version: version
      })
    };
    fetch(`${Environment.HostDebug}${Constant.SaveItem}`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
        if (data.statusCode === 200) {
          setMessage(data.message);
        }
        else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('There was an error.', error);
        setError(`There was an error : ${Environment.HostDebug}${Constant.SaveItem}`);
      });
  }


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

	const addItem = (newItem) => {
		let newList = items.filter(item => item.id !== newItem.id);
		const newInitialState = [...newList, newItem];
		const newInitialStateSoort = newInitialState.sort(compareValues('value'));
		setItems(newInitialStateSoort);
		const resetItem = new Item();
		setItem(resetItem);		
		setSave(true);
	};

	const handleRemoveClick = (index) => {
		const newItems = [...items];

		newItems.splice(index, 1);

		setItems(newItems);
		saveItem();
	};

	const handleItemClick = (index) => {
		let item = items[index];
		setItem({ ...item });
	};

	return (
		<div className={displayInfo}>
			<h2>List</h2>
			<ItemForm item={item} addItem={addItem} />
			<div>
				{items.length ? (
					items.map((item, index) => (
						<ItemRow
							key={item.id}
							item={item}
							index={index}
							handleItemClick={handleItemClick}
							handleRemoveClick={handleRemoveClick}
						/>
					))
				) : ''}
			</div>
			<Message message={message} />
      <Error error={error} />
		</div>
	);
}; 

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
