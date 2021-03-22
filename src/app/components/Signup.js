import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../index';

export function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorMessage] = useState('');

  const signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in user - can add functionality
        var user = userCredential.user;
        props.history.push('/login');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={signUp(email, password)}>
          <h1>
            Sign up for
            <Link to="/">Scrapplr</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <input
              placeholder="Email"
              value={email}
              type="email"
              onChange={(evt) => setEmail(evt.target.value)}
            ></input>
          </div>
          <div>
            <input
              placeholder="Password"
              onChange={(evt) => setPassword(evt.target.value)}
              value={password}
              type="password"
            ></input>
          </div>
          <p>Password must be at least 6 characters.</p>
          {error ? console.log(error) : ''}
          <div>
            <button type="submit" onClick={signUp}>
              Sign up
            </button>
          </div>
          <hr></hr>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}