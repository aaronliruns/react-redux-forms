import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {Field,Control,Form,combineForms, Errors, actions} from 'react-redux-form';
import thunk from 'redux-thunk' // no changes here 😀
import logger from 'redux-logger'

const initialUserState = {
  username: '',
  password: '',
};

const store = createStore(combineForms({
  user: initialUserState,
}), applyMiddleware(thunk,logger));

const postLogin = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (![ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
        reject({
          '': 'Login failed!',
          username: 'User does not exist',
        });
      } else if (values.password !== 'beatles') {
        reject({
          '': 'Login failed!',
          password: 'Wrong password',
        });
      } else {
        resolve(true);
        alert('Successfully submitted!');
        console.log(values);
      }
    });
  });
}

class UserForm extends Component {
  handleSubmit(values) {
    this.props.dispatch(actions.submit('user', postLogin(values)));
  }
  render() {
    return (
      <Form model="user" onSubmit={values => this.handleSubmit(values)}>
        <Errors className="errors" model="user" />
        <p>
          Username is <strong>john</strong>, <strong>paul</strong>, <strong>george</strong>, or <strong>ringo</strong>.<br />
          Password is <strong>beatles</strong>.
        </p>
        
        <div className="field">
          <label>Username</label>
          <Control.text model=".username" />
        </div>
        
        <div className="field">
          <label>Password</label>
          <Control type="password" model=".password" />
        </div>

        <button type="submit">
          Log In
        </button>
        <Control.reset model="user" className="secondary">
          Clear Values
        </Control.reset>
      </Form>
    );
  }
}

const ConnectedUserForm = connect(null)(UserForm);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedUserForm />
      </Provider>
    );
  }
}


export default App;


