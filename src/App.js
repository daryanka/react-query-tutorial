import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from "react-router-dom";
import PostList from "./containers/PostList";
import Post from "./containers/Post";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={"/"} exact component={PostList}/>
        <Route path={"/posts/:id"} exact component={Post} />
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
