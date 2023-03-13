import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

// Redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// Importing the export defaults from redux states
import searchQuery from './redux/searchQuery';
import isUser from './redux/isUser';
import entry from './redux/entry';

const store = configureStore({
  // names of states which are to be used with state.
  reducer: {
    searchQuery: searchQuery,
    isUser: isUser,
    entry: entry,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
