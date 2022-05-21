import React from 'react';
import { useState } from "react";

export const AddComment = (props) => {

const [comment, setAuthor] = useState('');



  return <div>
      <form>
  <div class="form-row">
    
      <input type="text" class="form-control" value={comment}
           onChange={(e) => setComment(e.target.value)} placeholder="enter comment"/>

      <button type="button" onClick={()=>props.addComment(comment)} class="btn btn-dark mt-2">Add Book</button>

  </div>
</form>
  </div>;
};
