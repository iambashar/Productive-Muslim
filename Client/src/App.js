import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Dua from './pages/Dua/Dua';
import Homepage from './pages/Homepage/Homepage';
import Login from './components/Authentication/Login';
import Salah from './pages/Salah/Salah';
import Sawm from './pages/Sawm/Sawm';
import Tracker from './pages/Tracker/Tracker';
import Challenges from './pages/Challenges/Challenges';
import Forum from './pages/Forum/Forum';
import Register from "./components/Authentication/Register";
import Reset from "./components/Authentication/Reset";
import {auth} from './firebase';
import {useState} from "react";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    auth.onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  return (
      <Router>
        {!isLoggedIn? (
          <>
              <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/reset" component={Reset} />  
              </Switch>
          </>
          ) 
          : (
            <>
            <Switch>

            <Route path="/pages/Homepage">
          <Homepage></Homepage>  
          </Route>
          <Route path="/pages/Dua">
            <Dua></Dua>
          </Route>
          <Route path="/pages/Salah">
            <Salah></Salah>  
          </Route>
          <Route path="/pages/Sawm">
            <Sawm></Sawm>
          </Route>
          <Route path="/pages/Tracker">
            <Tracker></Tracker>
          </Route>
          <Route path="/pages/Challenges">
            <Challenges></Challenges>
          </Route>
          <Route path="/pages/Forum">
            <Forum></Forum>
          </Route>
        </Switch>
        </>
        )}
        
      </Router>
  );
}

export default App;
