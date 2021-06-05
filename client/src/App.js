import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import Join from './Components/Join/Join';
import Login from './Components/Login/Login';
import Overally from './Components/Overally/Overally';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Lookbook1 from './Components/Lookbook/Lookbook1';
import Lookbook2 from './Components/Lookbook/Lookbook2';
import Lookbook3 from './Components/Lookbook/Lookbook3.';

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
          <Overally /> {/* 모바일 메뉴 클릭시 활성화됨 */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/join' component={Join} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/lookbook1' component={Lookbook1} />
            <Route exact path='/lookbook2' component={Lookbook2} />
            <Route exact path='/lookbook3' component={Lookbook3} />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
