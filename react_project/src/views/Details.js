import { useHistory, useParams } from "react-router-dom";
import useFetch from "../components/useFetch";
import axios from 'axios'
import { Link } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:4001/api/posts/' + id);
  const history = useHistory();

  const handleClick = () => {
    const token =  localStorage.getItem('user');;
console.log(token);
    axios.delete('http://localhost:4001/api/posts/' + blog._id,{
      headers: { Authorization: `Bearer ${token}` ,     
               "Content-type": "application/json",
    }
  })
    
    .then(() => {
      history.push('/');
    }) 
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <div>{ blog.body }</div>
          <Link className="btn-danger btn" to={`/edit/${blog._id}`}>Edit</Link>

          <button className="btn-danger btn" onClick={handleClick}>Delete</button>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;