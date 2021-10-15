import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Homepage from './pages/Homepage/Homepage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Dua from './pages/Dua/Dua';
import NavBar from './components/NavBar/navBar';
import Salah from './pages/Salah/Salah';
import Sawm from './pages/Sawm/Sawm';
import Tracker from './pages/Tracker/Tracker';
import Challenges from './pages/Challenges/Challenges';
import Forum from './pages/Forum/Forum';


function App() {
  return (
      <Router>
        <Switch>
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
          <Route path="/">
            <Homepage></Homepage>
          </Route>
          
        </Switch>
        
      </Router>
  );
}

export default App;
