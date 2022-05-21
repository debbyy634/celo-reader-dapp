import React from 'react';
import { useState } from "react";

export const Books = (props) => {

    const [comment, setComment] = useState('');

  return <div className="row">
 


<h5 class="card-title">Comments</h5>




{props.bookks.map((book) =>(
    <div className='col-3' key={book.index}>  
    <div class="card">
    <img className="card-img-top" src={book.image}  />
    <div class="card-body ">
      <h5 class="card-title">{book.author}</h5>
      <h6 class="card-subtitle">{book.title}</h6>
      <p class="card-text">{book.description}</p>
      <button type="button" class="btn btn-danger" onClick={ ()=> props.donate(book.index)}>Donate</button>
    
      <form>
  <div class="form-row">
    
      <input type="text" class="form-control" value={comment}
           onChange={(e) => setComment(e.target.value)} placeholder="enter comment"/>

      <button type="button" onClick={()=>props.addComment(book.index, comment)} class="btn btn-dark mt-2">Add comment</button>
      <h5 class="card-title">Comments</h5>
      {book.comments.map((comment) =>(
    <small class="tm">{comment}</small>
))};
  </div>
</form>
      
      
    </div>
  </div>
  </div>
  ))};

</div>
};
