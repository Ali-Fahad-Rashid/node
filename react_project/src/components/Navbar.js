import { Link } from "react-router-dom";
import axios from 'axios'
import { Trans, useTranslation } from "react-i18next";


const Navbar = () => {
const user = localStorage.getItem('user');

  const handleClick = () => {

    axios.post('http://localhost:4001/api/logout'
   ).then(() => {
     localStorage.removeItem('user');

     window.location.href="/"
    }).catch(err => console.log(err))

 }


 const { t, i18n } = useTranslation();

 const changeLanguage = (language) => {
   i18n.changeLanguage(language);
   localStorage.setItem('lan', language);
   localStorage.setItem('d', 'rtl');


 };


  return (
    <div> 
    <nav className="navbar">
      <Link to="/"><h1>Have Fun</h1></Link>
      <div className="links">
    { !user && <Link className="btn" to="/register">Register</Link>}
     { !user && <Link className="btn" to="/login">LogIn</Link>}
      { user && <Link className="btn" onClick={handleClick} to="/login">LogOut</Link>}
      <Link className="btn" to="/">Home</Link>

      {user && <Link className="btn" to="">{user}</Link>}


        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>New Post</Link>

      </div>

    </nav>

<div dir={localStorage.getItem('d')} className="App">
<button onClick={() => {changeLanguage("en") }}>EN</button>
<button onClick={() => { changeLanguage("ar")}}>AR</button>
<hr/>
<Trans i18nKey="description.part1">
</Trans>
<div>{t("description.part2")}</div>
</div>

</div>
  );
}
 
export default Navbar;