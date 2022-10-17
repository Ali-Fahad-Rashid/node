import { useState } from "react";
import axios from 'axios'




const LogIn = () => {

const [error, seterror] = useState('');

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { username, password };
   axios.post('http://localhost:4001/api/login',blog).then(res => {
                    if(res.data.user.username){
      localStorage.setItem('user', res.data.user.username);
      localStorage.setItem('token', res.data.user.username);

      window.location.href="/"      }
    }).catch(()=>{seterror("error with username or passowrd")})}
  

/*     const handleSubmit2 = (e) => {
      e.preventDefault();
     axios.get(window.open('http://127.0.0.1:3000/api/auth/google', "_self")).then(res => {
        localStorage.setItem('user', res.data.user.username);
        window.location.href="/"      
      }).catch(()=>{seterror("error with username or passowrd")})} */


  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
<label >User Name:</label>
      <input type="text" id="title" name="username" 
      value={username}
          onChange={(e) => setusername(e.target.value)}
           required />

      <label >Password:</label>
      <input id="title" type="password" name="password"
       value={password}
          onChange={(e) => setpassword(e.target.value)}
           required />

           <br/>
<p>{error}</p>


        <button >LogIn</button>
      </form>

{/*       <form onSubmit={handleSubmit2}>
      <button>Sign in with Google</button>
      </form> */}

    </div>
  );
}
 
export default LogIn;