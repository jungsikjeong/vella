import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import store from './store';
import { Provider } from 'react-redux';
import { loadUser } from './_actions/auth';
import setAuthToken from './utils/setAuthToken';

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
import All from './Components/Shop/All';
import Top from './Components/Shop/Top';
import Bottom from './Components/Shop/Bottom';
import Dress from './Components/Shop/Dress';
import Outer from './Components/Shop/Outer';
import Promotion from './Components/Shop/Promotion';
import Acc from './Components/Shop/Acc';
import Admin from './Components/Admin/Admin';
import AdminLogin from './Components/Admin/Sections/AdminLogin/AdminLogin';
import AdminUpload from './Components/Admin/Sections/AdminUpload/AdminUpload';
import AdminEdit from './Components/Admin/Sections/AdminEdit/AdminEdit';
import Cart from './Components/Cart/Cart';
import DetailProduct from './Components/DetailProduct/DetailProduct';
import ScrollToTop from './utils/scrollToTop';
import NotFound from './Components/Common/NotFound';

if (localStorage.token) {
  //  글로벌 axios 기본(defaults) 설정
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <Router>
          <>
            <Header />
            <ScrollToTop />
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
              <Route exact path='/product/all' component={All} />
              <Route exact path='/product/top' component={Top} />
              <Route exact path='/product/bottom' component={Bottom} />
              <Route exact path='/product/dress' component={Dress} />
              <Route exact path='/product/outer' component={Outer} />
              <Route exact path='/product/proMotion' component={Promotion} />
              <Route exact path='/product/acc' component={Acc} />
              <Route exact path='/product/:id' component={DetailProduct} />
              <Route exact path='/cart/:id' component={Cart} />
              <Route exact path='/admin' component={AdminLogin} />
              <Route exact path='/admin/home' component={Admin} />
              <Route exact path='/admin/upload' component={AdminUpload} />
              <Route
                exact
                path='/admin/product/edit/:id'
                component={AdminEdit}
              />

              {/* 경로 외에 곳으로 갔을때 */}
              <Route component={NotFound} />
            </Switch>
          </>
        </Router>
      </Provider>
    </Suspense>
  );
};

export default App;
