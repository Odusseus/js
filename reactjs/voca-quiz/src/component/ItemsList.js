import styles from '../css/cs.module.css';
import React, { useState, useEffect } from 'react';
import * as Constant from './constant';
import Error from './Error';
import Common from './Common';
import Item from './class/Item';
import ItemRow from './ItemRow';
import ItemForm from './ItemForm';
import Message from './Message';
import {useCookies} from 'react-cookie';

export default function ItemsList({ show }) {
  const [displayInfo, setDisplayInfo] = useState(styles.displayInitial);
  const [items, setItems] = useState([]);
	const [item, setItem] = useState(new Item(0,'', ''));
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [version, setVersion] = useState(0);
	const [save, setSave] = useState(false);
	const [cookies] = useCookies([Constant.Cookie]);

	let showDisplayInfo = show ? styles.displayInitial : styles.displayNone;
  if(displayInfo !== showDisplayInfo){
		setDisplayInfo(showDisplayInfo);
	}
  useEffect(() => {
    setError('');
    setMessage('');    
    const requestOptions = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
		};
		let token = Constant.SameOrigin ? '' : `?token=${cookies.token}`;
    fetch(`${Common.GetHost()}${Constant.GetItem}${token}`, requestOptions)
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
						if(message != null){
							messageVersion = message.version;
						  try {
							  itemsValue = JSON.parse(message.value);
						  }
						  catch(err) {
							// do nothing. Value is not correct.
							}
						}
					}
					setItems(itemsValue);
					setVersion(messageVersion);				
					setItem(new Item(0, '', ''));
        }
        else {
					let errorMessage = data.message;
					if(data.statusCode === 401){
						errorMessage = 'You are logged out, svp login again.';
						//removeCookie(Constant.AppName);
					}
          setError(errorMessage);
        }
      })
      .catch(error => {
        console.error('There was an error.', error);
        setError(`There was an error : ${Common.GetHost()}${Constant.GetItem} error:${error}`);
      });
	}, [displayInfo]);

	useEffect(() => {
		if(save) {
			saveItem();
			setSave(false);
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
    let token = Constant.SameOrigin ? '' : `?token=${cookies.token}`;
    fetch(`${Common.GetHost()}${Constant.SaveItem}${token}`, requestOptions)
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
        setError(`There was an error : ${Common.GetHost()}${Constant.SaveItem}`);
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
		// TODO
		// let comment = newItem.comment;
		// let newComment = comment.replace('\\\n', '\\~{"\\\n"}');
		// newItem.comment = newComment;
    let  itemsList =  items;
    if(itemsList === undefined){
      itemsList = [];
    }
		if(newItem.id === '' || newItem.id === 0){
      newItem.id = 0;
      for (let i = 0; i < itemsList.length; i++) {
        let id = itemsList[i].id;
        if( id > newItem.id) {
          newItem.id = id;
        } 
      }
      newItem.id ++;
    }
    let newList = itemsList.filter(item => item.id !== newItem.id);
    let newInitialState = [...newList, newItem];
		let newInitialStateSoort = newInitialState.sort(compareValues('value'));
		setItems(newInitialStateSoort);
    setSave(true);
    setItem(new Item(0, '', ''));
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
