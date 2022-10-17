import { useState, useEffect,useRef  } from "react";
import { useHistory,useParams  } from "react-router-dom";
import axios from 'axios'

const Edit = () => {
    const { id } = useParams();
    const inputRef = useRef();

var url = 'http://localhost:4001/api/posts/' + id ;
    useEffect(() => {
    axios.get(url)
    .then(res => {
        setTitle(res.data.title)
        setBody(res.data.body)
        console.log(inputRef.current);
        inputRef.current.focus();
    }) 
    .catch(err=>console.log(err))
}, [url]) 


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
      // history.go(-1);
      history.push('/');
    })
  }

 


  return (
    <div className="create">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input ref={inputRef}
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
        <button>Edit</button>
      </form>
    </div>
  );
}
 
export default Edit;