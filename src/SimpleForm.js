import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Field,Control,Form,combineForms} from 'react-redux-form';
import thunk from 'redux-thunk' // no changes here 😀



const initialUserState = {
  firstName: 'Aaron',
  lastName: 'Li',
};

const store = createStore(combineForms({
  user: initialUserState,
}), applyMiddleware(thunk));

class UserForm extends Component {
  render() {
    return (
      <Form model="user" onSubmit={v => console.log(v)}>
        <div className="field">
          <label>First name:</label>
          <Control.text model=".firstName" placeholder="First Name" />
        </div>

        <div className="field">
          <label>Last name:</label>
          <Control.text model=".lastName" placeholder="Last Name" />
        </div>
        
        <div className="field">
          <label>Email:</label>
          <Control model=".email" type="email" placeholder="something@example.com" />
        </div>
        
        <div className="field">
          <label>Sex</label>
          <label><Control.radio model=".sex" value="male" /> Male</label>
          <label><Control.radio model=".sex" value="female" /> Female</label>
        </div>
        
        <div className="field">
          <label>Favorite Color</label>
          <Control.select model=".favoriteColor">
            <option value=""></option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Control.select>
        </div>
        
        <div className="field">
          <label>Employed?</label>
          <label><Control.checkbox model=".employed" /> Yep, I have a job</label>
        </div>
        
        <div className="field">
          <label>Notes</label>
          <Control.textarea model=".notes" />
        </div>

        <button type="submit">
          Submit
        </button>
        <Control.reset model="user" className="secondary">
          Clear Values
        </Control.reset>
      </Form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <UserForm />
      </Provider>
    );
  }
}

export default App;
