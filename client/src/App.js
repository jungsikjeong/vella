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
import Auth from './hoc/auth';

if (localStorage.token) {
  //  글로벌 axios 기본(defaults) 설정
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // null 누구나 들어갈 수 있음
  // true 로그인 한 사용자 만 들어갈 수 있음
  // false 로그인 한 사용자는 안으로 들어갈 수 없음.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <Router>
          <>
            <Header />
            <ScrollToTop />
            <Overally /> {/* 모바일 메뉴 클릭시 활성화됨 */}
            <Switch>
              <Route exact path='/' component={Auth(Home, null)} />
              <Route exact path='/join' component={Auth(Join, false)} />
              <Route exact path='/login' component={Auth(Login, false)} />
              <Route exact path='/about' component={Auth(About, null)} />
              <Route exact path='/contact' component={Auth(Contact, null)} />
              <Route
                exact
                path='/lookbook1'
                component={Auth(Lookbook1, null)}
              />
              <Route
                exact
                path='/lookbook2'
                component={Auth(Lookbook2, null)}
              />
              <Route
                exact
                path='/lookbook3'
                component={Auth(Lookbook3, null)}
              />
              <Route exact path='/product/all' component={Auth(All, null)} />
              <Route exact path='/product/top' component={Auth(Top, null)} />
              <Route
                exact
                path='/product/bottom'
                component={Auth(Bottom, null)}
              />
              <Route
                exact
                path='/product/dress'
                component={Auth(Dress, null)}
              />
              <Route
                exact
                path='/product/outer'
                component={Auth(Outer, null)}
              />
              <Route
                exact
                path='/product/proMotion'
                component={Auth(Promotion, null)}
              />
              <Route exact path='/product/acc' component={Auth(Acc, null)} />
              <Route
                exact
                path='/product/:id'
                component={Auth(DetailProduct, null)}
              />
              <Route exact path='/cart' component={Auth(Cart, true)} />
              <Route
                exact
                path='/admin'
                component={Auth(AdminLogin, null, true)}
              />
              <Route
                exact
                path='/admin/home'
                component={Auth(Admin, true, true)}
              />
              <Route
                exact
                path='/admin/upload'
                component={Auth(AdminUpload, true, true)}
              />
              <Route
                exact
                path='/admin/product/edit/:id'
                component={Auth(AdminEdit, true, true)}
              />

              {/* 경로 외에 곳으로 갔을때 */}
              <Route component={Auth(NotFound, null)} />
            </Switch>
          </>
        </Router>
      </Provider>
    </Suspense>
  );
};

export default App;
