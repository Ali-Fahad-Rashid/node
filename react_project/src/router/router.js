import Navbar from '../components/Navbar';
import Home from '../views/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from '../views/Create';
import Details from '../views/Details';
import Edit from '../views/edit';
import Register from '../views/users/register';
import LogIn from '../views/users/login';

import NotFound from '../components/NotFound';

function router() {
  return (
    <Router>
      <div  className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/edit/:id">
              <Edit />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/posts/:id">
              <Details />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default router;
