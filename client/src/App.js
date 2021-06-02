import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Join from './Components/Join/Join';
import Login from './Components/Login/Login';
import Overally from './Components/Overally/Overally';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './_actions/auth';

// import setAuthToken from './utils/setAuthToken';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Header />
          <Overally />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/join' component={Join} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
