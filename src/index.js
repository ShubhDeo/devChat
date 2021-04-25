import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import firebase from './firebase'
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import { setUser, clearUser } from './actions/'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers';
import Spinner from './components/Spinner'


const store = createStore(rootReducer, composeWithDevTools())


class Root extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user)
      if (user) {
        this.props.setUser(user)
        this.props.history.push("/")
      } else {
        this.props.history.push('/login');
        this.props.clearUser();
      }
    })

  }
  render() {
    return this.props.isLoading ? <Spinner /> : (
      <Switch>
        <Route path='/' component={App} exact></Route>
        <Route path='/login' component={Login} exact></Route>
        <Route path='/register' component={Register} exact></Route>
      </Switch>
    )
  }
}


const mapStateFromProps = state => ({
  isLoading: state.user.isLoading
})

const RootWithAuth = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root));

//Provider provides global states to every component

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>
  , document.getElementById('root'));



reportWebVitals();




