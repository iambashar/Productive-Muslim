import './App.css';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
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
import { AuthProvider } from "./components/Authentication/AuthContext"
import PrivateRoute from "./components/Authentication/PrivateRoute"
import UpdateProfile from './components/Authentication/UpdateProfile';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Homepage} />
          <PrivateRoute path="/pages/Dua" component={Dua} />
          <PrivateRoute path="/pages/Salah" component={Salah} />
          <PrivateRoute path="/pages/Sawm" component={Sawm} />
          <PrivateRoute path="/pages/Tracker" component={Tracker} />
          <PrivateRoute path="/pages/Challenges" component={Challenges} />
          <PrivateRoute path="/pages/Forum" component={Forum} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={Reset} />
        </Switch>
      </AuthProvider>
      <Footer></Footer>
    </Router>
    </>
    
  );
}

export default App;
