import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'

import { toast } from 'react-toastify';
toast.configure();

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const history = useHistory();
  const [files, setfiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title)
      formData.append('body', body)


              for (var i = 0; i < files.length ; i++) {
      formData.append('files', files[i])
    }
    console.log(files)
    for (var value of formData.values()) {
      console.log(value);
   }
   // const blog = { title, body };

   axios.post('http://localhost:4001/api/posts',formData)
    .then(() => {

      toast("Post Adedd "+" "+title);
      // history.go(-1);
      history.push('/');
    })
  }

 


  return (
    <div className="create">
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
<br></br>
<input type="file" name="myImage" onChange={(e) => setfiles(e.target.files)} multiple/>

<br></br>
        <label>body:</label>
        
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button>Add Post</button>
      </form>
    </div>
  );
}
 
export default Create;