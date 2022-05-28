import React from 'react';
import { useState } from "react";

export const Books = (props) => {

    const [comment, setComment] = useState('');

  return <div className="card-container">


{props.bookks.map((book) =>(
    <div className='col-3' key={book.index}>  
    <div class="card">
    <img className="card-img-top" src={book.cover}  />
    <div class="card-body ">
      <h5 class="card-title">Author: {book.author}</h5>
      <h6 class="card-subtitle">Book Title: {book.title}</h6>
      <p class="card-text mt-2">{book.description}</p>
      {props.userWa !== book.owner && (
        <button type="button" class="btn btn-primary mt-2" onClick={ ()=> props.donate(book.index)}>Donate</button>
      )}
    
      <form>
  <div class="form-r">
    
      <input type="text" class="form-control mt-4" value={comment}
           onChange={(e) => setComment(e.target.value)} placeholder="enter comment"/>

      <button type="button" onClick={()=>props.addComment(book.index, comment)} class="btn btn-dark mt-2">Add comment</button>
      <h5 class="card-title mt-5">Comments</h5>
      {book.comments.map((c) =>(
    <p class="card-text mt-2" key={c.index}>{c.commentMessage}</p>
       ))};
  </div>
</form>
      
    </div>
  </div>
  </div>
  ))};

</div>
};
