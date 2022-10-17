import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
const Register = () => {

const [error, seterror] = useState('');

  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirm_pass, setconfirm_pass] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== confirm_pass){
        seterror("password are not the same")

              }
        
        else {
    const blog = { username, email, password };
   axios.post('http://localhost:4001/api/register',blog)
    .then(res => {
     // history.push('/');
     localStorage.setItem('user',username);
     window.location.href="/"
    }).catch(( )=> 
    {
    seterror("username exist")
    }
    )
}
  }
  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
<label >User Name:</label>
      <input type="text" id="title" name="username" 
      value={username}
          onChange={(e) => setusername(e.target.value)}
           required />
      <label >User Email:</label>
      <input type="email" id="snippet" name="email"
       value={email}
          onChange={(e) => setemail(e.target.value)}
           required />
      <label >Password:</label>
      <input id="title" type="password" name="password"
       value={password}
          onChange={(e) => setpassword(e.target.value)}
           required />
      <label >Confirm:</label>
      <input id="title" type="password" name="confirm_pass"
       value={confirm_pass}
          onChange={(e) => setconfirm_pass(e.target.value)}
           required />
           <br/>
<p>{error}</p>


        <button>Register</button>
      </form>
    </div>
  );
}
 
export default Register;