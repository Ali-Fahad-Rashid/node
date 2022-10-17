import PostList from "./PostList";
import useFetch from "../components/useFetch";
import GoogleMap from "./googlemaps";


const Home = () => {
  const { error, isPending, data: blogs } = useFetch('http://localhost:4001/api/posts')




  return (
    <div className="home">
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { blogs && <PostList blogs={blogs} /> }
      { <GoogleMap /> }

    </div>
  );
}
 
export default Home;
