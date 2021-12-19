import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Account from './Account';
import Home from './Home';
import Landing from './Landing';
import Navigation from './Navigation';
import SignIn from './FireBaseComponents/SignIn';
import SignUp from './FireBaseComponents/SignUp';
import Order from './Order';
import ReviewsPage from './ReviewsPage';
import { AuthProvider } from '../firebase/Auth';
import PrivateRoute from './PrivateRoute';
import Pickup from './Pickup';
import Deliver from './Deliver';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navigation />
          </header>
        </div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/pickup" component={Pickup} />
        <Route exact path="/delivery" component={Deliver} />
        <Route exact path="/reviews" component={ReviewsPage} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </AuthProvider>
  );
}

export default App;
