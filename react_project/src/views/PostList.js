import { Link } from 'react-router-dom';

const PostList = ({ blogs }) => {
  return (
    <div className="blog-list">

      {items.map(blog => (

<ul >
<li key={item.key}>{item.text}</li>

</ul>



      ))}
    </div>
  );
}
 
export default PostList;