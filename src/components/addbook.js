import React from 'react';
import { useState } from "react";

export const AddBook = (props) => {

const [author, setAuthor] = useState('');
const [title, setTitle] = useState('');
const [cover, setCover] = useState('');
const [description, setDescription] = useState('');


  return <div>
      <form>
  <div class="form-row">
    
      <input type="text" class="form-control" value={author}
           onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name"/>
           
      <input type="text" class="form-control mt-2" value={title}
           onChange={(e) => setTitle(e.target.value)} placeholder="Book title"/>

<input type="text" class="form-control mt-2" value={cover}
           onChange={(e) => setCover(e.target.value)} placeholder="Cover image url"/>

<input type="text" class="form-control mt-2" value={description}
           onChange={(e) => setDescription(e.target.value)} placeholder="Description"/>

      <button type="button" onClick={()=>props.addBook(author, title, cover, description)} class="btn btn-dark mt-2">Add Book</button>

  </div>
</form>
  </div>;
};
