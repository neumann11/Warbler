import React, { Component } from 'react';
import { Provider } from "react-redux";
import { configureStore } from "../store"; // ../store/index.js
import { BrowserRouter as Router } from "react-router-dom";

//create a store:
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <div>Hello World!</div>
    </Router>
  </Provider>
);

export default App;