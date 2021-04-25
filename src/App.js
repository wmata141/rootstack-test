import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/routes/privateRoute';
import PublicRoute from './components/routes/publicRoute';
import Alert from './components/alert';
import Menu from './components/menu';
import Landing from './modules/landing';
import Home from './modules/home';
import Works from './modules/works';

const App = () => {  
  const state = useSelector(state => state.alertReducer)

  return (
    <BrowserRouter>
      <Alert state={state} />
      <Menu>
        <Switch>
          <PublicRoute path="/" exact component={Landing} />
          <PrivateRoute path="/home" exact component={Home} />
          <PrivateRoute path="/works" exact component={Works} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Menu>
    </BrowserRouter>
  );
}

export default App;