import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import './ShelfPage.css';

function ShelfPage() {

  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const currentUser = useSelector(store => store.user);
  const books = useSelector(store => store.items);
  const userId = currentUser.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_ITEMS'
    });
  }, [dispatch])

  function handleSubmit() {
    dispatch({
      type: 'ADD_BOOK',
      payload: { description, image_url: url, user_id: userId }
    });
    setUrl('');
    setDescription('');
  }

  function deleteItem(book) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: book
    });
  }


  return (
    <div className="container">
      <h2>Shelf</h2>
      <input value={description} onChange={event => setDescription(event.target.value)} placeholder="description" />
      <input value={url} onChange={event => setUrl(event.target.value)} placeholder="image_url" />
      <button onClick={() => handleSubmit()}>Add to Shelf</button><br />
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {books.map(book => {
          return (
              <tr key={book.id}>
                <td className="description">{book.description}</td>
                <td><img src={book.image_url} /></td>
                <td>{book.user_id === userId && <button onClick={() => deleteItem(book)} className="deleteButton">Remove Item</button>}</td>
              </tr>

  );
})}
       </tbody>
      </table>
    </div >
  );
}

export default ShelfPage;


