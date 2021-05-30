import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import BlogPosts from "./components/BlogPosts";
import BlogPost from "./components/BlogPost";
import About from "./components/About";
import NotFound from "./components/NotFound";


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route exact path="/posts">
            <BlogPosts />
          </Route>
          <Route path="/posts/:id" >
            <BlogPost />
          </Route>
          <Route exact path="/">
            <BlogPosts />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
