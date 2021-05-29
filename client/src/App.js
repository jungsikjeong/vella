import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Components/Home/Home';
import Header from './Components/Header/Header';

//Redux
// import { Provider } from 'react-redux';
// import store from './store';

// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }
const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  return (
    // <Provider store={store}>
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </>
    </Router>
    // </Provider>
  );
};

export default App;
